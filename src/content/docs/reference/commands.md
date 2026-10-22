---
title: Commands & Permissions
description: Complete command grammar for monban 3.3.0.
---

Commands use explicit identity types. The placeholder `<identity>` below means:

```text
offline <name>
online <name>
online <name> <uuid>
floodgate <name>
floodgate <name> <xuid>
```

`online <name>` is accepted by whitelist and access commands and resolves the profile through Mojang. `floodgate` is available only on Velocity.

## Whitelist

Permission: `monban.command.whitelist`. Available on all supported platforms.

```text
/monban whitelist enable
/monban whitelist disable
/monban whitelist add offline <name>
/monban whitelist add online <name>
/monban whitelist add online <name> <uuid>
/monban whitelist add floodgate <name>
/monban whitelist add floodgate <name> <xuid>
/monban whitelist remove offline <name>
/monban whitelist remove online <name>
/monban whitelist remove online <name> <uuid>
/monban whitelist remove floodgate <name>
/monban whitelist remove floodgate <name> <xuid>
/monban whitelist list [page]
/monban whitelist list offline [page]
/monban whitelist list online [page]
/monban whitelist list floodgate [page]
```

The Floodgate add, remove, and list forms are Velocity-only.

## Scoped access

Permission: `monban.command.access`. Velocity only.

```text
/monban access grant network <identity>
/monban access grant group <group-id> <identity>
/monban access grant server <server-name> <identity>

/monban access revoke network <identity>
/monban access revoke group <group-id> <identity>
/monban access revoke server <server-name> <identity>

/monban access list [page]
/monban access list network [page]
/monban access list group <group-id> [page]
/monban access list server <server-name> [page]
```

## Player groups

Permission: `monban.command.group`. Velocity only.

```text
/monban group create <group-id>
/monban group remove <group-id>

/monban group <group-id> access grant network
/monban group <group-id> access grant group <server-group-id>
/monban group <group-id> access grant server <server-name>
/monban group <group-id> access revoke network
/monban group <group-id> access revoke group <server-group-id>
/monban group <group-id> access revoke server <server-name>

/monban group <group-id> permission add network <node>
/monban group <group-id> permission add group <server-group-id> <node>
/monban group <group-id> permission add server <server-name> <node>
/monban group <group-id> permission remove network <node>
/monban group <group-id> permission remove group <server-group-id> <node>
/monban group <group-id> permission remove server <server-name> <node>
```

## Player assignments and direct permissions

Permission: `monban.command.group`. Velocity only.

```text
/monban user <player> group add <group-id>
/monban user <player> group remove <group-id>
/monban user <player> offline group add|remove <group-id>
/monban user <player> online group add|remove <group-id>
/monban user <player> floodgate group add|remove <group-id>
/monban user <player> floodgate <xuid> group add|remove <group-id>

/monban user <player> permission add network <node>
/monban user <player> permission add group <server-group-id> <node>
/monban user <player> permission add server <server-name> <node>
/monban user <player> permission remove network <node>
/monban user <player> permission remove group <server-group-id> <node>
/monban user <player> permission remove server <server-name> <node>
```

The `online`, `offline`, and `floodgate` qualifiers can also precede the `permission` branch. Without a qualifier, monban tries the Mojang profile and falls back to the `OFFLINE` identity when the name is not found.

Floodgate group and permission records are evaluated on Velocity. They do not become local `FLOODGATE` permission attachments on synchronized backends.

## Lookup and status

```text
/monban lookup <player>     # monban.command.lookup
/monban status              # monban.command.status
```

Both commands are Velocity-only. `lookup` builds a Java `ONLINE`/`OFFLINE` effective view; it does not discover a Floodgate identity from a plain name.

## Input rules

- Java names use `[A-Za-z0-9_]{1,16}`.
- Floodgate names are non-whitespace text up to 16 characters and may contain the configured prefix.
- XUIDs contain 1–32 decimal digits.
- Group IDs match `[a-z0-9][a-z0-9._-]{0,63}`.
- Permission nodes are non-blank and contain no whitespace.
- Listings use ten entries per page.
