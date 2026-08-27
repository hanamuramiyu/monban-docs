---
title: Centralized Backend Permissions
description: Set up Velocity-managed player groups and permissions on Bukkit or Paper backends.
---

This guide gives `moderator` the CoreProtect inspect permission on `survival` without installing LuckPerms.

## 1. Install the plugins

Install `monban-velocity-<version>.jar` on Velocity and the matching Bukkit or Paper monban build on `survival`. Install CoreProtect on the same backend.

## 2. Enable backend permissions

On Velocity, set this in `plugins/monban/config.yml`:

```yaml
backend-permissions:
  enabled: true
```

Restart Velocity. monban creates `plugins/monban/sync.yml` automatically with a random secret. Copy the generated file to the monban data directory on `survival`. Treat this secret like a credential and do not commit it to a public repository.

## 3. Identify the backend

On `survival`, set this in `plugins/monban/config.yml` using the exact Velocity registered-server name:

```yaml
backend-permissions:
  enabled: true
  server-name: survival
```

Paper must have Velocity forwarding enabled. If it is not, monban does not start centralized backend mode. The backend also needs `server-groups.yml` if it should use `SERVER_GROUP`-scoped permissions. Keep its server group definition consistent with the proxy:

```yaml
schema-version: 1
groups:
  - id: public
    servers:
      - survival
```

## 4. Create and assign the group

Run on Velocity:

```text
/monban group create moderator
/monban group moderator permission add server survival coreprotect.inspect
/monban user Miyu group add moderator
```

For a group permission shared by every backend in `public`, use:

```text
/monban group moderator permission add group public coreprotect.inspect
```

The command administrator needs `monban.command.group`.

## 5. Verify the result

Use:

```text
/monban lookup Miyu
```

The effective permissions should show `coreprotect.inspect` at `SERVER(survival)` with origin `GROUP:moderator`. After Miyu joins `survival`, CoreProtect sees the ordinary Bukkit permission node.

If the backend has not received a valid snapshot, inspect the Velocity and backend logs, verify the copied secret, confirm `backend-permissions.enabled: true` on both sides, and confirm the backend name matches Velocity. The backend does not register local `/monban whitelist` administration; use the proxy.
