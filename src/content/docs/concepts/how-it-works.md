---
title: How monban Works
description: The four decisions monban makes and where each one happens.
---

monban separates access control into four decisions. Keeping them separate makes a network easier to reason about: a player can enter the proxy and still be denied a restricted backend, and a permission can exist without granting access to any server.

| Decision | Question | Where it happens |
| --- | --- | --- |
| Identity | Who is connecting? | Login path on the platform |
| Network admission | May this player enter the server or proxy? | Standalone server or Velocity login |
| Backend admission | May this player connect to this backend? | Velocity backend switch |
| Permission | May this player use this plugin command or feature? | Proxy or backend permission provider |

## 1. Establish identity

The platform supplies authentication facts. monban turns them into an explicit identity:

- an authenticated Java UUID becomes `ONLINE`;
- a name-based Java connection becomes `OFFLINE`;
- a connection recognized by Floodgate on Velocity becomes `FLOODGATE`.

The identity type is part of the key. An `OFFLINE` entry named `Alex` does not authorize an `ONLINE` identity with the same display name.

Read [Player Identity](/concepts/player-identity/) for the exact matching rules.

## 2. Check network admission

When `whitelist.enabled: true`, monban requires a matching `NETWORK` grant. That grant may be direct or inherited from a player group.

When the whitelist is disabled, this first check is skipped. It does not disable anything else.

## 3. Check backend admission on Velocity

Each backend has an effective policy:

- `OPEN`: the backend adds no scoped-access requirement;
- `GRANT_REQUIRED`: the player needs a matching `SERVER` or `SERVER_GROUP` grant.

Policy precedence is `SERVER` → `SERVER_GROUP` → `default`. A backend can therefore be public by default while a named test group is restricted.

Read [Backend Policies](/velocity/backend-policies/) and [Server Groups](/velocity/server-groups/).

## 4. Resolve permissions

monban combines ordinary permission nodes from direct grants and player groups. At proxy scope it evaluates `NETWORK` and, when the player is connected to a backend, that backend's `SERVER` and `SERVER_GROUP` scopes.

On a synchronized backend, the same state is applied through a local permission attachment. LuckPerms is not required for monban's own nodes.

## What monban is not

monban is not a registration or password system, and the `OFFLINE` identity does not prove account ownership. It also does not create deny grants, temporary grants, wildcard permissions, or player-group inheritance in the current release.

## Where to continue

- [Access Model](/concepts/access-model/) explains how grants combine.
- [Security Model](/concepts/security-model/) explains trust boundaries and fail-closed behavior.
- [Player Groups & Permissions](/concepts/player-groups/) explains direct and group entries.
- [Backend Synchronization](/concepts/backend-sync/) explains what reaches a backend.
- [Hybrid Authentication](/velocity/hybrid-authentication/) explains Velocity's optional flow selection.
