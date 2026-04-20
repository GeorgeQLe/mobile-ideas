# Security

Report sensitive problems privately. Do not open public issues or pull requests containing secrets, private data, copied proprietary material, or exploit details.

## What To Report

Use a private report for:

- Secrets, tokens, credentials, private keys, session data, or production configuration.
- Real user data, private account data, personal messages, precise locations, payment details, health data, or other sensitive records.
- Copied proprietary source code, private API details, reverse-engineered internals, screenshots, logos, app-store media, copyrighted media, paywalled content, or unlicensed datasets.
- Unsafe affiliation language, public-release mistakes, or downstream repository visibility mistakes.
- Seeded downstream repositories that include the wrong source spec, missing non-affiliation language, missing original-assets policy, or inappropriate public visibility.

## Reporting Path

If GitHub private vulnerability reporting is enabled for this repository, use that channel first.

If private vulnerability reporting is not available, contact the repository owner through a private channel and include:

- A short summary of the issue.
- The affected file, spec ID, downstream repo, or command output.
- Whether any secret, private data, copied asset, or public visibility exposure is involved.
- The safest remediation you can identify.

Do not include sensitive raw values unless the owner explicitly requests them through a secure channel.

## Handling Policy

Sensitive reports should be triaged before normal documentation work. The expected response is to remove or rotate exposed secrets, remove private or proprietary material, correct unsafe wording, restore private visibility where needed, update the relevant task evidence, and document the fix without preserving sensitive details.

## Scope

This repository contains planning and specification documents, not production application code. Downstream implementation repositories must maintain their own security policies, dependency review, secret scanning, and release gates.
