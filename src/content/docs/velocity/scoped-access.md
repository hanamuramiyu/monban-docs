---
title: Scoped Access
description: Grant access to selected Velocity backends or backend groups.
---

Scoped access is useful when the network is broadly reachable but selected servers need an extra grant. Common cases include staff-only backends, beta servers, events, and maintenance targets.

## Grant grammar

```text
/monban access grant network <identity>
/monban access grant group <group-id> <identity>
/monban access grant server <server-name> <identity>
```

The identity selector is one of:

```text
offline <name>
online <name>
online <name> <uuid>
floodgate <name>
floodgate <name> <xuid>
```

Examples:

```text
/monban access grant group testing online hanamuramiyu <verified-uuid>
/monban access grant server survival floodgate .BedrockName
/monban access grant network offline Builder
```

Use quotes around a backend name that contains whitespace. Group IDs and backend names are validated against the current Velocity topology.

## Revoke and list

```text
/monban access revoke <network|group|server> ...
/monban access list [page]
/monban access list network [page]
/monban access list group <group-id> [page]
/monban access list server <server-name> [page]
```

Listings show ten entries per page. Invalid filters and out-of-range pages return an explicit error.

## NETWORK is shared with the whitelist

On Velocity, `/monban access ... network ...` and `/monban whitelist ...` operate on the same `NETWORK` state. A grant added through one command is visible through the other.

The shorter `/monban whitelist` surface is usually clearer for network-wide admission. Use `/monban access` when you are working across several scopes.

## Grants need a policy to matter

A `SERVER_GROUP` or `SERVER` grant allows a backend when that backend's effective policy is `GRANT_REQUIRED`. If the backend is `OPEN`, the grant does not block or change entry.

See [Backend Policies](/velocity/backend-policies/) for precedence and [Restrict a Backend](/guides/restrict-a-backend/) for a worked example.
