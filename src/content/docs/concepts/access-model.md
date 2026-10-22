---
title: Access Model
description: Understand network admission, scoped grants, and the three access scopes.
---

monban uses **positive grants**. A grant says where an identity may go; the absence of a matching grant never becomes a permanent deny rule that overrides another positive grant.

## The three scopes

| Scope | Opens | Stored as |
| --- | --- | --- |
| `NETWORK` | Entry to the standalone server or Velocity network | `whitelist.yml` |
| `SERVER_GROUP` | Entry to any backend in a named Velocity server group | `access-grants.yml` or a player group |
| `SERVER` | Entry to one Velocity backend | `access-grants.yml` or a player group |

`NETWORK` is the global whitelist. `SERVER_GROUP` and `SERVER` are narrower grants used by Velocity backend admission and permissions.

## Network admission

`whitelist.enabled` controls one question:

```text
Does this identity have a matching NETWORK grant?
```

When it is `true`, every player entering a standalone server or Velocity must pass that check. When it is `false`, the check is skipped. You can change it at runtime with `/monban whitelist enable` or `disable`.

## Backend admission

Velocity checks backend access separately. Each backend's effective mode comes from `backend-access.yml`:

| Mode | Additional requirement |
| --- | --- |
| `OPEN` | None |
| `GRANT_REQUIRED` | A matching `SERVER` or `SERVER_GROUP` grant |

The resulting matrix is:

| Global whitelist | Backend `OPEN` | Backend `GRANT_REQUIRED` |
| --- | --- | --- |
| disabled | allowed | scoped grant required |
| enabled | `NETWORK` required | `NETWORK` plus scoped grant required |

This is why disabling the global whitelist does not make restricted backends public.

## Direct and grouped grants

A player can receive access in two ways:

1. directly, through `/monban access ...` or `/monban whitelist ...`;
2. through an assigned player group containing access entries.

The effective result is the union of all positive grants. A duplicate grant is displayed once with all known origins.

Player groups are not the same thing as Velocity server groups:

| Name | Contains | Example |
| --- | --- | --- |
| Player group | Identities, access entries, permissions | `moderator` |
| Server group | Velocity backend names | `testing` |

A player group can contain a grant for a server group, but the two objects are independent.

## What is not supported

The current access model has no persistent deny grants, grant precedence between conflicting access entries, temporary expiry, wildcard nodes, or player-group inheritance.

## Related pages

- [Backend Policies](/velocity/backend-policies/) for `OPEN` and `GRANT_REQUIRED` precedence.
- [Scoped Access](/velocity/scoped-access/) for grants to backend groups and servers.
- [Player Groups & Permissions](/concepts/player-groups/) for direct and inherited entries.
