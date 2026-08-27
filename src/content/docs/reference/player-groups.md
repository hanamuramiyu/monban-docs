---
title: player-groups.yml
description: Reference for persistent monban player group definitions.
---

`player-groups.yml` is managed by Velocity group commands. It uses schema version `1` and stores player groups separately from Velocity `SERVER_GROUP` definitions.

```yaml
schema-version: 1
groups:
  - id: moderator
    access-grants:
      - type: NETWORK
      - type: SERVER_GROUP
        id: public
      - type: SERVER
        id: staff
    permissions:
      - scope:
          type: SERVER
          id: survival
        node: coreprotect.inspect
      - scope:
          type: NETWORK
        node: someproxy.command
```

Group IDs must match `[a-z0-9][a-z0-9._-]{0,63}`. Access and permission entries must be unique within a group. Supported scope types are `NETWORK`, `SERVER_GROUP`, and `SERVER`.

The file is persistent state, not a platform configuration file. Prefer `/monban group ...` for mutations so the proxy broadcasts the updated state to backends.
