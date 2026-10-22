---
title: Lookup
description: Inspect effective groups, access, and permissions for a Java identity on Velocity.
---

`/monban lookup` is available on Velocity and requires `monban.command.lookup`.

```text
/monban lookup <player>
```

The command builds an effective view for the player name:

- the `ONLINE` identity when Mojang resolves the name;
- the `OFFLINE` identity derived from the same name;
- `NETWORK` whitelist status for those Java identities;
- assigned player groups;
- effective access scopes and their origins;
- effective permission nodes and their origins.

Duplicate entries are combined, while direct and group origins remain visible.

## Profile lookup behavior

A missing Mojang profile is not an error: monban continues with the `OFFLINE` identity. If the profile service is temporarily unavailable, the output warns that it is showing the OFFLINE identity only.

## Floodgate is not inferred from a name

The lookup command accepts a Java player name, not an identity type. It does not discover an arbitrary `FLOODGATE` record by asking Floodgate or guessing the Bedrock name.

To inspect stored Bedrock access, use the relevant list command, for example:

```text
/monban whitelist list floodgate
```

Then verify live admission by reconnecting through Geyser. Use [Status](/administration/status/) for configuration and topology counts, not for per-player state.
