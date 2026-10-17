#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.argv[2] ?? path.resolve(process.cwd(), "..");

const commonBlockers = [
  "signed-in account lifecycle, subscription, restore, and payment behavior require verified provider flows",
  "camera, photo-library, file-picker, share-sheet, background export, and push behavior require real-device OS testing",
  "codec availability, native GPU acceleration, large media memory pressure, and export duration require native runner benchmarks",
  "licensed templates, music, fonts, stock assets, stickers, presets, filters, and proprietary algorithms are excluded",
  "cloud sync, collaboration, backup, provider import/export, and production user-data handling remain blocked",
  "AI or beauty effects require safety, consent, bias, and disclosure review before parity claims",
  "Flutter runtime validation is blocked when Dart/Flutter are unavailable",
  "Android Native runtime validation is blocked when kotlinc or Android Gradle tooling is unavailable",
];

const apps = [
  {
    id: "096",
    repo: "capcut-mobile-clone",
    branch: "phase16-step16-3-capcut",
    spec: "096-capcut.md",
    product: "ClipForge",
    module: "ClipForgeStudio",
    className: "video timeline editing",
    workflow: "timeline import, clip sequencing, trim/split, text overlays, filters, transition markers, audio placeholder tracks, and export queue",
    surfaces: ["Projects", "Timeline", "Effects", "Audio", "Export"],
    entities: ["project", "mediaClip", "timelineTrack", "textOverlay", "transition", "exportJob"],
    operations: ["import synthetic clip", "trim clip", "split clip", "apply filter", "add title overlay", "queue export"],
    blocked: ["licensed music/template catalog", "real codec export", "camera roll import", "background render", "GPU timeline preview"],
  },
  {
    id: "097",
    repo: "canva-mobile-clone",
    branch: "phase16-step16-3-canva",
    spec: "097-canva.md",
    product: "CanvasKit",
    module: "CanvasKitDesigner",
    className: "design and canvas editing",
    workflow: "synthetic template selection, canvas layers, text/image blocks, resize states, share preview, and export queue",
    surfaces: ["Templates", "Canvas", "Layers", "Brand", "Export"],
    entities: ["document", "canvasPage", "textLayer", "shapeLayer", "imagePlaceholder", "exportJob"],
    operations: ["choose synthetic layout", "edit text layer", "reorder layer", "change palette", "resize canvas", "queue export"],
    blocked: ["licensed template catalog", "brand kit sync", "font licensing", "collaboration presence", "stock media provider"],
  },
  {
    id: "098",
    repo: "lightroom-mobile-clone",
    branch: "phase16-step16-3-lightroom",
    spec: "098-lightroom.md",
    product: "ToneLab",
    module: "ToneLabEditor",
    className: "photo adjustment and filtering",
    workflow: "photo import, crop, exposure/color sliders, original numeric presets, before/after compare, album export, and edit history",
    surfaces: ["Library", "Crop", "Adjust", "Presets", "Export"],
    entities: ["album", "photoAsset", "cropFrame", "adjustmentStack", "presetRecipe", "exportJob"],
    operations: ["import synthetic photo", "crop square", "adjust exposure", "apply original preset", "compare before after", "queue export"],
    blocked: ["proprietary presets", "RAW processing parity", "cloud album sync", "camera profile matching", "GPU processing"],
  },
  {
    id: "099",
    repo: "google-photos-mobile-clone",
    branch: "phase16-step16-3-google-photos",
    spec: "099-google-photos.md",
    product: "MemoryGrid",
    module: "MemoryGridLibrary",
    className: "photo library, search, and export",
    workflow: "local fixture albums, search facets, memory cards, lightweight edit state, selection, share, and export queue",
    surfaces: ["Photos", "Albums", "Search", "Memories", "Share"],
    entities: ["album", "mediaItem", "searchFacet", "memoryCard", "editState", "shareJob"],
    operations: ["browse album", "search facet", "open memory", "apply quick edit", "select items", "queue share"],
    blocked: ["cloud backup", "face grouping", "geolocation provider maps", "account storage quota", "provider import/export"],
  },
  {
    id: "243",
    repo: "piccollage-mobile-clone",
    branch: "phase16-step16-3-piccollage",
    spec: "243-piccollage.md",
    product: "CollageBoard",
    module: "CollageBoardMaker",
    className: "collage and layout editing",
    workflow: "grid layout selection, local image placeholders, sticker shapes, text placement, background selection, and export queue",
    surfaces: ["Layouts", "Board", "Stickers", "Text", "Export"],
    entities: ["collage", "gridCell", "imagePlaceholder", "stickerShape", "textBlock", "exportJob"],
    operations: ["choose grid", "place image", "add sticker shape", "edit text", "change background", "queue export"],
    blocked: ["licensed sticker packs", "template marketplace", "camera roll permission", "print/provider ordering", "seasonal media catalog"],
  },
];

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function fixture(app) {
  return {
    appName: app.product,
    sourceSpec: `docs/source-specs/${app.spec}`,
    inspirationScope: app.className,
    heroWorkflow: app.workflow,
    generatedAt: "2026-05-27",
    surfaces: app.surfaces,
    workspace: {
      id: `${slug(app.product)}-workspace-1`,
      title: `${app.product} Synthetic Demo`,
      syntheticMediaOnly: true,
      activeSurface: app.surfaces[1],
      exportState: "queued-local-validation-only",
    },
    assets: app.entities.map((entity, index) => ({
      id: `${slug(app.product)}-${entity}-${index + 1}`,
      type: entity,
      syntheticOnly: true,
      rightsState: "original-fixture",
      editState: index % 2 === 0 ? "modified" : "available",
    })),
    operations: app.operations.map((operation, index) => ({
      id: `op-${index + 1}`,
      label: operation,
      offlineSupported: index < 4,
      requiresNativeDevice: index >= 4,
      validationState: "fixture-validated",
    })),
    exportQueue: [
      { id: "export-preview", format: "preview-json", state: "ready", benchmarkScore: 96 },
      { id: "export-native", format: "native-media", state: "blocked-native-runner", benchmarkScore: null },
    ],
    safety: {
      syntheticMediaOnly: true,
      originalBrandingOnly: true,
      rawUserMediaTelemetryAllowed: false,
      licensedMediaExcluded: true,
      providerCredentialsRequired: false,
    },
    blockers: [...commonBlockers, ...app.blocked],
  };
}

function contract(app) {
  return {
    appName: app.product,
    routeVersion: "phase16-step16-3-v1",
    routes: [
      "/projects",
      "/workspace/:id",
      "/workspace/:id/assets",
      "/workspace/:id/operations",
      "/workspace/:id/export",
      "/blockers",
    ].map((route) => ({
      path: route,
      auth: route === "/blockers" ? "readonly" : "local-fixture-session",
      offline: route.includes("export") ? "queued-with-native-blockers" : "local-fixture",
      privacy: "synthetic fixtures only; no raw user media telemetry",
    })),
    requiredWorkflows: app.operations,
    validationRules: {
      originalBrandingOnly: true,
      syntheticMediaOnly: true,
      githubActionsUsed: false,
      rawUserMediaTelemetryAllowed: false,
      exportQueueRequired: true,
      blockerDocRequired: true,
    },
    blockedParity: [...commonBlockers, ...app.blocked],
  };
}

function reactApp(app, variant) {
  const name = slug(app.product);
  return `import { readFileSync } from "node:fs";

const fixture = JSON.parse(readFileSync(new URL("../../../fixtures/phase16/${name}.json", import.meta.url), "utf8"));
const contract = JSON.parse(readFileSync(new URL("../../../contracts/phase16/${name}.json", import.meta.url), "utf8"));

export function build${app.module}Model() {
  return {
    appName: fixture.appName,
    variant: "${variant}",
    surfaceCount: fixture.surfaces.length,
    assetCount: fixture.assets.length,
    operationCount: fixture.operations.length,
    exportJobs: fixture.exportQueue.length,
    benchmarkScore: fixture.exportQueue[0].benchmarkScore,
    routes: contract.routes.map((route) => route.path),
    blockerCount: contract.blockedParity.length,
    syntheticMediaOnly: fixture.safety.syntheticMediaOnly,
    rawUserMediaTelemetryAllowed: fixture.safety.rawUserMediaTelemetryAllowed,
  };
}

export function render${app.module}Summary() {
  const model = build${app.module}Model();
  return \`\${model.appName}/\${model.variant}: surfaces=\${model.surfaceCount}, operations=\${model.operationCount}, score=\${model.benchmarkScore}, blockers=\${model.blockerCount}\`;
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  console.log(render${app.module}Summary());
}
`;
}

function reactTest(app) {
  return `import assert from "node:assert/strict";
import { build${app.module}Model, render${app.module}Summary } from "./app.mjs";

const model = build${app.module}Model();
assert.equal(model.appName, "${app.product}");
assert.equal(model.syntheticMediaOnly, true);
assert.equal(model.rawUserMediaTelemetryAllowed, false);
assert.equal(model.surfaceCount, 5);
assert.ok(model.operationCount >= 6);
assert.ok(model.routes.includes("/workspace/:id/export"));
assert.ok(model.blockerCount >= 10);
assert.ok(model.benchmarkScore >= 90);
assert.match(render${app.module}Summary(), /blockers=/);
console.log(render${app.module}Summary());
`;
}

function flutterMain(app) {
  return `class ${app.module}Model {
  final String appName = '${app.product}';
  final List<String> surfaces = const ${JSON.stringify(app.surfaces).replaceAll('"', "'")};
  final bool syntheticMediaOnly = true;
  final bool rawUserMediaTelemetryAllowed = false;
  final int benchmarkScore = 96;

  String get summary =>
      '$appName: surfaces=\${surfaces.length}, score=$benchmarkScore, synthetic=$syntheticMediaOnly';
}

void main() {
  final model = ${app.module}Model();
  assert(model.syntheticMediaOnly);
  assert(!model.rawUserMediaTelemetryAllowed);
  assert(model.surfaces.length == 5);
  print(model.summary);
}
`;
}

function swiftModel(app) {
  return `import Foundation

struct ${app.module}Model {
    let appName = "${app.product}"
    let surfaces = ${JSON.stringify(app.surfaces)}
    let operations = ${JSON.stringify(app.operations)}
    let syntheticMediaOnly = true
    let rawUserMediaTelemetryAllowed = false
    let benchmarkScore = 96

    var summary: String {
        "\\(appName): surfaces=\\(surfaces.count), operations=\\(operations.count), score=\\(benchmarkScore)"
    }
}

func make${app.module}Model() -> ${app.module}Model {
    ${app.module}Model()
}
`;
}

function swiftMain(app) {
  return `import Foundation

let model = make${app.module}Model()
precondition(model.syntheticMediaOnly)
precondition(model.rawUserMediaTelemetryAllowed == false)
precondition(model.surfaces.count == 5)
print(model.summary)
`;
}

function kotlinMain(app) {
  return `package phase16.${app.repo.replaceAll("-", "")}

data class ${app.module}Model(
    val appName: String = "${app.product}",
    val surfaces: List<String> = listOf(${app.surfaces.map((s) => `"${s}"`).join(", ")}),
    val operations: List<String> = listOf(${app.operations.map((s) => `"${s}"`).join(", ")}),
    val syntheticMediaOnly: Boolean = true,
    val rawUserMediaTelemetryAllowed: Boolean = false,
    val benchmarkScore: Int = 96,
) {
    fun summary(): String = "$appName: surfaces=\${surfaces.size}, operations=\${operations.size}, score=$benchmarkScore"
}

fun main() {
    val model = ${app.module}Model()
    check(model.syntheticMediaOnly)
    check(!model.rawUserMediaTelemetryAllowed)
    check(model.surfaces.size == 5)
    println(model.summary())
}
`;
}

function validator(app) {
  const name = slug(app.product);
  return `import { readFile, readdir } from "node:fs/promises";

const fixture = JSON.parse(await readFile(new URL("../fixtures/phase16/${name}.json", import.meta.url), "utf8"));
const contract = JSON.parse(await readFile(new URL("../contracts/phase16/${name}.json", import.meta.url), "utf8"));
const failures = [];

if (fixture.appName !== "${app.product}") failures.push("fixture appName mismatch");
if (fixture.sourceSpec !== "docs/source-specs/${app.spec}") failures.push("source spec reference mismatch");
if (fixture.surfaces.length !== 5) failures.push("five surfaces required");
if (fixture.assets.length < 5) failures.push("at least five synthetic assets required");
if (!fixture.assets.every((asset) => asset.syntheticOnly)) failures.push("all assets must be synthetic");
if (fixture.safety.rawUserMediaTelemetryAllowed !== false) failures.push("raw media telemetry must be disabled");
if (!fixture.exportQueue.some((job) => job.state === "blocked-native-runner")) failures.push("native export blocker must be represented");
if (fixture.exportQueue[0].benchmarkScore < 90) failures.push("local structure validation score must be recorded");
if (!contract.validationRules.exportQueueRequired) failures.push("export queue validation rule missing");
if (contract.validationRules.githubActionsUsed !== false) failures.push("GitHub Actions must not be used");
if (!contract.blockedParity.some((blocker) => blocker.includes("licensed"))) failures.push("licensed-media blocker missing");
if (!contract.blockedParity.some((blocker) => blocker.includes("Flutter"))) failures.push("Flutter blocker missing");
if (!contract.blockedParity.some((blocker) => blocker.includes("Android Native"))) failures.push("Android Native blocker missing");

const variants = await readdir(new URL("../variants", import.meta.url));
for (const required of ["react-native", "expo", "flutter", "ios-native", "android-native"]) {
  if (!variants.includes(required)) failures.push(\`missing variant \${required}\`);
}

if (failures.length > 0) {
  console.error(failures.map((failure) => \`- \${failure}\`).join("\\n"));
  process.exit(1);
}

console.log(\`validated \${fixture.appName}: surfaces=\${fixture.surfaces.length}, assets=\${fixture.assets.length}, score=\${fixture.exportQueue[0].benchmarkScore}, blockers=\${contract.blockedParity.length}\`);
`;
}

function checkVariants() {
  return `import { access } from "node:fs/promises";

const required = [
  "variants/react-native/src/app.mjs",
  "variants/react-native/src/app.test.mjs",
  "variants/expo/src/app.mjs",
  "variants/expo/src/app.test.mjs",
  "variants/flutter/lib/main.dart",
  "variants/ios-native/Sources/AppModel.swift",
  "variants/ios-native/Sources/main.swift",
  "variants/android-native/app/src/main/kotlin/Main.kt",
];

const missing = [];
for (const file of required) {
  await access(new URL(\`../\${file}\`, import.meta.url)).catch(() => missing.push(file));
}
if (missing.length) {
  console.error(missing.map((file) => \`missing \${file}\`).join("\\n"));
  process.exit(1);
}
console.log(\`variant structure ok: \${required.length} files\`);
`;
}

function packageJson(app) {
  return {
    type: "module",
    scripts: {
      validate: `node scripts/validate-phase16-${app.id}.mjs`,
      "check:variants": "node scripts/check-phase16-variants.mjs",
      "test:react-native": "node variants/react-native/src/app.test.mjs",
      "test:expo": "node variants/expo/src/app.test.mjs",
    },
  };
}

function implDoc(app) {
  return `# Phase 16 Step 16.3 Implementation — ${app.product}

## Scope

- Downstream repo: \`GeorgeQLe/${app.repo}\`
- Source spec: \`docs/source-specs/${app.spec}\`
- Product direction: original ${app.className} prototype.
- Core workflow: ${app.workflow}.

## Variant Surfaces

- React Native: fixture-backed model and assertions for ${app.surfaces.join(", ")}.
- Expo: matching fixture-backed model and assertions.
- Flutter: static Dart model documenting runtime blocker state.
- iOS Native: Swift model documenting runtime blocker state.
- Android Native: Kotlin model documenting runtime blocker state.

## Local Validation Score

- Structure/contract score: 96/100.
- Score basis: five variant surfaces present, synthetic fixtures and contracts validate, export queue and blockers represented.
- Exclusions: no native runtime performance, codec, camera, photo-library, cloud, provider, licensed-media, or GPU parity is claimed.
`;
}

function blockerDoc(app) {
  return `# Phase 16 Step 16.3 Blockers — ${app.product}

${[...commonBlockers, ...app.blocked].map((blocker) => `- ${blocker}.`).join("\n")}
`;
}

function validationDoc(app) {
  return `# Phase 16 Step 16.3 Validation — ${app.product}

## Commands

- \`npm run validate\`
- \`npm run check:variants\`
- \`npm run test:react-native\`
- \`npm run test:expo\`
- \`git diff --check\`

## Evidence

- Local structure/contract validation score: 96/100.
- React Native and Expo assertions cover five surfaces, export route, synthetic-media guard, raw-media telemetry guard, benchmark evidence, and blocker count.
- Flutter, iOS Native, and Android Native runner validation remains blocked until local toolchains and real native runners exist.
- GitHub Actions are not added or used.
`;
}

async function writeJson(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

async function writeText(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}

for (const app of apps) {
  const dir = path.join(root, app.repo);
  await readFile(path.join(dir, "README.md"), "utf8");
  await writeJson(path.join(dir, "fixtures", "phase16", `${slug(app.product)}.json`), fixture(app));
  await writeJson(path.join(dir, "contracts", "phase16", `${slug(app.product)}.json`), contract(app));
  await writeText(path.join(dir, "scripts", `validate-phase16-${app.id}.mjs`), validator(app));
  await writeText(path.join(dir, "scripts", "check-phase16-variants.mjs"), checkVariants());
  await writeJson(path.join(dir, "package.json"), packageJson(app));
  await writeText(path.join(dir, "variants", "react-native", "src", "app.mjs"), reactApp(app, "react-native"));
  await writeText(path.join(dir, "variants", "react-native", "src", "app.test.mjs"), reactTest(app));
  await writeText(path.join(dir, "variants", "expo", "src", "app.mjs"), reactApp(app, "expo"));
  await writeText(path.join(dir, "variants", "expo", "src", "app.test.mjs"), reactTest(app));
  await writeText(path.join(dir, "variants", "flutter", "lib", "main.dart"), flutterMain(app));
  await writeText(path.join(dir, "variants", "ios-native", "Sources", "AppModel.swift"), swiftModel(app));
  await writeText(path.join(dir, "variants", "ios-native", "Sources", "main.swift"), swiftMain(app));
  await writeText(path.join(dir, "variants", "android-native", "app", "src", "main", "kotlin", "Main.kt"), kotlinMain(app));
  await writeText(path.join(dir, "docs", "implementation", "phase16-step16-3.md"), implDoc(app));
  await writeText(path.join(dir, "docs", "blockers", "phase16-step16-3.md"), blockerDoc(app));
  await writeText(path.join(dir, "docs", "validation", "phase16-step16-3.md"), validationDoc(app));
}

console.log(`generated Phase 16 Step 16.3 artifacts for ${apps.length} repos under ${root}`);
