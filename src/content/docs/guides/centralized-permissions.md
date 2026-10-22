---
title: Centralized Permissions
description: Give a backend plugin a permission managed by a Velocity player group.
---

This example grants CoreProtect's inspect node on `survival` through a monban group, without LuckPerms.

## 1. Install monban on both sides

Use:

- `monban-velocity-3.3.0.jar` on Velocity;
- `monban-paper-folia-3.3.0.jar` or the Bukkit/Spigot build on `survival`;
- CoreProtect on `survival`.

## 2. Enable synchronization

Velocity:

```yaml
backend-permissions:
  enabled: true
```

Restart. Velocity creates `plugins/monban/sync.yml`. Copy it to `survival`.

Backend:

```yaml
backend-permissions:
  enabled: true
  server-name: survival
```

The backend must use Velocity forwarding and the exact registered-server name.

This synchronization path applies to the Java `ONLINE` or `OFFLINE` identity resolved on the backend. Floodgate grants remain proxy-side in 3.3.0.

## 3. Match server-group mapping if needed

If the permission uses `SERVER_GROUP` scope, copy the same mapping to the backend's `server-groups.yml`:

```yaml
schema-version: 1
groups:
  - id: public
    servers:
      - survival
```

The `SERVER`-scoped example below does not need this mapping.

## 4. Create and assign the group

```text
/monban group create moderator
/monban group moderator permission add server survival coreprotect.inspect
/monban user Miyu group add moderator
```

## 5. Verify

```text
/monban lookup Miyu
```

The effective permissions should include `coreprotect.inspect` at `SERVER(survival)` with origin `GROUP:moderator`. Reconnect Miyu and run a CoreProtect inspect command.

If the node is missing, check:

- both `backend-permissions` blocks are enabled;
- `sync.yml` is identical;
- the backend name matches Velocity exactly;
- the backend starts with a valid `sync.yml` and no synchronization error;
- the plugin uses the same node string.
