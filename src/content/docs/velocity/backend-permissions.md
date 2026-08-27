---
title: Backend Permissions
description: Apply centralized monban permissions to Bukkit and Paper backend plugins.
---

Velocity can centrally store and distribute player groups, ACL, and permissions. It cannot directly become a Bukkit permission provider for a plugin running on another server, so monban must be installed on that backend as well.

## Required topology

```text
Velocity
└── monban
    ├── lobby
    │   └── monban + backend plugin
    ├── survival
    │   └── monban + CoreProtect
    └── staff
        └── monban + backend plugins
```

Install monban on each backend where a plugin must receive a node. The backend does not need LuckPerms for monban's own grants.

## Scopes on a backend

For a backend named `survival`, monban applies permissions from:

1. `NETWORK`;
2. the matching `SERVER_GROUP`, if the backend belongs to one;
3. `SERVER survival`.

The same rule applies to permissions inherited from player groups and permissions granted directly to a player.

## Synchronization

Velocity sends a signed full state snapshot containing:

- direct ACL grants;
- player group definitions;
- player-to-group assignments;
- direct player permissions.

The backend accepts only snapshots signed by its configured secret and ignores older revisions. Until the first valid snapshot arrives, a synchronized backend does not allow a whitelist decision based on local fallback state.

When a new snapshot arrives, online players' permission attachments are refreshed. New joins use the latest accepted snapshot.

Configure `backend-permissions` in `config.yml` on the proxy and each backend, then copy the automatically generated [`sync.yml`](/reference/sync/) from the proxy to each backend. Legacy `backend.yml` configurations are no longer needed for new installations.
