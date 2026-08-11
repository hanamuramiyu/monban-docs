---
title: Access
description: Manage Velocity NETWORK, server-group, and server grants.
---

`/monban access` is available on **Velocity only**.

## Permission

```text
monban.command.access
```

## Grant

```text
/monban access grant network offline <name>
/monban access grant network online <name> <uuid>

/monban access grant group <group-id> offline <name>
/monban access grant group <group-id> online <name> <uuid>

/monban access grant server <server-name> offline <name>
/monban access grant server <server-name> online <name> <uuid>
```

## Revoke

`revoke` mirrors the same grammar:

```text
/monban access revoke network offline <name>
/monban access revoke network online <name> <uuid>

/monban access revoke group <group-id> offline <name>
/monban access revoke group <group-id> online <name> <uuid>

/monban access revoke server <server-name> offline <name>
/monban access revoke server <server-name> online <name> <uuid>
```

## List

```text
/monban access list
/monban access list <page>
/monban access list network
/monban access list network <page>
/monban access list group <group-id>
/monban access list group <group-id> <page>
/monban access list server <server-name>
/monban access list server <server-name> <page>
```

Listings use **10 entries per page** and validate group/backend scope filters against the current Velocity topology.

:::note[One NETWORK state]
`/monban whitelist ...` and `/monban access ... network ...` are two administrative views over the same Velocity `NETWORK` grants. A mutation through either command is visible through the other.
:::

See [Scoped Access](/velocity/scoped-access/) for how grants interact with backend policies.
