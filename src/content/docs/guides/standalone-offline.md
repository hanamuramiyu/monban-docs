---
title: Standalone Offline Server
description: Use explicit OFFLINE identity on an offline-mode standalone server.
---

Use this setup when the standalone server runs with `online-mode=false` and access should be name-based.

## Option A — `AUTO`

```properties
online-mode=false
white-list=false
```

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: true

identity:
  mode: AUTO
```

Because the platform is not authenticating the connection, `AUTO` resolves it as OFFLINE.

## Option B — force OFFLINE semantics

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: true

identity:
  mode: OFFLINE
```

`OFFLINE` always uses OFFLINE identity semantics regardless of a technical UUID supplied by the platform.

## Add a player

```text
/monban whitelist add offline hanamuramiyu2
```

The normalized username is the durable identity key. A technical UUID does not prove Minecraft account ownership and does not turn the entry into ONLINE identity.

:::caution[Offline-mode identity is name-based]
Anyone who can successfully present the same username to an offline-mode server presents the same OFFLINE identity to monban. monban's current whitelist is access control; it does not add a registration/login system.
:::
