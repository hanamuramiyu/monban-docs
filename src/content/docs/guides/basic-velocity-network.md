---
title: Basic Velocity Network
description: Configure a simple Velocity network with a global whitelist and open backends.
---

This guide starts with two open backends:

```text
Velocity
├── lobby
└── survival
```

## 1. Configure monban

```yaml
config-version: 1

deployment:
  mode: VELOCITY

whitelist:
  enabled: true

identity:
  mode: AUTO
  hybrid:
    enabled: false
    dual-entry-preference: ONLINE
```

## 2. Keep backend admission open

`backend-access.yml`:

```yaml
schema-version: 1
default: OPEN
policies: []
```

No server groups are required for this topology:

```yaml
schema-version: 1
groups: []
```

## 3. Add network access

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
```

or, for an intended OFFLINE identity:

```text
/monban whitelist add offline hanamuramiyu2
```

With the global whitelist enabled and backend default `OPEN`, the player must first pass the `NETWORK` whitelist and then can connect to either open backend without an additional scoped grant.
