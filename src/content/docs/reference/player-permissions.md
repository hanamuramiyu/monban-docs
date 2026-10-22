---
title: player-permissions.yml
description: Persistent direct player permission grants.
---

`player-permissions.yml` stores permission nodes granted directly to an identity.

```yaml
schema-version: 1
permissions:
  - identity:
      type: FLOODGATE
      name: .BedrockName
    scope:
      type: SERVER
      id: survival
    node: coreprotect.inspect
```

Supported scopes are `NETWORK`, `SERVER_GROUP`, and `SERVER`. Nodes must be non-blank and contain no whitespace.

Direct nodes are combined with nodes inherited from player groups. Prefer `/monban user ... permission` for administration.
