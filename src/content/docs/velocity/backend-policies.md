---
title: Backend Policies
description: Choose which Velocity backends are open and which require a scoped grant.
---

Backend admission is independent of the global whitelist. It decides whether entering a particular backend needs a `SERVER` or `SERVER_GROUP` grant.

## Configure policies

`plugins/monban/backend-access.yml`:

```yaml
schema-version: 1
default: OPEN
policies:
  - scope:
      type: SERVER_GROUP
      id: testing
    mode: GRANT_REQUIRED
  - scope:
      type: SERVER
      id: lobby
    mode: OPEN
```

A missing file is created with `default: OPEN` and no overrides.

## Modes

| Mode | Behavior |
| --- | --- |
| `OPEN` | The backend adds no scoped-access requirement |
| `GRANT_REQUIRED` | A matching `SERVER` or `SERVER_GROUP` grant is required |

For a backend in a group, `GRANT_REQUIRED` accepts either a direct `SERVER` grant for that backend or a `SERVER_GROUP` grant for its group.

## Precedence

The effective mode is resolved in this order:

```text
SERVER override
→ SERVER_GROUP override
→ default
```

A direct `SERVER` policy can therefore open one member of an otherwise restricted group.

## Validation

At startup, every policy group must exist and every server policy must name a real Velocity backend. The file rejects `NETWORK` scopes, unsupported modes, duplicate policies, unknown fields, duplicate YAML keys, and YAML aliases.

## Interaction with the whitelist

| Global whitelist | `OPEN` backend | `GRANT_REQUIRED` backend |
| --- | --- | --- |
| disabled | allowed | scoped grant required |
| enabled | `NETWORK` required | `NETWORK` and scoped grant required |

Disabling the global whitelist does not turn a restricted backend into a public one.

See the [backend-access.yml reference](/reference/backend-access/) and [Restrict a Backend](/guides/restrict-a-backend/).
