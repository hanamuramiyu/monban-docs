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

The `/monban` root is not one global permission boundary. Each command subtree owns its independent permission check.
