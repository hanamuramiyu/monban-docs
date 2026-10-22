---
title: Hybrid Authentication
description: Let Velocity choose an ONLINE or OFFLINE authentication flow per connection.
---

Hybrid authentication selects **which Velocity authentication flow** a connection should attempt. It does not authenticate the player and does not create a monban identity by itself.

After Velocity completes the selected flow, monban resolves the resulting identity using the normal `ONLINE` or `OFFLINE` rules. Floodgate is a separate identity path.

## Required configuration

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
  floodgate:
    enabled: false
    require-provider: false
```

The following combinations are rejected:

```text
STANDALONE + identity.hybrid
hybrid enabled + identity.mode=OFFLINE
hybrid enabled + Velocity online-mode=true
```

## Tested backend topology

The current hybrid flow is validated with Paper and Velocity Modern Forwarding:

<div class="flow-diagram">
  <div class="flow-node"><strong>Velocity</strong><span>online-mode=false</span></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node"><strong>Modern Forwarding</strong><span>trusted proxy to backend</span></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-node"><strong>Paper backend</strong><span>online-mode=false<br />Velocity forwarding enabled</span></div>
</div>

Do not infer Folia-specific hybrid compatibility from Paper validation alone.

## Flow selection

### ONLINE-only access

If pre-login routing state matches an `ONLINE` entry, monban selects Velocity's `ONLINE` flow. A client that cannot complete Mojang authentication cannot become that identity.

### OFFLINE-only access

If the connection matches an `OFFLINE` entry, monban selects the `OFFLINE` flow. A licensed client can intentionally use this path and remains an `OFFLINE` monban identity for that connection.

### Both forms match

`dual-entry-preference` chooses which flow to prefer:

```yaml
dual-entry-preference: ONLINE
```

or:

```yaml
dual-entry-preference: OFFLINE
```

## Routing hints are not proof

A UUID visible before authentication can be useful for selecting a flow. It does not prove account ownership. The `ONLINE` identity is established only after Velocity supplies the authentication facts that monban requires.

An ONLINE selection means “attempt the ONLINE flow,” not “this player is already authenticated.”

For an end-to-end setup, see [Hybrid Network](/guides/hybrid-network/).
