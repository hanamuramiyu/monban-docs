---
title: Standalone Online Server
description: Use UUID-backed ONLINE identities on an authenticated Java server.
---

Use this setup when one Bukkit, Spigot, Paper, or Folia server authenticates Java players with `online-mode=true`.

## Server settings

```properties
online-mode=true
white-list=false
```

The native whitelist must be disabled before monban can own admission.

## monban configuration

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: true

identity:
  mode: AUTO

backend-permissions:
  enabled: false
  server-name: ''
```

With `AUTO`, an authenticated login becomes `ONLINE`.

## Add the account

Resolve the profile through Mojang:

```text
/monban whitelist add online hanamuramiyu
```

Or supply the verified UUID directly:

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
```

Do not use an offline technical UUID for an intended ONLINE record.

## Verify

1. Join with the intended account.
2. Confirm a second, non-whitelisted account is denied.
3. Run `/monban whitelist list online` and check the stored UUID.
4. Confirm `/whitelist` is blocked and `/monban whitelist` is the only administration path.

See [Player Identity](/concepts/player-identity/) for matching rules.
