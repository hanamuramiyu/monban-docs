---
title: backend-access.yml
description: Velocity backend admission policy storage.
---

`backend-access.yml` defines the default backend mode and optional group or server overrides.

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

Missing file:

```yaml
schema-version: 1
default: OPEN
policies: []
```

| Field | Values | Meaning |
| --- | --- | --- |
| `default` | `OPEN`, `GRANT_REQUIRED` | Fallback mode |
| `policies[].scope.type` | `SERVER_GROUP`, `SERVER` | Override target |
| `policies[].scope.id` | Group ID or canonical backend name | Override key |
| `policies[].mode` | `OPEN`, `GRANT_REQUIRED` | Effective mode |

`NETWORK` is invalid here. Backend admission is separate from network admission.

Duplicate policies, unknown fields, aliases, invalid modes, unknown groups, and unknown backends are rejected. Precedence is `SERVER` → `SERVER_GROUP` → `default`.

See [Backend Policies](/velocity/backend-policies/).
