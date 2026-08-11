---
title: Hybrid Authentication
description: Configure Velocity to select ONLINE or OFFLINE authentication flow per connection.
---

**Hybrid authentication chooses which Velocity authentication flow a connection uses. It does not itself authenticate the player.**

Velocity remains the authentication authority for the selected flow. monban only uses pre-login access state to select the flow, then resolves the actual ONLINE/OFFLINE identity from the authentication facts available later in the login pipeline.

## Supported configuration

Hybrid v1 requires all of the following:

```text
deployment.mode = VELOCITY
identity.mode = AUTO
identity.hybrid.enabled = true
Velocity global online-mode = false
```

Example:

```yaml
config-version: 1

deployment:
  mode: VELOCITY

whitelist:
  enabled: true

identity:
  mode: AUTO
  hybrid:
    enabled: true
    dual-entry-preference: ONLINE
```

The following combinations are rejected rather than silently downgraded:

```text
STANDALONE + any identity.hybrid block
hybrid enabled + identity.mode=OFFLINE
hybrid enabled + Velocity global online-mode=true
```

## Tested Paper topology

The current hybrid flow has been runtime-validated on this Paper topology:

<div class="flow-diagram">
  <div class="flow-node"><strong>Velocity</strong><span>online-mode=false</span></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node"><strong>Modern Forwarding</strong><span>trusted proxy → backend forwarding</span></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node"><strong>Paper backend</strong><span>online-mode=false<br />proxies.velocity.enabled=true<br />proxies.velocity.online-mode=false</span></div>
</div>

:::note[Scope of runtime validation]
This topology has been validated with Paper. Do not infer Folia-specific hybrid runtime compatibility from that Paper validation alone.
:::

## How flow selection works

### ONLINE-only matching grant

When the available routing information matches an ONLINE-only grant, monban asks Velocity to use the ONLINE authentication flow.

A cracked client cannot satisfy that ONLINE-only path: Mojang authentication fails before an ordinary ONLINE monban identity could be established.

### OFFLINE-only matching grant

When the connection matches an OFFLINE-only entry, monban selects the OFFLINE flow. A licensed client can intentionally travel through this path and remains an **OFFLINE monban identity** for that connection.

### Both ONLINE and OFFLINE entries

If both identity forms are available for the same presented name/routing context, `dual-entry-preference` selects the preferred flow:

```yaml
dual-entry-preference: ONLINE
```

or:

```yaml
dual-entry-preference: OFFLINE
```

## Routing hints are not identity proof

A UUID visible during pre-login may be useful as a routing hint when it matches existing ONLINE access state. That does not make it verified identity proof.

The actual ONLINE identity is established only after Velocity authentication provides the facts required by the normal identity resolver.

:::caution[Do not treat selection as authentication]
An ONLINE selection means “attempt the ONLINE authentication flow.” It does not mean “this player is already authenticated.”
:::

For an end-to-end configuration, see [Hybrid Premium + Offline Network](/guides/hybrid-network/).
