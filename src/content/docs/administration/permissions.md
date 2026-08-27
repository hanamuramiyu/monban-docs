---
title: Permissions
description: monban command permissions by supported platform.
---

| Permission | Platforms | Purpose |
| --- | --- | --- |
| `monban.command.whitelist` | Bukkit / Spigot / Paper / Folia / Velocity | global whitelist |
| `monban.command.lookup` | Velocity | player identity and whitelist lookup |
| `monban.command.access` | Velocity | scoped grants |
| `monban.command.status` | Velocity | status |
| `monban.command.group` | Velocity | player groups, group assignments, and permissions |

The `/monban` root is not one global permission boundary. Each command subtree owns its independent permission check.

## Permission sources

The built-in permission system can grant ordinary permission nodes used by Minecraft and other plugins:

- to a player group;
- directly to a player;
- at `NETWORK`, `SERVER_GROUP`, or `SERVER` scope.

Velocity evaluates `NETWORK` permissions for proxy commands and also evaluates the current backend's `SERVER_GROUP` and `SERVER` scopes. A Bukkit or Paper backend evaluates the same scopes locally through monban's permission attachment. LuckPerms is not required for these grants.

See [Player Groups & Permissions](/concepts/player-groups/) and [Backend Permissions](/velocity/backend-permissions/).
