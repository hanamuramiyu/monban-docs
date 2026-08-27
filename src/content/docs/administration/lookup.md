---
title: Lookup
description: Inspect a player's identity, groups, effective ACL, and permissions on Velocity.
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
- the player's assigned groups;
- effective `NETWORK`, `SERVER_GROUP`, and `SERVER` access with its source;
- effective permissions with their scope and source;
- whether the ONLINE or OFFLINE identity is present in the global `NETWORK` whitelist.

Direct entries are marked as direct grants. Entries inherited from a player group include that group ID. The output is an effective view: duplicate access or permission entries are combined while all known origins remain visible.

If the Mojang profile service is unavailable, monban reports the problem and continues with the OFFLINE identity only. A missing Mojang profile is not an error; the result contains the OFFLINE identity and its whitelist status.
