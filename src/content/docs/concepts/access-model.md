---
title: Access Model
description: Understand NETWORK, SERVER_GROUP, and SERVER access scopes.
---

monban uses positive access grants. The scope tells monban **what the grant opens**.

## Scopes

| Scope | Meaning | Where it is used |
| --- | --- | --- |
| `NETWORK` | Global whitelist entry | Standalone and Velocity |
| `SERVER_GROUP` | Access to a named group of Velocity backends | Velocity |
| `SERVER` | Access to one specific Velocity backend | Velocity |

`NETWORK` is the global whitelist state. On Velocity, `SERVER_GROUP` and `SERVER` are additional backend-access scopes; they do not replace the network whitelist.

## Network Admission

When `whitelist.enabled: true`, the player must have a matching `NETWORK` grant before entering the standalone server or Velocity network.

When `whitelist.enabled: false`, that global requirement is skipped.

## Backend Admission on Velocity

Velocity can independently mark a backend as `OPEN` or `GRANT_REQUIRED` through `backend-access.yml`.

| Global whitelist | Backend `OPEN` | Backend `GRANT_REQUIRED` |
| --- | --- | --- |
| disabled | allowed | scoped grant still required |
| enabled | `NETWORK` grant required first | `NETWORK` + scoped grant requirements |

:::caution[Whitelist disabled does not mean all access control disabled]
`whitelist.enabled: false` disables the `NETWORK` requirement. It does not disable Velocity Backend Admission or a `GRANT_REQUIRED` policy.
:::

## Positive grants only

The current access model contains positive grants. It does not contain persistent `DENY` grants, precedence rules for deny effects, or temporary grant expiration.

For practical configuration, continue with [Scoped Access](/velocity/scoped-access/) and [Backend Policies](/velocity/backend-policies/).
