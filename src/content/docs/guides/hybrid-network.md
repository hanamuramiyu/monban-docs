---
title: Hybrid Premium + Offline Network
description: Configure the supported Velocity hybrid topology for ONLINE and OFFLINE players.
---

This guide uses the runtime-validated Paper topology for hybrid v1.

## 1. Velocity

Set Velocity's global authentication mode to:

```text
online-mode=false
```

Use **Velocity Modern Forwarding** for the backend connection path.

## 2. Paper backend

Configure the backend for the same proxy mode:

```text
Paper online-mode=false
proxies.velocity.enabled=true
proxies.velocity.online-mode=false
```

The Paper backend receives the resulting forwarded identity. It does not select the ONLINE/OFFLINE flow itself.

## 3. monban Velocity config

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

## 4. Add the premium player as ONLINE

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
```

An ONLINE-only match selects Velocity's ONLINE authentication path. A client that cannot complete that authentication cannot become the allowed ONLINE identity.

## 5. Add the offline player as OFFLINE

```text
/monban whitelist add offline hanamuramiyu2
```

An OFFLINE-only match selects the OFFLINE flow and remains an OFFLINE monban identity.

## 6. Understand dual entries

If the same presented player context can match both ONLINE and OFFLINE entries, `dual-entry-preference` decides which flow is selected.

```yaml
dual-entry-preference: ONLINE
```

Use `OFFLINE` only when you intentionally prefer the OFFLINE flow for dual-entry cases.

:::caution[Flow selection is not proof]
Pre-login routing data can choose a flow, but actual ONLINE identity is established only after Velocity authentication provides the required provenance.
:::

Read [Hybrid Authentication](/velocity/hybrid-authentication/) for the security model and supported combinations.
