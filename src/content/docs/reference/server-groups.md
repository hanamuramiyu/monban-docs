---
title: server-groups.yml
description: Velocity backend topology used by scoped access and policies.
---

`server-groups.yml` maps each Velocity backend to at most one named server group.

```yaml
schema-version: 1
groups:
  - id: testing
    servers:
      - test-lobby
      - test-survival
```

Missing file:

```yaml
schema-version: 1
groups: []
```

## Fields

| Field | Type | Rule |
| --- | --- | --- |
| `schema-version` | integer | Must be `1` |
| `groups[].id` | string | `[a-z0-9][a-z0-9._-]{0,63}` |
| `groups[].servers` | string list | Non-blank, unpadded backend names |

## Validation

- Unknown fields, aliases, duplicate YAML keys, and unsupported versions are rejected.
- Group IDs and backend membership must be unique.
- A backend may appear in only one group.
- Velocity must resolve every backend name at startup.

Persistent `SERVER` scopes and backend policies use the canonical names resolved by Velocity. A typo fails startup rather than creating an empty group.

See [Server Groups](/velocity/server-groups/).
