---
title: Standalone Online Server
description: Use monban on an online-mode standalone Bukkit, Spigot, Paper, or Folia server.
---

Use this setup when the standalone Minecraft server authenticates players normally with `online-mode=true`.

## 1. Server settings

```properties
online-mode=true
white-list=false
```

`white-list=false` gives whitelist ownership to monban.

## 2. monban config

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: true

identity:
  mode: AUTO
```

With `AUTO`, the standalone login path uses the server's authenticated online-mode fact, so authenticated players resolve as ONLINE identity.

## 3. Add an ONLINE player

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
```

Do not replace the UUID with an offline technical UUID. The entry is intended to match independently authenticated ONLINE identity.

## 4. Verify

Reconnect with the allowed account and confirm that a non-whitelisted ONLINE identity is denied.

See [Player Identity](/concepts/player-identity/) for why ONLINE identity is UUID-anchored.
