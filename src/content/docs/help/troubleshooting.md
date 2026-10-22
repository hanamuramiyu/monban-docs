---
title: Troubleshooting
description: Diagnose startup, identity, admission, Floodgate, and synchronization failures.
---

## Start with the failing boundary

| Symptom | Likely layer |
| --- | --- |
| Server or proxy stops during startup | Configuration or topology |
| Player is denied before reaching the network | Identity or `NETWORK` admission |
| Player joins the proxy but cannot switch backend | Backend admission |
| A command is missing or denied | Command permission |
| A permission node is missing on a backend | Synchronization |
| Bedrock player is treated as Java or cannot join | Floodgate |

## Native whitelist is enabled

On standalone, set:

```properties
white-list=false
```

Restart. monban does not change the setting automatically.

## “Access verification is not ready”

The startup guard is still active because initialization did not complete. Read the earlier startup error, fix it, and restart. monban denies access instead of opening the server before verification is ready.

## Velocity config has hybrid on standalone

Remove the entire `identity.hybrid` block from a `STANDALONE` configuration. It is rejected even when `enabled: false`.

## Hybrid fails with online-mode enabled

Hybrid v1 requires Velocity's global `online-mode=false` and `identity.mode: AUTO`. Either change those settings or disable hybrid.

## Unknown backend or server-group error

Every name in `server-groups.yml`, `backend-access.yml`, and persistent `SERVER` grants must resolve to a real Velocity backend. Check spelling, case, and whitespace. Correct the file and restart.

## Whitelisted player is denied a backend

A `NETWORK` grant passes network admission only. If the target is `GRANT_REQUIRED`, also grant a matching `SERVER` or `SERVER_GROUP` entry.

## Restricted backend is still restricted with the whitelist off

This is expected. Backend admission is independent. Open the policy or grant the required scope.

## Floodgate provider is unavailable

Check that:

- Floodgate and Geyser are installed on Velocity;
- `identity.floodgate.enabled` is `true`;
- Floodgate's plugin ID is `floodgate` and it loaded before monban;
- `require-provider: true` is not enabled on a proxy without Floodgate.

If startup reports a required provider error, install or repair Floodgate. Once a provider has been discovered, a login-time provider failure denies the connection rather than downgrading it to a Java identity.

If `require-provider` is `false` and the API was never discovered, monban continues with Java identity resolution. Set `require-provider: true` when Bedrock access is required.

## Bedrock player does not match the access record

Compare the exact Floodgate Java username, including its prefix and space replacement for unlinked accounts. `.BedrockName` and `BedrockName` are different keys. A name change requires a new record. A linked account can resolve to the linked Java name instead of the raw Bedrock name.

## Floodgate settings fail on Paper

Remove `identity.floodgate` from the backend. Only the Velocity build accepts it. A backend behind Geyser uses Velocity's admission decision; synchronized permissions apply only to Java identities the backend can resolve.

## Floodgate player has no permission on a backend

This is expected for Floodgate-scoped groups and direct permissions in 3.3.0. The backend does not create a `FLOODGATE` identity, so it cannot match those records. Use a Velocity-side permission check, or manage that backend feature with a Bedrock-aware permissions plugin.

## Backend never receives state

Verify:

- `backend-permissions.enabled: true` on Velocity and the backend;
- `server-name` exactly matches Velocity;
- `sync.yml` is copied and identical;
- the secret decodes to 16–128 bytes;
- the backend uses Velocity forwarding;
- the backend has a valid `sync.yml` and starts without a synchronization error.

Do not copy `state-revision`. Do not expect a local whitelist fallback while synchronization is unavailable. monban does not log every accepted backend snapshot, so verify the result with an actual permission check after reconnecting.

## Permission exists in lookup but not in the backend plugin

Check the scope. A `SERVER_GROUP` node requires the backend's local `server-groups.yml` mapping to match Velocity. Then reconnect so Velocity sends a fresh snapshot and confirm the node string exactly matches the plugin's expected permission. There is no periodic refresh loop.

## Command is denied

Grant the specific command permission, for example `monban.command.whitelist` or `monban.command.group`. There is no single `monban.command.*` gate.
