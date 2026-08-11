---
title: Troubleshooting
description: Diagnose common monban startup and access-control problems.
---

## Vanilla whitelist is enabled

**Cause:** standalone Minecraft `white-list=true` makes the native whitelist a second access authority.

**Fix:** set:

```properties
white-list=false
```

Restart the server. monban does not disable the native whitelist automatically.

## Access verification is not ready

This message comes from the startup access guard. The access plane has not completed safe initialization, so monban denies access instead of allowing a connection before verification is ready.

**Fix:** inspect the startup error earlier in the server/proxy console, correct that error, and restart.

## Hybrid on standalone

Standalone configuration does not accept a hybrid block, even with `enabled: false`.

**Fix:** remove the entire `identity.hybrid` mapping.

## Hybrid with `online-mode=true`

Hybrid v1 currently requires Velocity global `online-mode=false`.

**Fix:** use the supported hybrid topology from [Hybrid Authentication](/velocity/hybrid-authentication/), or disable hybrid selection.

## Hybrid with `identity.mode=OFFLINE`

Hybrid selection requires `identity.mode: AUTO`.

**Fix:** set:

```yaml
identity:
  mode: AUTO
  hybrid:
    enabled: true
    dual-entry-preference: ONLINE
```

## Unknown backend in `server-groups.yml`

Every server reference must resolve to a real configured Velocity backend.

**Fix:** compare the entry with the backend names in Velocity configuration, correct the spelling, and restart.

## Backend grant fails validation

Persistent server-scoped grants and backend policy scopes are validated against the resolved topology.

**Fix:** verify that the group exists and that a `SERVER` scope uses the backend's exact canonical Velocity name. Do not rely on different case or non-canonical spelling in persistent state.

## Whitelisted player denied by backend

This is expected when the backend is `GRANT_REQUIRED`. A `NETWORK` grant passes Network Admission but does not replace a required `SERVER` or `SERVER_GROUP` grant.

**Fix:** grant the required scoped access with `/monban access`.

## Restricted backend with whitelist disabled

This is expected. The toggle disables only the global `NETWORK` requirement. Velocity Backend Admission remains active.

**Fix:** either grant the required scope or change the backend policy to `OPEN` if that backend should be public.
