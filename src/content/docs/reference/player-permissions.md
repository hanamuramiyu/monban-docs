---
title: player-permissions.yml
description: Reference for direct player permission grants.
---

`player-permissions.yml` stores permissions granted directly to players rather than inherited from a group.

```yaml
schema-version: 1
permissions:
  - identity:
      type: ONLINE
      name: Miyu
      verified-uuid: 00000000-0000-0000-0000-000000000001
    scope:
      type: SERVER
      id: survival
    node: coreprotect.inspect
```

The scope can be `NETWORK`, `SERVER_GROUP`, or `SERVER`. Permission nodes cannot be blank or contain whitespace. Direct permissions and group permissions are combined in the effective player state.
