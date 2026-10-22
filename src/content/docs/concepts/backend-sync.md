---
title: Backend Synchronization
description: How Velocity sends access state and permissions to participating Bukkit and Paper backends.
---

Velocity is the authority for network access and centralized player state. A backend plugin runs on a different JVM, so Velocity cannot directly attach a permission to its player. Synchronization bridges that boundary.

## Required topology

```text
Velocity
└── monban (authority)
    ├── lobby
    │   └── Paper + monban
    └── survival
        └── Paper + monban + CoreProtect
```

Install monban on each backend that must receive synchronized state. A backend without monban can still be protected by Velocity admission, but it cannot attach monban permissions locally.

## Enabling it

On Velocity:

```yaml
backend-permissions:
  enabled: true
```

On the backend:

```yaml
backend-permissions:
  enabled: true
  server-name: survival
```

`server-name` must exactly match the registered Velocity server name. Velocity creates `sync.yml` automatically. Copy that file to every participating backend; do not copy `state-revision`.

## What is sent

Velocity publishes a signed full snapshot containing the centralized access and permission state needed by the backend. The backend accepts only a valid signature and ignores older revisions.

On acceptance, monban refreshes permission attachments for online players. New logins use the latest accepted state.

## Backend identity boundary

Backends resolve Java `ONLINE` and `OFFLINE` identities; they do not call Floodgate or create a `FLOODGATE` identity. Synchronized access and permission entries are matched against the identity the backend can establish.

Floodgate records still govern Velocity network admission, backend admission, and proxy permissions. A Floodgate group assignment or direct permission is not applied as a `FLOODGATE` permission attachment on a Bukkit or Paper backend in 3.3.0.

## Fail-closed behavior

A configured backend exposes no synchronized monban permissions until it receives a valid snapshot. An absent or malformed secret prevents backend startup; a syntactically valid but mismatched secret causes snapshots to be rejected. monban does not fall back to local whitelist state. Backend admission itself remains a Velocity decision, so the absence of a snapshot does not create a second login gate.

Use the same `server-groups.yml` mapping on Velocity and on a backend that evaluates `SERVER_GROUP` permissions. Velocity rejects unknown backend references at startup; keep the backend copy consistent so both sides resolve the same group.

## Operating rules

- Keep `sync.yml` private and identical on both sides.
- Administer whitelist, groups, and permissions on Velocity.
- Use proxy-side permission checks for Floodgate players that need access to a permission-controlled feature.
- Do not create a second local whitelist on a centralized backend.
- Treat `state-revision` as Velocity-owned state.

Continue with [Backend Permissions](/velocity/backend-permissions/) for the feature overview or [Centralized Permissions](/guides/centralized-permissions/) for a worked setup.
