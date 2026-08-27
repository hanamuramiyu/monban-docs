---
title: Player Groups & Permissions
description: Manage player groups, ACL, ordinary permission nodes, and effective access in monban.
---

monban has two different kinds of groups:

| Name | Contains | Example |
| --- | --- | --- |
| Player `GROUP` | Players, ACL grants, and permissions | `moderator` |
| `SERVER_GROUP` | Velocity backend servers | `public` |

They are independent. A player group can grant access to a server group, but it is not itself a server group.

## Group contents

A player group can contain:

- `NETWORK` access to the network;
- `SERVER_GROUP` access to a configured backend group;
- `SERVER` access to one backend;
- ordinary permission nodes at any of those scopes.

For example, one group can provide both access and local permissions:

```text
moderator
├── NETWORK
├── SERVER_GROUP public
├── SERVER staff
├── SERVER survival: coreprotect.inspect
└── SERVER staff: minecraft.command.ban
```

## Direct entries and inheritance

Players can receive access and permissions directly. Existing direct ACL grants remain independent from groups and are not removed when a group is assigned or removed.

When a player has several groups, monban combines their positive grants. A repeated grant is shown once with all of its origins.

There are no deny entries, permission weights, inheritance between player groups, wildcards, or temporary expirations in this version.

## Administration

The group administration commands are available on Velocity:

```text
/monban group create moderator
/monban group moderator access grant group public
/monban group moderator permission add server survival coreprotect.inspect
/monban user Miyu group add moderator
/monban user Miyu permission add network someproxy.command
```

The command permission is `monban.command.group`. Group IDs must match `[a-z0-9][a-z0-9._-]{0,63}`. Permission nodes must be non-blank and contain no whitespace.

## Effective state

```text
/monban lookup Miyu
```

The lookup shows assigned groups, effective access, effective permissions, and whether each entry came directly from the player or from a named group. This makes it possible to see why an entry is active without inspecting the storage files manually.
