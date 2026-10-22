---
title: access-grants.yml
description: Persistent Velocity SERVER_GROUP and SERVER grants.
---

`access-grants.yml` stores scoped grants only. `NETWORK` entries belong in `whitelist.yml`.

```yaml
schema-version: 1
grants:
  - scope:
      type: SERVER_GROUP
      id: testing
    identity:
      type: OFFLINE
      name: Builder
  - scope:
      type: SERVER
      id: survival
    identity:
      type: FLOODGATE
      name: .BedrockName
      xuid: '2535421234567890'
```

| Field | Values |
| --- | --- |
| `scope.type` | `SERVER_GROUP`, `SERVER` |
| `scope.id` | Server-group ID or canonical Velocity backend name |
| `identity` | `ONLINE`, `OFFLINE`, or `FLOODGATE` object |

The file rejects `NETWORK` scopes, malformed identities, unknown fields, aliases, duplicate equivalent grants, and unsupported schema versions.

Persistent scopes are validated against the resolved Velocity topology at startup. A missing file means no scoped grants.

Use [Scoped Access](/velocity/scoped-access/) for normal administration.
