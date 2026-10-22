---
title: player-groups.yml
description: Persistent Velocity player group definitions.
---

`player-groups.yml` stores reusable access entries and permission nodes. It is separate from `server-groups.yml`.

```yaml
schema-version: 1
groups:
  - id: moderator
    access-grants:
      - type: NETWORK
      - type: SERVER_GROUP
        id: testing
      - type: SERVER
        id: survival
    permissions:
      - scope:
          type: SERVER
          id: survival
        node: coreprotect.inspect
      - scope:
          type: NETWORK
        node: someproxy.command
```

Group IDs use `[a-z0-9][a-z0-9._-]{0,63}`. Entries must be unique within a group. Supported scopes are `NETWORK`, `SERVER_GROUP`, and `SERVER`; non-network scopes require an `id`.

This is authoritative state, not a config file. Prefer `/monban group` so Velocity broadcasts changes to synchronized backends.
