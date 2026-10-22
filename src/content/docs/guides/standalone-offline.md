---
title: Standalone Offline Server
description: Use name-based OFFLINE identities on an offline-mode Java server.
---

Use this setup when one Bukkit, Spigot, Paper, or Folia server runs with `online-mode=false` and admission should be name-based.

## Server settings

```properties
online-mode=false
white-list=false
```

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

Because the platform does not authenticate the connection, `AUTO` resolves the player as `OFFLINE`. You can set `identity.mode: OFFLINE` to force that behavior even if the platform reports an authentication fact later.

## Add the name

```text
/monban whitelist add offline hanamuramiyu2
```

Names are matched case-insensitively after normalization.

## Verify

- The intended name can join.
- The same name with different capitalization still matches.
- A different name is denied while the whitelist is enabled.
- `/monban whitelist list offline` shows the stored name.

:::caution[Offline mode is not account authentication]
Anyone who can present the same name to the server presents the same `OFFLINE` identity. monban does not provide registration, passwords, or session protection.
:::
