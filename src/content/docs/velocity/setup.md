---
title: Velocity Network
description: Configure monban as the access authority for a Velocity proxy.
---

Use `monban-velocity-3.3.0.jar` when Velocity should decide who enters the network and which backend each player may reach.

## 1. Install on the proxy

Place the Velocity build in `plugins/` and start the proxy once. monban creates `plugins/monban/config.yml` with a Velocity deployment shape.

The initial configuration is safe to start with:

```yaml
config-version: 1

deployment:
  mode: VELOCITY

whitelist:
  enabled: false

identity:
  mode: AUTO
  hybrid:
    enabled: false
    dual-entry-preference: ONLINE
  floodgate:
    enabled: false
    require-provider: false
```

Keep the complete `identity.hybrid` mapping even when hybrid is disabled. The `identity.floodgate` mapping is required by current configurations and is also disabled by default.

## 2. Decide which access layers you need

| Layer | File | Purpose |
| --- | --- | --- |
| Network admission | `whitelist.yml` + `config.yml` | Require a global `NETWORK` grant |
| Backend admission | `server-groups.yml` + `backend-access.yml` + `access-grants.yml` | Restrict selected backends |
| Player groups | `player-groups.yml` + `group-assignments.yml` | Bundle access and permissions |
| Direct permissions | `player-permissions.yml` | Grant nodes to one identity |

You can begin with only the whitelist. Backend policies default to `OPEN` and server groups start empty.

## 3. Add network access

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
/monban whitelist enable
```

For a name-based identity, use `offline <name>`. For Bedrock, use the separate Floodgate setup.

## 4. Add backend restrictions when needed

Create server groups in `server-groups.yml`, set the required policies in `backend-access.yml`, then grant access:

```text
/monban access grant group testing online hanamuramiyu <verified-uuid>
```

See [Server Groups](/velocity/server-groups/), [Backend Policies](/velocity/backend-policies/), and [Scoped Access](/velocity/scoped-access/).

## 5. Add centralized permissions when needed

Enable synchronization on Velocity:

```yaml
backend-permissions:
  enabled: true
```

Copy the generated `sync.yml` to each backend that should apply monban permissions, and set that backend's exact `server-name`. Read [Backend Synchronization](/concepts/backend-sync/).

## 6. Verify the installation

```text
/monban status
/monban lookup Miyu
```

Check the deployment, whitelist policy, identity mode, topology counts, effective groups, access origins, and permissions. A player who can enter the proxy but is denied a backend is usually hitting a `GRANT_REQUIRED` policy, not the network whitelist.

## Next steps

- [Geyser & Floodgate](/velocity/geyser-floodgate/) for Bedrock players.
- [Hybrid Authentication](/velocity/hybrid-authentication/) for per-connection Java auth selection.
- [Command Overview](/administration/commands/) for the operator surface.
