---
title: group-assignments.yml
description: Persistent player-to-group assignments.
---

`group-assignments.yml` assigns identities to player groups.

```yaml
schema-version: 1
assignments:
  - identity:
      type: ONLINE
      name: Miyu
      verified-uuid: 00000000-0000-0000-0000-000000000001
    group: moderator
  - identity:
      type: FLOODGATE
      name: .BedrockName
      xuid: '2535421234567890'
    group: bedrock
```

The group must exist. Identities use the same field rules as `whitelist.yml`. Prefer:

```text
/monban user <player> group add <group-id>
```

Use the `offline`, `online`, or `floodgate` qualifier when the identity type must be explicit.
