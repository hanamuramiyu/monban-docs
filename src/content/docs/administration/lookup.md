---
title: Lookup
description: Inspect a player's ONLINE and OFFLINE identities and global whitelist status on Velocity.
---

`/monban lookup` is available on **Velocity only**.

## Permission

```text
monban.command.lookup
```

## Command

```text
/monban lookup <player>
```

The lookup displays:

- the player's ONLINE identity when the official Mojang profile can be resolved;
- the player's OFFLINE identity based on the normalized name;
- whether the ONLINE or OFFLINE identity is present in the global `NETWORK` whitelist.

If the Mojang profile service is unavailable, monban reports the problem and continues with the OFFLINE identity only. A missing Mojang profile is not an error; the result contains the OFFLINE identity and its whitelist status.
