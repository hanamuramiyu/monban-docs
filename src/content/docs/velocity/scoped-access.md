---
title: Scoped Access
description: Grant positive NETWORK, SERVER_GROUP, and SERVER access on Velocity.
---

Velocity can keep the network generally accessible while restricting selected backends, or combine a global whitelist with narrower backend grants.

## Available scopes

| Administrative scope | Stored scope | Purpose |
| --- | --- | --- |
| `network` | `NETWORK` | Global network whitelist |
| `group <group-id>` | `SERVER_GROUP` | Access to a configured server group |
| `server <server-name>` | `SERVER` | Access to one backend |

`NETWORK` grants are the same state managed by `/monban whitelist`. Group and server grants are Velocity-specific scoped state.

## Common uses

Positive scoped grants work well for:

- beta or testing networks;
- staff-only backends;
- event servers;
- maintenance backends;
- explicitly invited guests.

## Make a backend require a grant

A scoped grant matters for admission when the target backend's effective policy is `GRANT_REQUIRED`.

For example:

```text
/monban access grant group testing online hanamuramiyu <verified-uuid>
```

Then configure a `SERVER_GROUP testing` backend policy as `GRANT_REQUIRED`.

See [Backend Policies](/velocity/backend-policies/) and [Access Administration](/administration/access/).

:::note[Positive grants only]
The current persistent access model has positive grants. There are no `DENY` grants and no temporary expiration field.
:::
