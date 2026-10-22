---
title: Backend Permissions
description: Apply centralized monban permissions to Bukkit and Paper backends.
---

Velocity stores the authoritative groups and permissions, but each backend runs in a separate JVM. Install monban on a backend when local plugins should receive monban nodes there.

## Required pieces

1. Velocity with monban as the network authority.
2. A matching Bukkit or Paper monban build on each participating backend.
3. `backend-permissions.enabled: true` on both sides.
4. The exact Velocity registered-server name in the backend configuration.
5. The same `sync.yml` secret on Velocity and every backend.

## Configuration

Velocity:

```yaml
backend-permissions:
  enabled: true
```

Backend:

```yaml
backend-permissions:
  enabled: true
  server-name: survival
```

Velocity creates `sync.yml` automatically. Copy it to the backend and keep it private. Do not copy `state-revision`.

## Scope resolution

For a backend named `survival`, monban applies permission nodes from:

1. `NETWORK`;
2. `SERVER_GROUP` if `survival` belongs to a configured group;
3. `SERVER(survival)`.

The same rules apply to direct and group permissions. On the backend, monban attaches the resulting nodes through its own permission provider, so LuckPerms is not required for these grants.

Backend matching uses the Java identity resolved locally. Floodgate groups and direct permissions are evaluated by Velocity, but 3.3.0 does not create a `FLOODGATE` attachment on the backend. See [Backend Synchronization](/concepts/backend-sync/#backend-identity-boundary).

## Synchronization and failure behavior

Velocity sends a signed full snapshot and rejects stale revisions. A configured backend exposes no synchronized monban permissions until the first valid snapshot arrives. This affects permissions only; Velocity remains responsible for admission.

If the secret is missing, different, or invalid, fix the configuration and restart. Do not expect local whitelist state to act as a fallback.

Read [Backend Synchronization](/concepts/backend-sync/) for the model and [Centralized Permissions](/guides/centralized-permissions/) for a complete example.
