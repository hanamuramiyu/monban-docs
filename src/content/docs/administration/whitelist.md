---
title: Whitelist
description: Manage the global NETWORK whitelist on standalone servers and Velocity.
---

`/monban whitelist` is the main interface for global network admission. The same command family exists on Bukkit, Spigot, Paper, Folia, and Velocity.

Permission: `monban.command.whitelist`.

## Enable or disable admission

```text
/monban whitelist enable
/monban whitelist disable
```

The command persists `whitelist.enabled` before changing the runtime policy. If the save fails, the runtime policy remains unchanged.

Disabling the whitelist affects only the `NETWORK` requirement. Velocity backend policies remain active.

## Add entries

```text
/monban whitelist add offline <name>
/monban whitelist add online <name>
/monban whitelist add online <name> <uuid>
```

On Velocity, Floodgate entries use the same command family:

```text
/monban whitelist add floodgate <name>
/monban whitelist add floodgate <name> <xuid>
```

| Form | Identity behavior |
| --- | --- |
| `offline <name>` | Name-based `OFFLINE` entry |
| `online <name>` | Resolves the verified UUID through Mojang |
| `online <name> <uuid>` | Uses the supplied UUID without profile lookup |
| `floodgate <name>` | Name-based `FLOODGATE` entry |
| `floodgate <name> <xuid>` | Same name key, with XUID metadata |

Floodgate names must match the normalized Java username reported by Floodgate, including its configured prefix for unlinked accounts, such as `.BedrockName`.

## Remove entries

```text
/monban whitelist remove offline <name>
/monban whitelist remove online <name>
/monban whitelist remove online <name> <uuid>
/monban whitelist remove floodgate <name>
/monban whitelist remove floodgate <name> <xuid>
```

Removal must identify the same identity type and key. A `FLOODGATE` name does not remove an `OFFLINE` record with the same text.

## List entries

```text
/monban whitelist list [page]
/monban whitelist list offline [page]
/monban whitelist list online [page]
```

On Velocity, the listing can also be filtered by Floodgate:

```text
/monban whitelist list floodgate [page]
```

Listings show ten entries per page and reject out-of-range pages. Online records display their verified UUID; Floodgate records display the name key.

## Related behavior

On Velocity, `/monban access ... network ...` writes the same `NETWORK` state. The whitelist commands are the shorter interface for that scope.

Read [Player Identity](/concepts/player-identity/) before choosing `ONLINE`, `OFFLINE`, or `FLOODGATE`.
