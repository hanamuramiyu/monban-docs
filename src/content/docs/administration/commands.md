---
title: Command Overview
description: Find the right monban command for each platform and task.
---

Every command starts with `/monban`. The root is not a single permission boundary: each subtree checks its own permission.

## Platform availability

| Task | Standalone | Velocity | Permission |
| --- | :---: | :---: | --- |
| Whitelist administration | ✓ | ✓ | `monban.command.whitelist` |
| Scoped access | — | ✓ | `monban.command.access` |
| Player groups and assignments | — | ✓ | `monban.command.group` |
| Effective player lookup | — | ✓ | `monban.command.lookup` |
| Runtime summary | — | ✓ | `monban.command.status` |

## Typical workflow

```text
/monban whitelist add online hanamuramiyu <uuid>
/monban whitelist enable
/monban group create moderator
/monban group moderator permission add server survival coreprotect.inspect
/monban user Miyu group add moderator
/monban lookup Miyu
/monban status
```

## Identity selectors

All access-oriented commands use explicit identity types:

```text
offline <name>
online <name> <uuid>
floodgate <name>
floodgate <name> <xuid>
```

`online <name>` resolves the UUID through Mojang and is accepted by whitelist and access commands. `floodgate` is available only on Velocity.

## Command families

- [Whitelist](/administration/whitelist/) for `NETWORK` admission.
- [Scoped Access](/velocity/scoped-access/) for backend and server-group grants.
- [Player Groups & Permissions](/concepts/player-groups/) for bundles and assignments.
- [Lookup](/administration/lookup/) for effective state.
- [Status](/administration/status/) for the current Velocity summary.

The exact grammar and administration nodes are collected in [Commands & Permissions](/reference/commands/).
