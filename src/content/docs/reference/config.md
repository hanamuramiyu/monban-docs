---
title: config.yml
description: Reference for monban deployment, whitelist, identity, and Velocity hybrid settings.
---

`config.yml` is strict. Unknown fields, invalid enum values, wrong structure/types, duplicate YAML keys, YAML aliases, multiple YAML documents, and unsupported config versions are rejected.

## Standalone shape

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: false

identity:
  mode: AUTO
```

| Field | Type | Accepted values | Meaning |
| --- | --- | --- | --- |
| `config-version` | integer | `1` | Configuration schema version |
| `deployment.mode` | enum | `STANDALONE` | Local server owns admission |
| `whitelist.enabled` | boolean | `true`, `false` | Require a `NETWORK` grant |
| `identity.mode` | enum | `AUTO`, `OFFLINE` | Identity resolution policy |

:::caution[No hybrid block on standalone]
`identity.hybrid` is forbidden in `STANDALONE` configuration even when `identity.hybrid.enabled` would be `false`. Remove the entire block.
:::

## Velocity shape

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
```

| Field | Type | Accepted values | Meaning |
| --- | --- | --- | --- |
| `config-version` | integer | `1` | Configuration schema version |
| `deployment.mode` | enum | `VELOCITY` | Velocity owns network admission |
| `whitelist.enabled` | boolean | `true`, `false` | Require a global `NETWORK` grant |
| `identity.mode` | enum | `AUTO`, `OFFLINE` | Identity resolution policy |
| `identity.hybrid.enabled` | boolean | `true`, `false` | Enable per-connection auth-flow selection |
| `identity.hybrid.dual-entry-preference` | enum | `ONLINE`, `OFFLINE` | Flow preference when both entry types match |

The `identity.hybrid` mapping is required in a Velocity config even when hybrid is disabled.

When hybrid is enabled, `identity.mode` must be `AUTO`, and the current Velocity global `online-mode` must be `false`.

See [Hybrid Authentication](/velocity/hybrid-authentication/) for the supported topology.
