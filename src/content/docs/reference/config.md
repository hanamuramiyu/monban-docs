---
title: config.yml
description: Complete configuration reference for monban 3.3.0.
---

`config.yml` controls deployment, the whitelist toggle, identity resolution, and backend synchronization.

The parser is strict. It rejects unknown fields, wrong types, invalid enum values, duplicate YAML keys, aliases, multiple YAML documents, and unsupported schema versions.

## Generated standalone configuration

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: false

identity:
  mode: AUTO

backend-permissions:
  enabled: false
  server-name: ''
```

| Field | Values | Meaning |
| --- | --- | --- |
| `deployment.mode` | `STANDALONE` | This server owns local admission |
| `whitelist.enabled` | `true`, `false` | Require a `NETWORK` entry |
| `identity.mode` | `AUTO`, `OFFLINE` | Java identity policy |
| `backend-permissions.enabled` | `true`, `false` | Receive state from Velocity |
| `backend-permissions.server-name` | Non-blank when enabled; may be empty when disabled | Exact Velocity server name |

`identity.hybrid` and `identity.floodgate` are rejected in a standalone file. A Paper or Bukkit server can still be a backend by enabling `backend-permissions`.

## Generated Velocity configuration

```yaml
config-version: 1

deployment:
  mode: VELOCITY

whitelist:
  enabled: false

identity:
  mode: AUTO
  hybrid:
    enabled: false
    dual-entry-preference: ONLINE
  floodgate:
    enabled: false
    require-provider: false

backend-permissions:
  enabled: false
```

| Field | Values | Meaning |
| --- | --- | --- |
| `deployment.mode` | `VELOCITY` | Velocity owns network admission |
| `whitelist.enabled` | `true`, `false` | Require a global `NETWORK` entry |
| `identity.mode` | `AUTO`, `OFFLINE` | Java identity policy |
| `identity.hybrid.enabled` | `true`, `false` | Enable auth-flow selection |
| `identity.hybrid.dual-entry-preference` | `ONLINE`, `OFFLINE` | Preference when both Java forms match |
| `identity.floodgate.enabled` | `true`, `false` | Resolve Bedrock identities through Floodgate |
| `identity.floodgate.require-provider` | `true`, `false` | Fail startup when the provider is absent |
| `backend-permissions.enabled` | `true`, `false` | Publish synchronized state |

The complete `identity.hybrid` mapping is required on Velocity even when disabled. New and upgraded configurations also contain an explicit `identity.floodgate` mapping. If you add the Floodgate mapping manually, set `enabled` explicitly: an empty `floodgate` mapping is interpreted as enabled.

## Validation rules

- `identity.hybrid` is allowed only with `deployment.mode: VELOCITY`.
- Enabling hybrid requires `identity.mode: AUTO`.
- Enabling hybrid requires Velocity's global `online-mode=false`.
- `identity.floodgate` is allowed only on Velocity.
- `require-provider` has no effect while Floodgate integration is disabled. With `enabled: true`, `require-provider: true` makes a missing Floodgate API stop startup; without it, monban starts with Java resolution active.
- With `enabled: true` and `require-provider: false`, an undiscoverable Floodgate API leaves Java resolution active; runtime provider failures still deny the connection.
- A backend's `server-name` must match the exact Velocity registered-server name.

## Migration behavior

When a Velocity config omits `identity.floodgate`, monban writes the explicit defaults. When `backend-permissions` is absent, it adds that section. Review the rewritten file after upgrading and back it up first.

For related files, see [Backend Synchronization](/concepts/backend-sync/) and the [sync.yml reference](/reference/sync/).
