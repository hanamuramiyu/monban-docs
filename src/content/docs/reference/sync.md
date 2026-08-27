---
title: sync.yml
description: Configure the shared secret used for Velocity to backend state synchronization.
---

`sync.yml` enables signed state synchronization between the Velocity monban instance and a Bukkit or Paper backend. It is generated automatically on Velocity when `backend-permissions.enabled: true`.

```yaml
schema-version: 1
secret: <base64-secret-at-least-16-bytes>
```

Use the exact same Base64 value on Velocity and every backend that should receive the state. Secrets must decode to 16–128 bytes. The channel uses HMAC-SHA256 signatures; invalid signatures and stale revisions are rejected.

If `sync.yml` is absent, synchronization is disabled. On a configured backend, do not start with an empty or different secret: the backend will not accept the proxy state and synchronized access checks remain fail-closed until a valid snapshot arrives.

Keep this file private. Do not commit real sync secrets to source control.
