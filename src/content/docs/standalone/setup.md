---
title: Standalone Setup
description: Make monban the whitelist authority for one Bukkit, Spigot, Paper, or Folia server.
---

A standalone installation has one access authority: the local monban plugin. It does not use Velocity server groups, scoped backend grants, Floodgate identities, or hybrid authentication.

## 1. Prepare the server

Choose `monban-bukkit-spigot-3.3.0.jar` or `monban-paper-folia-3.3.0.jar` and place it in `plugins/`.

Set the native whitelist to disabled in `server.properties`:

```properties
white-list=false
```

monban refuses to treat the installation as ready while the native whitelist is enabled. It does not change that setting for you.

## 2. Start once and review the config

The first start creates `plugins/monban/config.yml`:

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: false

identity:
  mode: AUTO

backend-permissions:
  enabled: false
  server-name: ''
```

| Setting | Meaning |
| --- | --- |
| `whitelist.enabled` | Require a matching `NETWORK` entry at login |
| `identity.mode: AUTO` | Authenticated connections become `ONLINE`; others become `OFFLINE` |
| `identity.mode: OFFLINE` | Force every Java connection to use name-based identity |
| `backend-permissions.enabled` | Receive synchronized state when this server is a Velocity backend |

Do not add `identity.hybrid` or `identity.floodgate` to a standalone file. Both are Velocity-only settings and are rejected here.

## 3. Add access records

For an authenticated Java account:

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
```

For a name-based identity:

```text
/monban whitelist add offline hanamuramiyu2
```

The shorter `online <name>` form resolves the UUID from Mojang. The explicit UUID form avoids that network lookup.

Use `/monban whitelist enable` when the access list is ready. Until then, players are not blocked by the global whitelist.

## 4. Replace native whitelist commands

After a successful start, monban blocks `/whitelist`, `/minecraft:whitelist`, and `/bukkit:whitelist` administration so there is only one writable whitelist. Use:

```text
/monban whitelist add|remove|list|enable|disable
```

## 5. Verify

- monban starts without a whitelist-conflict or configuration error.
- `white-list=false` remains set.
- `/monban status` is unavailable on standalone; use the configuration and command output instead.
- An expected player can join while the whitelist is enabled.
- A non-matching `ONLINE` or `OFFLINE` identity is denied.

For platform-specific recipes, see [Standalone Online](/guides/standalone-online/) and [Standalone Offline](/guides/standalone-offline/). For exact fields, see the [config.yml reference](/reference/config/).
