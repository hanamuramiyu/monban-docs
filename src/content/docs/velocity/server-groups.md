---
title: Server Groups
description: Group Velocity backends for shared access policies and permissions.
---

A server group is a named list of Velocity backends. It lets one `SERVER_GROUP` grant or backend policy apply to several servers.

Server groups describe topology. They are unrelated to player groups, which contain identities, access entries, and permissions.

## Define groups

Edit `plugins/monban/server-groups.yml`:

```yaml
schema-version: 1
groups:
  - id: public
    servers:
      - lobby
      - survival
  - id: testing
    servers:
      - test-lobby
      - test-survival
```

A missing file is created as an empty catalog:

```yaml
schema-version: 1
groups: []
```

## Rules

- Group IDs match `[a-z0-9][a-z0-9._-]{0,63}`.
- A backend can belong to at most one group.
- Backend names must be non-blank, unpadded, and resolve to real Velocity servers.
- Duplicate group IDs and duplicate backend membership are rejected.
- Unknown backend names fail startup; they are not treated as empty groups.

Velocity resolves configured names to its canonical registered-server names. Persistent `SERVER` scopes and policies are then validated against that resolved topology.

## What the group enables

With the example above, `SERVER_GROUP(testing)` can:

- satisfy a `GRANT_REQUIRED` policy shared by both testing backends;
- supply permissions at `SERVER_GROUP(testing)` scope;
- be granted to a player group as one access entry.

It does not grant access by itself. The receiving player still needs the group grant, and the backend policy decides whether a grant is required.

See [Backend Policies](/velocity/backend-policies/) and the [server-groups.yml reference](/reference/server-groups/).
