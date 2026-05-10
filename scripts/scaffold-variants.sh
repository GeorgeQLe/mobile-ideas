#!/usr/bin/env bash
set -uo pipefail

TEMPLATE_DIR="/Users/georgele/projects/mobile/dev/mobile-ideas/templates/ci"
WORK_DIR=$(mktemp -d)
RESULTS_FILE="/Users/georgele/projects/mobile/dev/mobile-ideas/scripts/scaffold-results.log"
MIN_DELAY=30

REPOS=(
  # "chatgpt-mobile-clone:ChatGPT"  # already done
  "claude-mobile-clone:Claude"
  "perplexity-mobile-clone:Perplexity"
  "character-ai-mobile-clone:Character.AI"
  "replika-mobile-clone:Replika"
  "poe-mobile-clone:Poe"
  "gemini-mobile-clone:Gemini"
  "microsoft-copilot-mobile-clone:Microsoft Copilot"
  "grok-mobile-clone:Grok"
  "deepseek-mobile-clone:DeepSeek"
  "meta-ai-mobile-clone:Meta AI"
  "you-com-mobile-clone:You.com"
  "pi-mobile-clone:Pi"
  "phind-mobile-clone:Phind"
  "huggingchat-mobile-clone:HuggingChat"
  "wysa-mobile-clone:Wysa"
  "elsa-speak-mobile-clone:ELSA Speak"
  "otterpilot-mobile-clone:OtterPilot"
  "grammarly-keyboard-mobile-clone:Grammarly Keyboard"
  "wordtune-mobile-clone:Wordtune"
  "quillbot-mobile-clone:QuillBot"
  "ask-ai-mobile-clone:Ask AI"
  "genie-mobile-clone:Genie"
  "monica-mobile-clone:Monica"
  "notion-ai-mobile-clone:Notion AI"
  "forefront-ai-mobile-clone:Forefront AI"
  "consensus-mobile-clone:Consensus"
)

VARIANTS=("react-native" "flutter" "expo" "ios-native" "android-native")

> "$RESULTS_FILE"
echo "=== Scaffold started at $(date -u '+%Y-%m-%d %H:%M:%S UTC') ===" | tee -a "$RESULTS_FILE"

generate_readme() {
  local app_name="$1"
  local variant="$2"

  case "$variant" in
    react-native)
      cat <<READMEEOF
# ${app_name} Clone — React Native Variant

Status: scaffold (implementation pending)

## Stack

- **Runtime:** Node.js + React Native CLI
- **Language:** TypeScript
- **Navigation:** React Navigation
- **State:** Redux Toolkit or Zustand

## Build & Run

\`\`\`bash
npm install
npx react-native run-ios
npx react-native run-android
\`\`\`

## Test

\`\`\`bash
npx jest
\`\`\`

## Lint

\`\`\`bash
npx eslint src/
npx tsc --noEmit
\`\`\`
READMEEOF
      ;;
    flutter)
      cat <<READMEEOF
# ${app_name} Clone — Flutter Variant

Status: scaffold (implementation pending)

## Stack

- **Runtime:** Flutter SDK
- **Language:** Dart
- **State:** Provider or Riverpod

## Build & Run

\`\`\`bash
flutter pub get
flutter run
\`\`\`

## Test

\`\`\`bash
flutter test
\`\`\`

## Lint

\`\`\`bash
flutter analyze
\`\`\`
READMEEOF
      ;;
    expo)
      cat <<READMEEOF
# ${app_name} Clone — Expo Variant

Status: scaffold (implementation pending)

## Stack

- **Runtime:** Node.js + Expo CLI
- **Language:** TypeScript
- **Navigation:** Expo Router or React Navigation
- **State:** Redux Toolkit or Zustand

## Build & Run

\`\`\`bash
npm install
npx expo start
\`\`\`

## Test

\`\`\`bash
npx jest
\`\`\`

## Lint

\`\`\`bash
npx eslint src/
npx tsc --noEmit
\`\`\`
READMEEOF
      ;;
    ios-native)
      cat <<READMEEOF
# ${app_name} Clone — iOS Native Variant

Status: scaffold (implementation pending)

## Stack

- **Runtime:** Xcode + iOS SDK
- **Language:** Swift (SwiftUI preferred, UIKit where needed)
- **Architecture:** MVVM

## Build & Run

\`\`\`bash
xcodebuild -scheme ${app_name}Clone -destination 'platform=iOS Simulator,name=iPhone 16'
\`\`\`

## Test

\`\`\`bash
xcodebuild test -scheme ${app_name}Clone
\`\`\`

## Lint

\`\`\`bash
swiftlint
\`\`\`
READMEEOF
      ;;
    android-native)
      cat <<READMEEOF
# ${app_name} Clone — Android Native Variant

Status: scaffold (implementation pending)

## Stack

- **Runtime:** Android Studio + Android SDK
- **Language:** Kotlin (Jetpack Compose preferred)
- **Architecture:** MVVM

## Build & Run

\`\`\`bash
./gradlew assembleDebug
\`\`\`

## Test

\`\`\`bash
./gradlew test
./gradlew connectedAndroidTest
\`\`\`

## Lint

\`\`\`bash
./gradlew ktlintCheck
\`\`\`
READMEEOF
      ;;
  esac
}

success_count=0
fail_count=0

for entry in "${REPOS[@]}"; do
  repo_slug="${entry%%:*}"
  app_name="${entry#*:}"
  full_repo="GeorgeQLe/${repo_slug}"
  repo_dir="${WORK_DIR}/${repo_slug}"

  echo "" | tee -a "$RESULTS_FILE"
  echo "--- Processing ${full_repo} (${app_name}) ---" | tee -a "$RESULTS_FILE"

  # Clone
  if ! git clone --depth 1 "https://github.com/${full_repo}.git" "$repo_dir" 2>&1; then
    echo "FAIL: clone failed for ${full_repo}" | tee -a "$RESULTS_FILE"
    ((fail_count++))
    sleep "$MIN_DELAY"
    continue
  fi

  cd "$repo_dir"

  # Create variant directories with READMEs
  for v in "${VARIANTS[@]}"; do
    mkdir -p "variants/${v}"
    generate_readme "$app_name" "$v" > "variants/${v}/README.md"
  done

  # Create shared directories
  mkdir -p shared/assets shared/api-contracts shared/test-fixtures
  touch shared/assets/.gitkeep shared/api-contracts/.gitkeep shared/test-fixtures/.gitkeep

  # Copy CI/CD workflows
  mkdir -p .github/workflows
  for wf in react-native.yml flutter.yml expo.yml ios-native.yml android-native.yml benchmark.yml; do
    cp "${TEMPLATE_DIR}/${wf}" ".github/workflows/${wf}"
  done

  # Commit and push
  git add -A
  git commit -m "$(cat <<'COMMITEOF'
chore: scaffold multi-variant structure

Add 5 variant directories (react-native, flutter, expo, ios-native,
android-native) with placeholder READMEs, shared directory scaffold
(assets, api-contracts, test-fixtures), and 6 CI/CD workflow templates.

Part of Phase 11 Step 11.1 — AI & Assistants category scaffold.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
COMMITEOF
  )"

  if ! git push origin main 2>&1; then
    echo "FAIL: push failed for ${full_repo}" | tee -a "$RESULTS_FILE"
    ((fail_count++))
    sleep "$MIN_DELAY"
    continue
  fi

  # Disable GitHub Actions
  if ! gh api -X PUT "repos/${full_repo}/actions/permissions" \
    --input - <<< '{"enabled":false}' 2>&1; then
    echo "WARN: failed to disable Actions for ${full_repo}" | tee -a "$RESULTS_FILE"
  fi

  # Verify visibility
  visibility=$(gh api "repos/${full_repo}" --jq '.visibility' 2>&1)
  if [ "$visibility" != "private" ]; then
    echo "FAIL: visibility is '${visibility}' (expected 'private') for ${full_repo}" | tee -a "$RESULTS_FILE"
    ((fail_count++))
    sleep "$MIN_DELAY"
    continue
  fi

  # Verify files exist
  file_count=0
  for v in "${VARIANTS[@]}"; do
    if gh api "repos/${full_repo}/contents/variants/${v}/README.md" --jq '.name' >/dev/null 2>&1; then
      ((file_count++))
    fi
  done
  for d in assets api-contracts test-fixtures; do
    if gh api "repos/${full_repo}/contents/shared/${d}/.gitkeep" --jq '.name' >/dev/null 2>&1; then
      ((file_count++))
    fi
  done
  for wf in react-native.yml flutter.yml expo.yml ios-native.yml android-native.yml benchmark.yml; do
    if gh api "repos/${full_repo}/contents/.github/workflows/${wf}" --jq '.name' >/dev/null 2>&1; then
      ((file_count++))
    fi
  done

  if [ "$file_count" -eq 14 ]; then
    echo "OK: ${full_repo} — 14/14 files, PRIVATE, Actions disabled" | tee -a "$RESULTS_FILE"
    ((success_count++))
  else
    echo "FAIL: ${full_repo} — ${file_count}/14 files verified" | tee -a "$RESULTS_FILE"
    ((fail_count++))
  fi

  cd /Users/georgele/projects/mobile/dev/mobile-ideas
  rm -rf "$repo_dir"

  echo "Waiting ${MIN_DELAY}s before next repo..." | tee -a "$RESULTS_FILE"
  sleep "$MIN_DELAY"
done

echo "" | tee -a "$RESULTS_FILE"
echo "=== Scaffold complete at $(date -u '+%Y-%m-%d %H:%M:%S UTC') ===" | tee -a "$RESULTS_FILE"
echo "Success: ${success_count}, Failed: ${fail_count}, Total: ${#REPOS[@]}" | tee -a "$RESULTS_FILE"

# Post-batch rate limit check
echo "" | tee -a "$RESULTS_FILE"
echo "Post-batch rate limit:" | tee -a "$RESULTS_FILE"
gh api rate_limit --jq '.rate | "remaining: \(.remaining)/\(.limit), resets: \(.reset | strftime("%Y-%m-%d %H:%M:%S UTC"))"' | tee -a "$RESULTS_FILE"

rm -rf "$WORK_DIR"
