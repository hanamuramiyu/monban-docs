---
title: Server Groups
description: Group Velocity backends for scoped access administration and backend policies.
---

Use `server-groups.yml` when several Velocity backends should share one access grant or one backend policy.

## Example

```yaml
schema-version: 1
groups:
  - id: public
    servers:
      - lobby
      - survival
      - creative
  - id: testing
    servers:
      - test-lobby
      - test-survival
```

With this topology, one `SERVER_GROUP(testing)` grant can authorize access to both testing backends when their effective backend policy is `GRANT_REQUIRED`.

## Rules

- One backend can belong to **at most one** server group.
- Group IDs must match `[a-z0-9][a-z0-9._-]{0,63}`.
- Group IDs are not silently normalized.
- Server names must be non-blank, unpadded references to real Velocity backends.
- Duplicate group IDs are rejected.
- Duplicate server membership is rejected, including a backend appearing in two groups.
- An unknown backend reference is a startup failure.

During startup, monban resolves configured server references through Velocity and builds runtime topology from the canonical backend names returned by Velocity. Persistent server-scoped grants and backend policies are then validated against that resolved topology.

:::caution[Topology errors fail startup]
A typo in a backend name is not treated as an empty group. Fix the referenced Velocity backend name and restart.
:::

For exact fields and validation rules, see [`server-groups.yml` Reference](/reference/server-groups/).
