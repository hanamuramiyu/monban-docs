---
title: backend-access.yml
description: Schema and validation reference for Velocity backend admission policies.
---

`backend-access.yml` defines the default Backend Admission mode and optional group/server overrides.

A missing file is created as:

```yaml
schema-version: 1
default: OPEN
policies: []
```

## Schema

```yaml
schema-version: 1
default: OPEN
policies:
  - scope:
      type: SERVER_GROUP
      id: testing
    mode: GRANT_REQUIRED
  - scope:
      type: SERVER
      id: lobby
    mode: OPEN
```

## Fields

| Field | Accepted values | Meaning |
| --- | --- | --- |
| `schema-version` | `1` | File schema version |
| `default` | `OPEN`, `GRANT_REQUIRED` | Fallback mode |
| `policies` | list | Explicit policy overrides |
| `policies[].scope.type` | `SERVER_GROUP`, `SERVER` | Override target type |
| `policies[].scope.id` | valid group ID or canonical backend name | Override target |
| `policies[].mode` | `OPEN`, `GRANT_REQUIRED` | Effective mode at that scope |

`NETWORK` is invalid in this file because Network Admission and Backend Admission are separate layers.

## Validation

The parser rejects malformed/unsupported structure, unknown fields, duplicate keys/aliases, unsupported modes, and duplicate policies for the same scope.

At Velocity startup, every referenced group must exist. Every server policy must reference an existing backend using its exact canonical Velocity name; persistent policy keys are not silently canonicalized.

Policy precedence is `SERVER` → `SERVER_GROUP` → `default`.

For behavior and examples, see [Backend Policies](/velocity/backend-policies/).
