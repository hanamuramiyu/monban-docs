---
title: access-grants.yml
description: Persistent SERVER_GROUP and SERVER positive grant storage.
---

`access-grants.yml` stores Velocity scoped grants that are **not** part of the global `NETWORK` whitelist.

:::caution[NETWORK does not belong here]
`NETWORK` entries are stored in `whitelist.yml`. A `NETWORK` scope inside `access-grants.yml` is invalid.
:::

## Schema

```yaml
schema-version: 1
grants:
  - scope:
      type: SERVER_GROUP
      id: testing
    identity:
      type: OFFLINE
      name: hanamuramiyu2
  - scope:
      type: SERVER
      id: dev
    identity:
      type: ONLINE
      name: hanamuramiyu
      verified-uuid: 00000000-0000-0000-0000-000000000000
```

## Scope fields

| Field | Accepted values | Required |
| --- | --- | :---: |
| `scope.type` | `SERVER_GROUP`, `SERVER` | ✓ |
| `scope.id` | Group ID or canonical backend name | ✓ |

Identity objects use the same ONLINE/OFFLINE semantics as `whitelist.yml`.

## Behavior

- Grants are positive-only.
- Malformed YAML, unknown fields, invalid identities, unsupported schema versions, duplicate YAML keys/aliases, and duplicate equivalent grants are rejected.
- Persistent `SERVER_GROUP` scopes must reference an existing resolved group.
- Persistent `SERVER` scopes must use an existing backend's canonical Velocity name.
- A missing file means an empty scoped repository. It does not need to be created until the first persistent mutation.

Prefer `/monban access` for normal administration.
