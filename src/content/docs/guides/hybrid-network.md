---
title: Hybrid Network
description: Configure a supported Velocity topology for ONLINE and OFFLINE Java flows.
---

Hybrid authentication chooses a Velocity flow before login. It is separate from Floodgate: Floodgate handles Bedrock identity, while hybrid handles the Java `ONLINE`/`OFFLINE` choice.

## 1. Velocity

Set Velocity's global authentication mode:

```text
online-mode=false
```

Use Velocity Modern Forwarding to the backend.

## 2. Paper backend

Use a Paper backend with:

```properties
online-mode=false
```

Enable Velocity forwarding and set its backend-side online-mode setting to `false` according to the forwarding configuration you use.

## 3. monban

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

## 4. Add both identity forms

Premium Java account:

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
```

Name-based account:

```text
/monban whitelist add offline hanamuramiyu2
```

If both forms can match the same routing context, `dual-entry-preference` decides which flow is attempted.

## 5. Verify

- A valid ONLINE record selects the ONLINE flow and completes Mojang authentication.
- An OFFLINE-only record selects the OFFLINE flow.
- A cracked client cannot satisfy an ONLINE-only path.
- The backend receives the expected forwarded identity.
- monban still evaluates the final identity type, not the pre-login hint.

See [Hybrid Authentication](/velocity/hybrid-authentication/) for the security model and rejected combinations.
