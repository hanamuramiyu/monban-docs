---
title: Basic Velocity Network
description: Put one whitelist in front of several open Velocity backends.
---

This guide creates the smallest useful Velocity deployment:

```text
Velocity + monban
├── lobby
└── survival
```

All backends remain open; the proxy requires a `NETWORK` entry.

## 1. Install monban

Install `monban-velocity-3.3.0.jar` on the proxy. Backend monban builds are not required unless those backends need centralized permissions.

## 2. Configure network admission

`plugins/monban/config.yml`:

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
  floodgate:
    enabled: false
    require-provider: false

backend-permissions:
  enabled: false
```

## 3. Keep backend admission open

`backend-access.yml`:

```yaml
schema-version: 1
default: OPEN
policies: []
```

`server-groups.yml` can remain empty:

```yaml
schema-version: 1
groups: []
```

## 4. Add players

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
/monban whitelist add offline hanamuramiyu2
```

## 5. Verify

```text
/monban status
/monban lookup hanamuramiyu
```

The player should pass network admission and reach either backend without a scoped grant.

Continue with [Restrict a Backend](/guides/restrict-a-backend/) or [Centralized Permissions](/guides/centralized-permissions/).
