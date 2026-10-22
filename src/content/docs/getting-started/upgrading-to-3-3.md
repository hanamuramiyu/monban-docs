---
title: Upgrading to 3.3
description: Upgrade to the Geyser and Floodgate release without changing Java access behavior accidentally.
---

Release 3.3.0 adds `FLOODGATE` as a third identity type. Existing Java access records keep their `ONLINE` and `OFFLINE` meaning, and Floodgate integration starts disabled.

## Before upgrading

1. Back up `plugins/monban/` on Velocity and every synchronized backend.
2. Replace the Velocity JAR with `monban-velocity-3.3.0.jar`.
3. Replace backend monban JARs only if those backends use synchronized permissions.
4. Keep `sync.yml` unchanged when it is already shared and working.

## What changes in Velocity configuration

Current Velocity configurations contain an explicit `identity.floodgate` block:

```yaml
identity:
  mode: AUTO
  hybrid:
    enabled: false
    dual-entry-preference: ONLINE
  floodgate:
    enabled: false
    require-provider: false
```

When an older Velocity file has no Floodgate block, monban adds the explicit defaults. The section is not accepted in a standalone configuration.

## Enable Bedrock access only when needed

For a Geyser network, install Floodgate before enabling the integration:

```yaml
identity:
  floodgate:
    enabled: true
    require-provider: true
```

Use `require-provider: true` when the network's access policy depends on Floodgate. monban will refuse to start if the Floodgate API cannot be found. Provider errors during login deny the connection rather than treating the player as a Java identity.

## Add Bedrock records

Floodgate records are separate from Java records:

```text
/monban whitelist add floodgate .BedrockName
```

Use the exact Java username reported by Floodgate, including its configured prefix for unlinked accounts. The XUID is optional metadata and is not the matching key.

## Verify the upgrade

- Velocity starts and `/monban status` reports the expected deployment and identity mode.
- Java players still match their existing `ONLINE` or `OFFLINE` records.
- The Floodgate record is visible in `/monban whitelist list floodgate` and matches the live Bedrock connection.
- A synchronized backend receives the new state revision and refreshes Java permission attachments.
- Floodgate admission and proxy permissions behave as expected; backend-local Floodgate permission attachments are not part of 3.3.0.
- No backend shows a stale or locally divergent `server-groups.yml` mapping.

See [Geyser & Floodgate](/velocity/geyser-floodgate/) for the complete topology and [Troubleshooting](/help/troubleshooting/) for provider and synchronization failures.
