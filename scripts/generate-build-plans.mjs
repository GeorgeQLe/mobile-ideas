#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const manifestPath = path.join(root, "tasks", "repo-seeding.md");
const templatePath = path.join(root, "templates", "build-plan-template.md");
const cloneRoot = path.join(tmpdir(), "mobile-ideas-build-plans");

function usage() {
  return `Usage:
  node scripts/generate-build-plans.mjs --from <id> --to <id> --execute [--delay-ms 5000] [--limit 40]
  node scripts/generate-build-plans.mjs --from <id> --to <id> --dry-run [--limit 40]

Generates app-specific build plans from source specs and pushes to downstream repos.
  - Serial only. Stops on first failure.
  - --dry-run prints the generated plan to stdout without cloning or pushing.
  - --execute shallow-clones the downstream repo, writes docs/plans/README.md, commits, and pushes.`;
}

function parseArgs(argv) {
  const args = {
    from: null,
    to: null,
    execute: false,
    dryRun: false,
    delayMs: 5000,
    limit: 40,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--from") args.from = Number(argv[++i]);
    else if (arg === "--to") args.to = Number(argv[++i]);
    else if (arg === "--execute") args.execute = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--delay-ms") args.delayMs = Number(argv[++i]);
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else throw new Error(`Unknown arg: ${arg}`);
  }
  if (!Number.isInteger(args.from) || !Number.isInteger(args.to) || args.from < 1 || args.to < args.from) {
    throw new Error("--from and --to must be a valid inclusive ID range.");
  }
  if (args.execute === args.dryRun) throw new Error("Choose exactly one of --execute or --dry-run.");
  if (!Number.isInteger(args.limit) || args.limit < 1 || args.limit > 1000) throw new Error("--limit must be 1-1000.");
  if (!Number.isInteger(args.delayMs) || args.delayMs < 0) throw new Error("--delay-ms must be non-negative.");
  return args;
}

function splitTableRow(line) {
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

function stripBackticks(value) {
  return value.startsWith("`") && value.endsWith("`") ? value.slice(1, -1) : value;
}

function parseManifest() {
  const markdown = fs.readFileSync(manifestPath, "utf8");
  const lines = markdown.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "## Per-Repo Checklist");
  if (headingIndex === -1) throw new Error("Missing ## Per-Repo Checklist");
  const tableStart = lines.findIndex((line, index) => index > headingIndex && line.trim().startsWith("|"));
  if (tableStart === -1) throw new Error("Missing per-repo table");
  const headers = splitTableRow(lines[tableStart]);
  const rows = [];
  for (let i = tableStart + 2; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim().startsWith("|")) break;
    const cells = splitTableRow(line);
    const record = Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
    rows.push({
      done: record.Done === "[x]" || record.Done === "[X]",
      id: Number(record.ID),
      idText: record.ID,
      app: record.App,
      targetRepo: stripBackticks(record["Target Repo"]),
      sourceSpec: stripBackticks(record["Source Spec"]),
    });
  }
  return rows;
}

function run(command, options = {}) {
  const result = spawnSync(command[0], command.slice(1), {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });
  if (result.status !== 0) {
    const detail = options.capture ? `${result.stderr || result.stdout}`.trim() : "";
    throw new Error(`${command.join(" ")} failed${detail ? `: ${detail}` : ""}`);
  }
  return result;
}

function sleep(ms) {
  if (ms <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

// ---------------------------------------------------------------------------
// Spec extraction
// ---------------------------------------------------------------------------

function extractSection(specText, heading) {
  const pattern = new RegExp(`^##\\s+${escapeRegex(heading)}\\s*$`, "m");
  const match = specText.match(pattern);
  if (!match) return null;
  const start = match.index + match[0].length;
  const nextHeading = specText.slice(start).search(/^## /m);
  const end = nextHeading === -1 ? specText.length : start + nextHeading;
  return specText.slice(start, end).trim();
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractAppName(specText) {
  const h1 = specText.match(/^#\s+(.+)/m);
  if (!h1) throw new Error("Spec has no H1 heading");
  return h1[1].replace(/-Style Clone Spec$/, "").replace(/ Clone Spec$/, "").replace(/ Spec$/, "").trim();
}

function extractCategory(specText) {
  const match = specText.match(/^>\s*-\s*Category:\s*(.+)/m);
  return match ? match[1].trim() : "General";
}

function extractTableRows(sectionText) {
  if (!sectionText) return [];
  const lines = sectionText.split("\n");
  const rows = [];
  for (const line of lines) {
    if (line.trim().startsWith("|") && !line.trim().startsWith("|---") && !line.trim().startsWith("| ---")) {
      rows.push(line.trim());
    }
  }
  // Skip header row if present
  if (rows.length > 0 && rows[0].toLowerCase().includes("screen") || rows[0]?.toLowerCase().includes("purpose") || rows[0]?.toLowerCase().includes("source")) {
    return rows.slice(1);
  }
  return rows;
}

function extractBulletPoints(sectionText) {
  if (!sectionText) return [];
  return sectionText.split("\n").filter((line) => line.trim().startsWith("- ")).map((line) => line.trim());
}

// ---------------------------------------------------------------------------
// Route map generation from Screen Inventory
// ---------------------------------------------------------------------------

function generateRouteMapRows(specText) {
  const screenSection = extractSection(specText, "Screen Inventory");
  if (!screenSection) return "| (No screens found in spec) | — | — | — | — |";

  const tableRows = extractTableRows(screenSection);
  if (tableRows.length === 0) {
    const bullets = extractBulletPoints(screenSection);
    if (bullets.length === 0) return "| (No screens found in spec) | — | — | — | — |";
    return bullets
      .map((b) => {
        const text = b.replace(/^- /, "");
        const parts = text.split(/[:—–]/);
        const screen = parts[0]?.trim() || text;
        const purpose = parts.slice(1).join(":").trim() || "—";
        return `| ${screen} | ${purpose} | TBD | TBD | TBD |`;
      })
      .join("\n");
  }

  return tableRows
    .map((row) => {
      const cells = splitTableRow(row);
      const screen = cells[0] || "—";
      const purpose = cells[1] || "—";
      const inputs = cells[2] || "—";
      const states = cells[3] || "—";
      const edgeCases = cells[4] || "—";
      return `| ${screen} | ${purpose} | ${inputs} | ${states} | ${edgeCases} |`;
    })
    .join("\n");
}

// ---------------------------------------------------------------------------
// API schema generation from API And Backend Contracts
// ---------------------------------------------------------------------------

function generateApiSchemaRows(specText) {
  const apiSection = extractSection(specText, "API And Backend Contracts");
  if (!apiSection) return "| (No API contracts found in spec) | — | — | — | — | — |";

  const bullets = extractBulletPoints(apiSection);
  if (bullets.length === 0) return "| (No API contracts found in spec) | — | — | — | — | — |";

  const families = new Map();
  for (const bullet of bullets) {
    const text = bullet.replace(/^- /, "");
    const routeMatch = text.match(/`([A-Z]+\s+\/[^`]+)`/);
    if (!routeMatch) continue;
    const route = routeMatch[1];
    const rest = text.replace(routeMatch[0], "").replace(/^[,:;\s]+/, "").trim();
    const familyKey = route.replace(/\/:[^/]+/g, "/:id").split("/").slice(0, 2).join("/");
    if (!families.has(familyKey)) {
      families.set(familyKey, { routes: [], description: rest });
    }
    families.get(familyKey).routes.push(route);
  }

  if (families.size === 0) {
    return bullets
      .slice(0, 10)
      .map((b) => {
        const text = b.replace(/^- /, "");
        return `| API | ${text.slice(0, 80)} | TBD | TBD | TBD | Contract test |`;
      })
      .join("\n");
  }

  return [...families.entries()]
    .map(([family, data]) => {
      const routes = data.routes.map((r) => `\`${r}\``).join(", ");
      return `| ${family} | ${routes} | TBD | ${data.description.slice(0, 80) || "—"} | See spec | Contract test |`;
    })
    .join("\n");
}

// ---------------------------------------------------------------------------
// Data model generation from Data Model section
// ---------------------------------------------------------------------------

function generateDataModelRows(specText) {
  const dataSection = extractSection(specText, "Data Model");
  if (!dataSection) return "| (No data model found in spec) | — | — | — | — |";

  const bullets = extractBulletPoints(dataSection);
  if (bullets.length === 0) return "| (No data model found in spec) | — | — | — | — |";

  return bullets
    .map((b) => {
      const text = b.replace(/^- /, "");
      const entityMatch = text.match(/^`([^`]+)`:\s*(.*)/);
      if (entityMatch) {
        const entity = entityMatch[1];
        const fields = entityMatch[2].trim();
        return `| ${entity} | TBD | ${fields.slice(0, 100) || "—"} | TBD | TBD |`;
      }
      return `| ${text.split(/[:—]/)[0]?.trim() || text} | TBD | TBD | TBD | TBD |`;
    })
    .join("\n");
}

// ---------------------------------------------------------------------------
// Product boundaries from legal scope / Detailed Design / Permissions
// ---------------------------------------------------------------------------

function generateProductBoundaries(specText, appName) {
  const parts = [];
  const nonGoals = extractSection(specText, "Non-Goals");
  if (nonGoals) {
    parts.push(nonGoals);
  }
  const permissions = extractSection(specText, "Permissions, Privacy, And Safety");
  if (permissions) {
    const first3 = extractBulletPoints(permissions).slice(0, 3).join("\n");
    if (first3) parts.push(first3);
  }
  if (parts.length === 0) {
    return `- Do not copy ${appName} branding, proprietary assets, or private APIs.\n- Use original code, brand, copy, and iconography.\n- All unverified behavior ships behind feature flags.`;
  }
  return parts.join("\n\n");
}

// ---------------------------------------------------------------------------
// Feature flags from Edge Cases / blockers in metadata
// ---------------------------------------------------------------------------

function generateFeatureFlagRows(specText) {
  const edgeCases = extractSection(specText, "Edge Cases");
  const blockerMatch = specText.match(/^>\s*-\s*Manual verification blockers?:\s*(.+)/m);
  const rows = [];

  if (blockerMatch) {
    const blockers = blockerMatch[1].split(/,\s*(?:and\s+)?/).map((s) => s.trim().replace(/\.$/, ""));
    for (const blocker of blockers) {
      if (blocker) rows.push(`| Manual: ${blocker} | Launch | Product/QA | Feature-flagged off |`);
    }
  }

  if (edgeCases) {
    const bullets = extractBulletPoints(edgeCases);
    for (const bullet of bullets.slice(0, 8)) {
      const text = bullet.replace(/^- /, "").slice(0, 100);
      rows.push(`| Edge: ${text} | Acceptance test | Engineering | Graceful degradation |`);
    }
  }

  return rows.length > 0 ? rows.join("\n") : "| (No blockers extracted from spec) | — | — | — |";
}

// ---------------------------------------------------------------------------
// Test checklist from Test Plan
// ---------------------------------------------------------------------------

function generateTestChecklist(specText) {
  const testPlan = extractSection(specText, "Test Plan");
  if (!testPlan) return "- [ ] No test plan found in source spec — define tests before implementation.";

  const bullets = extractBulletPoints(testPlan);
  if (bullets.length === 0) return "- [ ] No test plan found in source spec — define tests before implementation.";

  return bullets.map((b) => `- [ ] ${b.replace(/^- /, "")}`).join("\n");
}

// ---------------------------------------------------------------------------
// Seed data plan from Data Model entities
// ---------------------------------------------------------------------------

function generateSeedDataPlan(specText, appName) {
  const dataSection = extractSection(specText, "Data Model");
  if (!dataSection) return `- Create synthetic seed data for ${appName} with fake users, fake content, and brand-neutral naming.`;

  const bullets = extractBulletPoints(dataSection);
  const entities = bullets
    .map((b) => {
      const match = b.match(/^- `([^`]+)`/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  if (entities.length === 0) return `- Create synthetic seed data for ${appName} with fake users, fake content, and brand-neutral naming.`;

  const lines = [
    `Seed the following entities with synthetic, brand-neutral data:`,
    "",
  ];
  for (const entity of entities) {
    lines.push(`- **${entity}**: 5–20 synthetic records with realistic but fake data. No ${appName} branding, real users, or copied content.`);
  }
  lines.push("");
  lines.push("All seed data must be deterministic and reproducible from a fixed seed or static fixture file.");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Category-aware variant architecture defaults
// ---------------------------------------------------------------------------

const CATEGORY_KEYWORDS = {
  health: ["health", "fitness", "wellness", "medical", "nutrition", "workout", "calorie", "exercise"],
  messaging: ["messaging", "email", "sms", "voice call", "video call", "messenger"],
  social: ["social", "dating", "community", "forum", "network"],
  shopping: ["shopping", "commerce", "marketplace", "retail", "classified"],
  food: ["food", "delivery", "grocery", "restaurant", "meal"],
  finance: ["finance", "payment", "bank", "crypto", "wallet", "money", "invest"],
  travel: ["travel", "transport", "ride", "flight", "hotel", "map", "navigation"],
  media: ["video", "music", "stream", "podcast", "book", "reading", "audio", "photo"],
  productivity: ["productivity", "collaboration", "project management", "task management", "note", "document", "calendar"],
  education: ["education", "learning", "course", "study", "language learning"],
  ai: ["ai assistant", "ai chat", "llm", "gpt", "chatbot"],
};

function classifyCategory(categoryText) {
  const lower = categoryText.toLowerCase();
  let bestMatch = "general";
  let bestScore = 0;
  for (const [key, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = key;
    }
  }
  return bestMatch;
}

const VARIANT_DEFAULTS = {
  ai: {
    rn: { navigation: "React Navigation stack with bottom tabs (Home, History, Settings)", state: "Zustand for chat state + React Query for server sync; streaming via SSE/WebSocket reducer", networking: "Axios + EventSource polyfill for SSE streaming; retry with exponential backoff", storage: "MMKV for preferences; SQLite (op-sqlite) for offline conversation cache", platformApi: "expo-camera for image input, expo-file-system for uploads, expo-av for voice I/O", structure: "feature-based: features/{chat,history,voice,settings,auth} with shared/ for providers and hooks" },
    flutter: { navigation: "GoRouter with ShellRoute for bottom tabs", state: "Riverpod for async state + stream providers for SSE; freezed for immutable models", networking: "Dio + web_socket_channel for streaming; retry interceptor", storage: "Hive for preferences; Drift (SQLite) for offline conversation cache", platformApi: "camera, file_picker, record for voice; permission_handler", structure: "feature-first: lib/features/{chat,history,voice,settings,auth} with lib/core/ for shared services" },
    expo: { navigation: "Expo Router file-based routing with tab layout", state: "Zustand for chat state + React Query for server sync; SSE via EventSource", networking: "fetch + EventSource for streaming; expo-file-system for uploads", storage: "expo-secure-store for tokens; expo-sqlite for offline cache", platformApi: "expo-camera, expo-file-system, expo-av for voice; expo-notifications", structure: "app/ directory with file-based routes; lib/ for features and shared hooks" },
    ios: { navigation: "NavigationStack with TabView; NavigationPath for programmatic routing", state: "Observable classes with @Observable macro; AsyncStream for SSE consumption", networking: "URLSession with AsyncBytes for streaming; Combine for reactive pipelines", storage: "SwiftData for conversation cache; Keychain for tokens; UserDefaults for preferences", platformApi: "AVFoundation for voice/camera, PhotosUI for image picker, Speech framework", structure: "Feature modules: Chat/, History/, Voice/, Settings/, Auth/ with Shared/ for services" },
    android: { navigation: "Jetpack Navigation Compose with bottom nav bar", state: "ViewModel + StateFlow; Kotlin Flow for SSE streaming; Room for cache", networking: "Ktor or Retrofit + OkHttp SSE; exponential backoff retry", storage: "DataStore for preferences; Room (SQLite) for offline cache; EncryptedSharedPreferences for tokens", platformApi: "CameraX, MediaStore for images, SpeechRecognizer / MediaRecorder for voice", structure: "feature modules: :chat, :history, :voice, :settings, :auth with :core for shared" },
  },
  messaging: {
    rn: { navigation: "React Navigation with nested stacks: ConversationList → Thread → ContactInfo", state: "Zustand + optimistic local queue; WebSocket for real-time message sync", networking: "WebSocket for live messages; Axios for REST fallback; background fetch for offline queue", storage: "WatermelonDB for large message history; MMKV for session/preferences", platformApi: "expo-notifications for push, expo-contacts for address book, expo-av for voice messages", structure: "features/{conversations,contacts,calls,settings} with shared/sync/ for message queue" },
    flutter: { navigation: "GoRouter: /conversations, /conversations/:id, /contacts, /calls", state: "Riverpod + WebSocket stream providers; drift for local message DB", networking: "web_socket_channel for real-time; Dio for REST; background_fetch for queue drain", storage: "Drift (SQLite) for message history; flutter_secure_storage for keys", platformApi: "contacts_service, flutter_local_notifications, just_audio for voice messages", structure: "lib/features/{conversations,contacts,calls,settings} with lib/core/sync/" },
    expo: { navigation: "Expo Router: /conversations, /conversations/[id], /contacts, /calls", state: "Zustand + WebSocket hook; optimistic message queue with expo-sqlite", networking: "WebSocket for live sync; fetch for REST; expo-background-fetch for offline queue", storage: "expo-sqlite for messages; expo-secure-store for tokens", platformApi: "expo-notifications, expo-contacts, expo-av for audio messages", structure: "app/(tabs)/ with conversations, contacts, calls; lib/sync/ for message queue" },
    ios: { navigation: "NavigationStack → ConversationList → ThreadView → ContactDetail", state: "@Observable models + AsyncStream for WebSocket; Core Data or SwiftData for messages", networking: "URLSessionWebSocketTask for real-time; URLSession for REST", storage: "SwiftData for message history; Keychain for encryption keys", platformApi: "UserNotifications, Contacts framework, AVFoundation for voice", structure: "Conversations/, Contacts/, Calls/, Settings/ with Shared/Sync/" },
    android: { navigation: "Navigation Compose: conversations → thread → contact detail", state: "ViewModel + StateFlow; OkHttp WebSocket; Room for message history", networking: "OkHttp WebSocket for real-time; Retrofit for REST; WorkManager for offline queue", storage: "Room for messages; EncryptedSharedPreferences for keys; DataStore for prefs", platformApi: "Firebase Messaging, ContactsContract, MediaRecorder for voice", structure: ":conversations, :contacts, :calls, :settings with :core:sync" },
  },
  social: {
    rn: { navigation: "React Navigation bottom tabs: Feed, Search/Explore, Create, Notifications, Profile", state: "React Query for feed/profile data; Zustand for compose state and UI", networking: "Axios with infinite scroll pagination; image upload via multipart", storage: "MMKV for preferences; React Query cache for feed; expo-file-system for media drafts", platformApi: "expo-image-picker, expo-camera, expo-location (optional), expo-notifications", structure: "features/{feed,explore,create,notifications,profile,auth} with shared/api/ and shared/media/" },
    flutter: { navigation: "GoRouter with ShellRoute for bottom tabs; nested routes for profiles and posts", state: "Riverpod for feed/profile; StateNotifier for compose flow", networking: "Dio with pagination interceptor; multipart image uploads", storage: "Hive for preferences; cached_network_image for feed; Drift for local drafts", platformApi: "image_picker, camera, geolocator, flutter_local_notifications", structure: "lib/features/{feed,explore,create,notifications,profile} with lib/core/" },
    expo: { navigation: "Expo Router tabs: /(feed), /(explore), /(create), /(notifications), /(profile)", state: "React Query for server data; Zustand for local compose state", networking: "fetch with cursor pagination; expo-file-system for uploads", storage: "expo-sqlite for drafts; expo-secure-store for auth tokens", platformApi: "expo-image-picker, expo-camera, expo-location, expo-notifications", structure: "app/(tabs)/ for main screens; lib/features/ for business logic" },
    ios: { navigation: "TabView with NavigationStack per tab; sheet for create flow", state: "@Observable feed/profile models; async pagination with AsyncStream", networking: "URLSession with async/await; multipart upload for media", storage: "SwiftData for drafts and cache; Keychain for tokens", platformApi: "PhotosUI, AVFoundation, CoreLocation, UserNotifications", structure: "Feed/, Explore/, Create/, Notifications/, Profile/ with Shared/" },
    android: { navigation: "Bottom nav with Navigation Compose; nested graphs per tab", state: "ViewModel + StateFlow; Paging 3 for feed; Room for drafts", networking: "Retrofit + OkHttp; multipart uploads; Coil for image loading", storage: "Room for cache/drafts; DataStore for preferences", platformApi: "CameraX, Photo Picker, FusedLocationProvider, Firebase Messaging", structure: ":feed, :explore, :create, :notifications, :profile with :core" },
  },
  shopping: {
    rn: { navigation: "React Navigation: Home/Browse tabs → PDP → Cart → Checkout stack", state: "React Query for catalog; Zustand for cart/checkout state", networking: "Axios for catalog/search APIs; Stripe SDK for payments", storage: "MMKV for cart persistence; React Query cache for catalog; secure storage for payment tokens", platformApi: "expo-camera for barcode scan, expo-notifications for order updates, expo-location for store locator", structure: "features/{browse,search,product,cart,checkout,orders,account} with shared/api/" },
    flutter: { navigation: "GoRouter: /home, /search, /product/:id, /cart, /checkout, /orders", state: "Riverpod for catalog + cart; StateNotifier for checkout flow", networking: "Dio for catalog; stripe_flutter for payments", storage: "Drift for favorites/cart; Hive for preferences", platformApi: "barcode_scan, flutter_local_notifications, geolocator", structure: "lib/features/{browse,search,product,cart,checkout,orders} with lib/core/" },
    expo: { navigation: "Expo Router: /(shop), /product/[id], /cart, /checkout, /orders", state: "React Query for catalog; Zustand for cart", networking: "fetch for APIs; @stripe/stripe-react-native for payments", storage: "expo-sqlite for cart/favorites; expo-secure-store for payment tokens", platformApi: "expo-barcode-scanner, expo-notifications, expo-location", structure: "app/(tabs)/ for browse; app/product/[id].tsx; lib/features/" },
    ios: { navigation: "TabView → NavigationStack per tab; sheet for cart/checkout", state: "@Observable catalog/cart models; async search", networking: "URLSession for catalog; StoreKit 2 or Stripe iOS SDK for payments", storage: "SwiftData for cart/favorites/orders; Keychain for payment tokens", platformApi: "AVFoundation for barcode, UserNotifications, CoreLocation", structure: "Browse/, Search/, Product/, Cart/, Checkout/, Orders/ with Shared/" },
    android: { navigation: "Bottom nav → Navigation Compose: home → product → cart → checkout", state: "ViewModel + StateFlow; Paging 3 for catalog; Room for cart", networking: "Retrofit for catalog; Stripe Android SDK for payments", storage: "Room for cart/favorites; DataStore for preferences", platformApi: "ML Kit barcode scan, Firebase Messaging, FusedLocationProvider", structure: ":browse, :search, :product, :cart, :checkout, :orders with :core" },
  },
  food: {
    rn: { navigation: "React Navigation: Home → Restaurant → Menu → Cart → Checkout → OrderTracking", state: "React Query for restaurants/menu; Zustand for cart + live order tracking via WebSocket", networking: "Axios for APIs; WebSocket for live order status; Stripe for payments", storage: "MMKV for address/preferences; React Query cache for restaurants", platformApi: "expo-location for delivery address, expo-notifications for order updates, expo-maps", structure: "features/{home,restaurant,cart,checkout,tracking,orders,account} with shared/location/" },
    flutter: { navigation: "GoRouter: /home, /restaurant/:id, /cart, /checkout, /tracking/:id", state: "Riverpod for restaurants + cart; StreamProvider for order tracking", networking: "Dio for APIs; web_socket_channel for live tracking", storage: "Drift for order history; Hive for saved addresses", platformApi: "geolocator, google_maps_flutter, flutter_local_notifications", structure: "lib/features/{home,restaurant,cart,checkout,tracking} with lib/core/location/" },
    expo: { navigation: "Expo Router: /(home), /restaurant/[id], /cart, /checkout, /tracking/[id]", state: "React Query + Zustand; WebSocket hook for order tracking", networking: "fetch for APIs; WebSocket for live tracking", storage: "expo-sqlite for order history; expo-secure-store for payment", platformApi: "expo-location, react-native-maps, expo-notifications", structure: "app/(tabs)/ for home; app/restaurant/[id].tsx; lib/tracking/" },
    ios: { navigation: "NavigationStack: Home → Restaurant → Cart → Checkout → Tracking", state: "@Observable models; AsyncStream for WebSocket order tracking", networking: "URLSession for REST; URLSessionWebSocketTask for live tracking", storage: "SwiftData for orders; Keychain for payment; UserDefaults for addresses", platformApi: "CoreLocation, MapKit, UserNotifications", structure: "Home/, Restaurant/, Cart/, Checkout/, Tracking/ with Shared/Location/" },
    android: { navigation: "Navigation Compose: home → restaurant → cart → checkout → tracking", state: "ViewModel + StateFlow; OkHttp WebSocket for tracking; Room for orders", networking: "Retrofit for APIs; OkHttp WebSocket for live tracking", storage: "Room for orders; DataStore for addresses; EncryptedSharedPreferences", platformApi: "FusedLocationProvider, Google Maps SDK, Firebase Messaging", structure: ":home, :restaurant, :cart, :checkout, :tracking with :core:location" },
  },
  finance: {
    rn: { navigation: "React Navigation: Dashboard → Transactions → Send/Receive → Settings; modal for auth", state: "React Query for accounts/transactions; Zustand for transfer flow state", networking: "Axios with certificate pinning; biometric auth gate on sensitive endpoints", storage: "expo-secure-store for tokens/keys; MMKV for non-sensitive preferences; no plaintext financial data", platformApi: "expo-local-authentication for biometric, expo-notifications, expo-camera for check deposit", structure: "features/{dashboard,transactions,transfer,cards,settings,auth} with shared/security/" },
    flutter: { navigation: "GoRouter: /dashboard, /transactions, /send, /receive, /settings with auth guard", state: "Riverpod for accounts/transactions; StateNotifier for transfer flow", networking: "Dio with certificate pinning and auth interceptor", storage: "flutter_secure_storage for keys; Drift for transaction cache (encrypted)", platformApi: "local_auth for biometric, flutter_local_notifications, camera for deposits", structure: "lib/features/{dashboard,transactions,transfer,settings} with lib/core/security/" },
    expo: { navigation: "Expo Router with auth layout group; /(main)/dashboard, /transactions, /send", state: "React Query for server data; Zustand for transfer flow", networking: "fetch with certificate pinning configuration; biometric gate", storage: "expo-secure-store for all sensitive data; expo-sqlite (encrypted) for transactions", platformApi: "expo-local-authentication, expo-notifications, expo-camera", structure: "app/(auth)/ for protected routes; app/(main)/ for dashboard; lib/security/" },
    ios: { navigation: "NavigationStack with authentication gate; TabView for Dashboard/Transactions/Settings", state: "@Observable models with biometric unlock gate; async transaction pagination", networking: "URLSession with certificate pinning; TLS 1.3 minimum", storage: "Keychain for all sensitive data; SwiftData for transaction cache (encrypted at rest)", platformApi: "LocalAuthentication (Face ID/Touch ID), UserNotifications, AVFoundation", structure: "Dashboard/, Transactions/, Transfer/, Settings/, Auth/ with Shared/Security/" },
    android: { navigation: "Navigation Compose with auth graph; bottom nav for main screens", state: "ViewModel + StateFlow; BiometricPrompt gate on sensitive flows", networking: "Retrofit + OkHttp with CertificatePinner; TLS 1.3", storage: "EncryptedSharedPreferences; Room with SQLCipher for transactions", platformApi: "BiometricPrompt, Firebase Messaging, CameraX for deposits", structure: ":dashboard, :transactions, :transfer, :settings, :auth with :core:security" },
  },
  travel: {
    rn: { navigation: "React Navigation: Search → Results → Detail → Booking → Trip; bottom tabs for Home/Trips/Account", state: "React Query for search/results; Zustand for booking flow; date range state", networking: "Axios for search/booking APIs; background fetch for trip updates", storage: "MMKV for recent searches; React Query cache for results", platformApi: "expo-location for nearby, react-native-maps for map view, expo-notifications for trip alerts", structure: "features/{search,results,detail,booking,trips,account} with shared/maps/" },
    flutter: { navigation: "GoRouter: /search, /results, /detail/:id, /booking, /trips", state: "Riverpod for search/results; StateNotifier for booking flow", networking: "Dio for search and booking APIs", storage: "Drift for trip history; Hive for recent searches", platformApi: "geolocator, google_maps_flutter, flutter_local_notifications", structure: "lib/features/{search,results,detail,booking,trips} with lib/core/maps/" },
    expo: { navigation: "Expo Router: /(home), /search, /results, /detail/[id], /booking, /trips", state: "React Query for search; Zustand for booking flow", networking: "fetch for APIs; expo-background-fetch for trip updates", storage: "expo-sqlite for trip history; expo-secure-store for payment", platformApi: "expo-location, react-native-maps, expo-notifications", structure: "app/(tabs)/ for home/trips; app/search/; lib/booking/" },
    ios: { navigation: "TabView (Home, Trips, Account) with NavigationStack per tab; sheet for booking", state: "@Observable search/booking models; async result pagination", networking: "URLSession with async/await for search and booking", storage: "SwiftData for trips; UserDefaults for recent searches; Keychain for payment", platformApi: "CoreLocation, MapKit, UserNotifications", structure: "Search/, Results/, Detail/, Booking/, Trips/ with Shared/Maps/" },
    android: { navigation: "Bottom nav with Navigation Compose; search → results → detail → booking flow", state: "ViewModel + StateFlow; Paging 3 for results; Room for trips", networking: "Retrofit for search/booking APIs", storage: "Room for trips; DataStore for recent searches", platformApi: "FusedLocationProvider, Google Maps SDK, Firebase Messaging", structure: ":search, :results, :detail, :booking, :trips with :core:maps" },
  },
  health: {
    rn: { navigation: "React Navigation bottom tabs: Dashboard, Log, Workouts, Profile; modal for quick-add", state: "React Query for health data sync; Zustand for logging form state", networking: "Axios for API; HealthKit/Google Fit bridges for device sync", storage: "MMKV for preferences; SQLite for local health log cache", platformApi: "react-native-health for HealthKit, expo-sensors for step count, expo-notifications for reminders", structure: "features/{dashboard,log,workouts,profile,settings} with shared/health-sync/" },
    flutter: { navigation: "GoRouter with bottom tabs: /dashboard, /log, /workouts, /profile", state: "Riverpod for health data; StateNotifier for log entry flow", networking: "Dio for API; health package for HealthKit/Google Fit", storage: "Drift for health logs; Hive for goals/preferences", platformApi: "health, pedometer, flutter_local_notifications", structure: "lib/features/{dashboard,log,workouts,profile} with lib/core/health-sync/" },
    expo: { navigation: "Expo Router tabs: /(dashboard), /(log), /(workouts), /(profile)", state: "React Query for synced data; Zustand for log forms", networking: "fetch for API; expo-health (or native module) for device sync", storage: "expo-sqlite for health logs; expo-secure-store for auth", platformApi: "expo-sensors, expo-notifications, HealthKit bridge", structure: "app/(tabs)/ for main screens; lib/health-sync/ for device integration" },
    ios: { navigation: "TabView: Dashboard, Log, Workouts, Profile with NavigationStack per tab", state: "@Observable health models; HealthKit async queries", networking: "URLSession for API; HealthKit framework for device data", storage: "SwiftData for health logs; UserDefaults for goals; Keychain for auth", platformApi: "HealthKit, CoreMotion, UserNotifications", structure: "Dashboard/, Log/, Workouts/, Profile/ with Shared/HealthSync/" },
    android: { navigation: "Bottom nav with Navigation Compose: dashboard, log, workouts, profile", state: "ViewModel + StateFlow; Health Connect API for device sync; Room for logs", networking: "Retrofit for API; Health Connect for device data", storage: "Room for health logs; DataStore for goals/preferences", platformApi: "Health Connect, Sensor API, Firebase Messaging", structure: ":dashboard, :log, :workouts, :profile with :core:health-sync" },
  },
  media: {
    rn: { navigation: "React Navigation bottom tabs: Home/Browse, Search, Library, Downloads, Profile", state: "React Query for catalog; Zustand for playback state; streaming player state machine", networking: "Axios for catalog; HLS/DASH via react-native-video or Expo AV", storage: "MMKV for preferences; SQLite for download queue; file system for offline media", platformApi: "expo-av or react-native-video for playback, expo-notifications, expo-background-fetch for downloads", structure: "features/{home,search,library,player,downloads,profile} with shared/player/" },
    flutter: { navigation: "GoRouter: /home, /search, /library, /player, /downloads", state: "Riverpod for catalog/library; StateNotifier for player state machine", networking: "Dio for catalog; video_player or chewie for playback", storage: "Drift for library/downloads; Hive for preferences; path_provider for media files", platformApi: "video_player, just_audio, flutter_local_notifications, flutter_downloader", structure: "lib/features/{home,search,library,player,downloads} with lib/core/player/" },
    expo: { navigation: "Expo Router tabs: /(home), /(search), /(library), /player, /downloads", state: "React Query for catalog; Zustand for player/download state", networking: "fetch for catalog; expo-av for playback", storage: "expo-file-system for downloads; expo-sqlite for library cache", platformApi: "expo-av, expo-notifications, expo-background-fetch", structure: "app/(tabs)/ for browse; app/player/; lib/downloads/" },
    ios: { navigation: "TabView: Home, Search, Library, Downloads; full-screen player overlay", state: "@Observable player state machine; AVPlayer for media; async catalog", networking: "URLSession for catalog; AVFoundation for HLS streaming", storage: "SwiftData for library; FileManager for downloads; Keychain for DRM tokens", platformApi: "AVFoundation, MediaPlayer, UserNotifications, BackgroundTasks", structure: "Home/, Search/, Library/, Player/, Downloads/ with Shared/Player/" },
    android: { navigation: "Bottom nav with full-screen player; Navigation Compose for catalog", state: "ViewModel + StateFlow; ExoPlayer (Media3) for playback; Room for library", networking: "Retrofit for catalog; ExoPlayer for HLS/DASH streaming", storage: "Room for library/downloads; DataStore for preferences; file storage for media", platformApi: "Media3/ExoPlayer, MediaSession, Firebase Messaging, DownloadManager", structure: ":home, :search, :library, :player, :downloads with :core:player" },
  },
  productivity: {
    rn: { navigation: "React Navigation: drawer or bottom tabs for Workspaces/Projects/Inbox/Search/Settings", state: "React Query for project/task data; Zustand for editor and sidebar state", networking: "Axios for CRUD APIs; WebSocket for real-time collaboration", storage: "WatermelonDB or SQLite for offline task/doc cache; MMKV for preferences", platformApi: "expo-notifications for reminders/mentions, expo-file-system for attachments, expo-calendar for sync", structure: "features/{workspace,project,task,editor,inbox,search,settings} with shared/sync/" },
    flutter: { navigation: "GoRouter with drawer: /workspaces, /project/:id, /task/:id, /inbox, /search", state: "Riverpod for project/task state; WebSocket stream for collaboration", networking: "Dio for CRUD; web_socket_channel for real-time", storage: "Drift for offline tasks/docs; Hive for preferences", platformApi: "flutter_local_notifications, file_picker, device_calendar", structure: "lib/features/{workspace,project,task,editor,inbox} with lib/core/sync/" },
    expo: { navigation: "Expo Router with drawer or tabs; /workspace/[id], /project/[id], /task/[id]", state: "React Query for data; Zustand for editor/UI state; WebSocket for collab", networking: "fetch for CRUD; WebSocket for real-time sync", storage: "expo-sqlite for offline cache; expo-secure-store for auth", platformApi: "expo-notifications, expo-file-system, expo-calendar", structure: "app/(drawer)/ or app/(tabs)/; lib/features/ for business logic" },
    ios: { navigation: "NavigationSplitView for sidebar + detail (iPad); NavigationStack for iPhone", state: "@Observable project/task models; AsyncStream for WebSocket collaboration", networking: "URLSession for CRUD; URLSessionWebSocketTask for real-time", storage: "SwiftData for offline tasks/docs; Keychain for auth; iCloud sync optional", platformApi: "UserNotifications, UIDocumentPicker, EventKit for calendar", structure: "Workspace/, Project/, Task/, Editor/, Inbox/ with Shared/Sync/" },
    android: { navigation: "Navigation Compose with DrawerLayout; adaptive layout for tablets", state: "ViewModel + StateFlow; OkHttp WebSocket for collaboration; Room for cache", networking: "Retrofit for CRUD; OkHttp WebSocket for real-time", storage: "Room for offline tasks/docs; DataStore for preferences", platformApi: "Firebase Messaging, Storage Access Framework, CalendarContract", structure: ":workspace, :project, :task, :editor, :inbox with :core:sync" },
  },
  education: {
    rn: { navigation: "React Navigation bottom tabs: Home/Learn, Courses, Progress, Profile", state: "React Query for courses/lessons; Zustand for lesson progress state", networking: "Axios for course APIs; background download for offline lessons", storage: "SQLite for progress tracking; MMKV for preferences; file system for offline content", platformApi: "expo-av for video/audio lessons, expo-notifications for study reminders, expo-speech for TTS", structure: "features/{home,courses,lesson,progress,profile} with shared/offline/" },
    flutter: { navigation: "GoRouter: /home, /courses, /course/:id, /lesson/:id, /progress", state: "Riverpod for courses; StateNotifier for lesson progress", networking: "Dio for courses; flutter_downloader for offline content", storage: "Drift for progress; Hive for preferences; path_provider for downloads", platformApi: "video_player, flutter_local_notifications, flutter_tts", structure: "lib/features/{home,courses,lesson,progress} with lib/core/offline/" },
    expo: { navigation: "Expo Router tabs: /(home), /(courses), /(progress); /lesson/[id]", state: "React Query for courses; Zustand for lesson state", networking: "fetch for APIs; expo-file-system for offline downloads", storage: "expo-sqlite for progress; expo-file-system for content cache", platformApi: "expo-av, expo-notifications, expo-speech", structure: "app/(tabs)/; app/lesson/[id].tsx; lib/offline/" },
    ios: { navigation: "TabView: Home, Courses, Progress, Profile; NavigationStack per tab", state: "@Observable course/lesson models; async progress tracking", networking: "URLSession for courses; BackgroundTasks for offline downloads", storage: "SwiftData for progress; FileManager for offline content", platformApi: "AVFoundation, UserNotifications, AVSpeechSynthesizer", structure: "Home/, Courses/, Lesson/, Progress/ with Shared/Offline/" },
    android: { navigation: "Bottom nav with Navigation Compose: home, courses, progress, profile", state: "ViewModel + StateFlow; Room for progress; WorkManager for downloads", networking: "Retrofit for courses; DownloadManager for offline content", storage: "Room for progress; DataStore for preferences; file storage for content", platformApi: "ExoPlayer, Firebase Messaging, TextToSpeech", structure: ":home, :courses, :lesson, :progress with :core:offline" },
  },
  general: {
    rn: { navigation: "React Navigation stack + bottom tabs as needed", state: "React Query for server state; Zustand for local UI state", networking: "Axios for REST APIs with retry and error interceptors", storage: "MMKV for preferences; expo-secure-store for tokens; SQLite for offline cache if needed", platformApi: "expo-notifications, expo-camera, expo-location as needed per feature", structure: "feature-based: features/{feature1,feature2,...} with shared/ for common utilities" },
    flutter: { navigation: "GoRouter with ShellRoute for tabs or drawer as needed", state: "Riverpod for async state management; freezed for immutable models", networking: "Dio with interceptors for auth and retry", storage: "Hive for preferences; flutter_secure_storage for tokens; Drift if offline needed", platformApi: "permission_handler; feature-specific plugins as needed", structure: "lib/features/ with lib/core/ for shared services" },
    expo: { navigation: "Expo Router with file-based routing and layout groups", state: "React Query for server state; Zustand for local state", networking: "fetch with error handling; expo-file-system for uploads/downloads", storage: "expo-secure-store for tokens; expo-sqlite for local data", platformApi: "Feature-specific Expo SDK modules as needed", structure: "app/ for routes; lib/ for features and shared utilities" },
    ios: { navigation: "NavigationStack with TabView as appropriate", state: "@Observable models with async/await patterns", networking: "URLSession with async/await", storage: "SwiftData for structured data; Keychain for sensitive data; UserDefaults for preferences", platformApi: "Feature-specific frameworks as needed", structure: "Feature-based modules with Shared/ for common services" },
    android: { navigation: "Jetpack Navigation Compose with appropriate top-level navigation", state: "ViewModel + StateFlow; Room for local persistence", networking: "Retrofit + OkHttp with interceptors", storage: "Room for structured data; DataStore for preferences; EncryptedSharedPreferences for tokens", platformApi: "Feature-specific AndroidX/Google libraries as needed", structure: "Feature-based modules with :core for shared code" },
  },
};

function getVariantDefaults(categoryKey) {
  return VARIANT_DEFAULTS[categoryKey] || VARIANT_DEFAULTS.general;
}

// ---------------------------------------------------------------------------
// Template fill
// ---------------------------------------------------------------------------

function fillTemplate(template, specText, row) {
  const appName = extractAppName(specText);
  const category = extractCategory(specText);
  const categoryKey = classifyCategory(category);
  const variants = getVariantDefaults(categoryKey);
  const today = new Date().toISOString().split("T")[0];

  const replacements = {
    APP_NAME: appName,
    APP_ID: row.idText,
    CATEGORY: category,
    SOURCE_SPEC_PATH: row.sourceSpec,
    DOWNSTREAM_REPO: row.targetRepo,
    GENERATED_DATE: today,
    PRODUCT_BOUNDARIES: generateProductBoundaries(specText, appName),
    ROUTE_MAP_ROWS: generateRouteMapRows(specText),
    API_SCHEMA_ROWS: generateApiSchemaRows(specText),
    DATA_MODEL_ROWS: generateDataModelRows(specText),
    SEED_DATA_PLAN: generateSeedDataPlan(specText, appName),
    FEATURE_FLAGS_ROWS: generateFeatureFlagRows(specText),
    TEST_CHECKLIST: generateTestChecklist(specText),

    VARIANT_RN_NAVIGATION: variants.rn.navigation,
    VARIANT_RN_STATE: variants.rn.state,
    VARIANT_RN_NETWORKING: variants.rn.networking,
    VARIANT_RN_STORAGE: variants.rn.storage,
    VARIANT_RN_PLATFORM_API: variants.rn.platformApi,
    VARIANT_RN_STRUCTURE: variants.rn.structure,

    VARIANT_FLUTTER_NAVIGATION: variants.flutter.navigation,
    VARIANT_FLUTTER_STATE: variants.flutter.state,
    VARIANT_FLUTTER_NETWORKING: variants.flutter.networking,
    VARIANT_FLUTTER_STORAGE: variants.flutter.storage,
    VARIANT_FLUTTER_PLATFORM_API: variants.flutter.platformApi,
    VARIANT_FLUTTER_STRUCTURE: variants.flutter.structure,

    VARIANT_EXPO_NAVIGATION: variants.expo.navigation,
    VARIANT_EXPO_STATE: variants.expo.state,
    VARIANT_EXPO_NETWORKING: variants.expo.networking,
    VARIANT_EXPO_STORAGE: variants.expo.storage,
    VARIANT_EXPO_PLATFORM_API: variants.expo.platformApi,
    VARIANT_EXPO_STRUCTURE: variants.expo.structure,

    VARIANT_IOS_NAVIGATION: variants.ios.navigation,
    VARIANT_IOS_STATE: variants.ios.state,
    VARIANT_IOS_NETWORKING: variants.ios.networking,
    VARIANT_IOS_STORAGE: variants.ios.storage,
    VARIANT_IOS_PLATFORM_API: variants.ios.platformApi,
    VARIANT_IOS_STRUCTURE: variants.ios.structure,

    VARIANT_ANDROID_NAVIGATION: variants.android.navigation,
    VARIANT_ANDROID_STATE: variants.android.state,
    VARIANT_ANDROID_NETWORKING: variants.android.networking,
    VARIANT_ANDROID_STORAGE: variants.android.storage,
    VARIANT_ANDROID_PLATFORM_API: variants.android.platformApi,
    VARIANT_ANDROID_STRUCTURE: variants.android.structure,
  };

  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

function validateNoPlaceholders(plan, row) {
  const remaining = plan.match(/\{\{[A-Z_]+\}\}/g);
  if (remaining) {
    throw new Error(`Plan for ${row.idText} still has unfilled placeholders: ${[...new Set(remaining)].join(", ")}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = parseArgs(process.argv.slice(2));
const rows = parseManifest();
const template = fs.readFileSync(templatePath, "utf8");

const targets = rows
  .filter((row) => row.id >= args.from && row.id <= args.to && row.done)
  .slice(0, args.limit);

if (targets.length === 0) {
  console.log("No seeded targets in range.");
  process.exit(0);
}

console.log(`Selected ${targets.length} target(s): ${targets.map((row) => `${row.idText} ${row.app}`).join(", ")}`);
fs.mkdirSync(cloneRoot, { recursive: true });

let generated = 0;
for (let index = 0; index < targets.length; index += 1) {
  const row = targets[index];
  const repoName = row.targetRepo.split("/")[1];
  const cloneDir = path.join(cloneRoot, repoName);
  console.log(`\n[${index + 1}/${targets.length}] ${row.idText} ${row.app} -> ${row.targetRepo}`);

  if (args.dryRun) {
    const specPath = path.join(root, row.sourceSpec);
    if (!fs.existsSync(specPath)) {
      throw new Error(`Source spec not found locally: ${specPath}`);
    }
    const specText = fs.readFileSync(specPath, "utf8");
    const plan = fillTemplate(template, specText, row);
    validateNoPlaceholders(plan, row);
    console.log("--- BEGIN GENERATED PLAN ---");
    console.log(plan);
    console.log("--- END GENERATED PLAN ---");
    generated += 1;
    continue;
  }

  // Execute mode: clone, generate, commit, push
  if (fs.existsSync(cloneDir)) fs.rmSync(cloneDir, { recursive: true, force: true });
  run(["gh", "repo", "clone", row.targetRepo, cloneDir, "--", "--depth", "1"], { capture: true });

  const specFileName = path.basename(row.sourceSpec);
  const specInClone = path.join(cloneDir, "docs", "source-specs", specFileName);
  if (!fs.existsSync(specInClone)) {
    throw new Error(`Source spec not found in clone: ${specInClone}`);
  }
  const specText = fs.readFileSync(specInClone, "utf8");
  const plan = fillTemplate(template, specText, row);
  validateNoPlaceholders(plan, row);

  const plansDir = path.join(cloneDir, "docs", "plans");
  fs.mkdirSync(plansDir, { recursive: true });
  fs.writeFileSync(path.join(plansDir, "README.md"), plan, "utf8");

  run(["git", "add", "docs/plans/README.md"], { cwd: cloneDir });
  run(["git", "commit", "-m", "docs(plans): generate build plan from source spec"], { cwd: cloneDir, capture: true });
  run(["git", "push"], { cwd: cloneDir, capture: true });

  fs.rmSync(cloneDir, { recursive: true, force: true });
  generated += 1;
  console.log(`  Pushed docs/plans/README.md to ${row.targetRepo}`);

  if (index < targets.length - 1 && args.delayMs > 0) {
    console.log(`  Waiting ${args.delayMs}ms...`);
    sleep(args.delayMs);
  }
}

console.log(`\nCompleted ${args.execute ? "generation" : "dry run"} for ${generated} target(s).`);
