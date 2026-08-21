---
title: Whitelist
description: Manage the global monban whitelist on every supported platform.
---

`/monban whitelist` is the normal operator-facing interface for `NETWORK` whitelist state on Bukkit/Spigot, Paper/Folia, and Velocity.

## Permission

```text
monban.command.whitelist
```

## Enable and disable

```text
/monban whitelist enable
/monban whitelist disable
```

These commands change `whitelist.enabled` at runtime on Bukkit/Spigot, Paper/Folia, and Velocity. The updated configuration is saved before the runtime policy changes. If saving fails, the current runtime policy remains unchanged.

## Add

```text
/monban whitelist add offline <name>
/monban whitelist add online <name>
/monban whitelist add online <name> <uuid>
```

The short ONLINE form resolves the official Mojang profile by name. The UUID form bypasses profile lookup and uses the supplied verified UUID. OFFLINE entries use the player name as the durable identity key.

## Remove

```text
/monban whitelist remove offline <name>
/monban whitelist remove online <name>
/monban whitelist remove online <name> <uuid>
```

## List

```text
/monban whitelist list
/monban whitelist list <page>
/monban whitelist list offline [page]
/monban whitelist list online [page]
```

Listings use a fixed page size of **10** entries.

- ONLINE entries display the verified UUID.
- OFFLINE entries display the player name and do not present a technical UUID as identity proof.
- Out-of-range pages return an explicit operator-facing error instead of a blank page.

:::note[Velocity NETWORK state]
On Velocity, `/monban whitelist ...` and `/monban access ... network ...` manage the same `NETWORK` access state. They are not separate whitelists.
:::
