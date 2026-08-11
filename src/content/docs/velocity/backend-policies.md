---
title: Backend Policies
description: Decide which Velocity backends are open and which require scoped grants.
---

`backend-access.yml` controls Backend Admission independently from the global network whitelist.

## Example

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

## Modes

### `OPEN`

The backend policy itself requires no scoped grant.

### `GRANT_REQUIRED`

The connection must have a matching scoped grant.

For a backend that belongs to a group, `GRANT_REQUIRED` accepts either:

- a direct `SERVER` grant for that backend; or
- a `SERVER_GROUP` grant for its group.

## Policy priority

The effective mode is selected in this order:

```text
SERVER
  ↓
SERVER_GROUP
  ↓
default
```

A direct server policy therefore overrides its group policy, and a group policy overrides the file default.

:::caution[Global whitelist and Backend Admission are separate]
Passing the `NETWORK` whitelist does not grant access to every `GRANT_REQUIRED` backend. Likewise, `whitelist.enabled: false` does not turn restricted backends into `OPEN` backends.
:::

For exact schema rules, see [`backend-access.yml` Reference](/reference/backend-access/).
