---
title: Restrict a Backend
description: Keep a public lobby while requiring scoped access for testing backends.
---

Target topology:

```text
Velocity
├── lobby        → OPEN
└── testing
    ├── test-lobby
    └── test-survival   → GRANT_REQUIRED
```

## 1. Create the testing group

`server-groups.yml`:

```yaml
schema-version: 1
groups:
  - id: testing
    servers:
      - test-lobby
      - test-survival
```

## 2. Restrict the group

`backend-access.yml`:

```yaml
schema-version: 1
default: OPEN
policies:
  - scope:
      type: SERVER_GROUP
      id: testing
    mode: GRANT_REQUIRED
```

The lobby inherits `OPEN`. Both testing servers inherit `GRANT_REQUIRED` from their group.

## 3. Grant testing access

```text
/monban access grant group testing online hanamuramiyu <verified-uuid>
```

or:

```text
/monban access grant group testing offline hanamuramiyu2
```

A player who passes Network Admission can enter `lobby`. Without a matching `SERVER_GROUP(testing)` grant or a direct grant for the chosen testing backend, that same player is denied the restricted target.

See [Backend Policies](/velocity/backend-policies/) for precedence and [Access Administration](/administration/access/) for full command syntax.
