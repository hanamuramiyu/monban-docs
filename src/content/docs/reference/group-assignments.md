---
title: group-assignments.yml
description: Reference for persistent player-to-group assignments.
---

`group-assignments.yml` maps explicit monban identities to player group IDs.

```yaml
schema-version: 1
assignments:
  - identity:
      type: ONLINE
      name: Miyu
      verified-uuid: 00000000-0000-0000-0000-000000000001
    group: moderator
  - identity:
      type: OFFLINE
      name: Builder
    group: default
```

The `group` value must refer to an existing player group. ONLINE identities require `verified-uuid`; OFFLINE identities may optionally contain `technical-uuid`. Assignments are normally created through `/monban user <player> group add <group-id>`.
