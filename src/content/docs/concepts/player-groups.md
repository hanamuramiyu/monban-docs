---
title: Player Groups & Permissions
description: Combine access and permission nodes through direct entries and player groups.
---

Player groups let Velocity administrators assign a reusable bundle of access and permission nodes. They are separate from server groups, which describe backend topology.

## What a player group contains

A player group can contain:

- `NETWORK` access;
- `SERVER_GROUP` access;
- `SERVER` access;
- ordinary permission nodes at any of those scopes.

Example:

```text
moderator
├── NETWORK
├── SERVER_GROUP testing
├── SERVER survival: coreprotect.inspect
└── SERVER survival: minecraft.command.ban
```

The first two entries affect where the player may connect. The last two affect what plugins allow after connection.

## Direct and inherited state

Direct grants and group grants are combined. Removing a group does not remove direct entries, and removing a direct entry does not remove an identical grant inherited from a group.

If several groups grant the same access or node, the effective view combines it and keeps all origins.

There is no deny entry, group inheritance, permission weight, wildcard expansion, or temporary assignment in the current release.

## Scope evaluation

| Scope | Proxy | Backend |
| --- | --- | --- |
| `NETWORK` | Evaluated for proxy permissions | Included in synchronized state |
| `SERVER_GROUP` | Evaluated for the current backend's group | Included in synchronized state |
| `SERVER` | Evaluated for the current backend | Included in synchronized state |

On a backend, monban applies the resulting nodes through a normal permission attachment. Another permissions plugin can still supply additional nodes.

The backend matches those nodes against a Java `ONLINE` or `OFFLINE` identity. `FLOODGATE` assignments are evaluated on Velocity for admission and proxy permissions, but 3.3.0 does not re-match them on the backend.

## Administrative workflow

Create a group, add entries, assign it, then inspect the result:

```text
/monban group create moderator
/monban group moderator permission add server survival coreprotect.inspect
/monban user Miyu group add moderator
/monban lookup Miyu
```

The commands are Velocity-only and require `monban.command.group`. Group IDs use `[a-z0-9][a-z0-9._-]{0,63}`. Permission nodes must be non-blank and contain no whitespace.

For the full grammar, see [Commands & Permissions](/reference/commands/). For persistent file shapes, see the [data file reference](/reference/player-groups/).
