---
title: Player Identity
description: Understand ONLINE and OFFLINE identity semantics in monban.
---

monban does not treat every username and UUID as equivalent proof. Every access entry has explicit identity provenance: `ONLINE` or `OFFLINE`.

## ONLINE identity

An ONLINE identity is anchored to a **verified UUID**.

- The verified UUID is the durable identity key.
- The username is metadata attached to that identity.
- A username change does not create a different ONLINE identity when the verified UUID stays the same.

Use ONLINE entries only when you intend to match a connection that the platform has independently resolved as authenticated ONLINE identity.

## OFFLINE identity

An OFFLINE identity is anchored to the **normalized username**.

- Name matching is case-insensitive through normalized form.
- `hanamuramiyu`, `HanamuraMiyu`, and `HANAMURAMIYU` represent the same OFFLINE identity.
- A platform may provide a technical UUID for an offline-mode connection, but that UUID is not Minecraft account ownership proof.

:::caution[A UUID existing does not make an identity ONLINE]
Authentication provenance determines whether a UUID can be trusted as ONLINE identity. A technical UUID attached to an OFFLINE connection remains technical data, not verified identity proof.
:::

## `identity.mode`

monban currently accepts two identity resolution modes:

### `AUTO`

```text
platform authenticated
→ ONLINE

platform not authenticated
→ OFFLINE
```

Use `AUTO` when monban should preserve the platform's authentication provenance.

### `OFFLINE`

```text
always OFFLINE
```

`OFFLINE` forces username-based identity semantics even when the platform supplies a technical UUID.

There is no `ONLINE` configuration mode.

## Administration follows the same rule

Commands never infer provenance from a username or from the mere presence of a UUID:

```text
offline <name>
online <name> <uuid>
```

See [Whitelist Administration](/administration/whitelist/) and [Scoped Access](/velocity/scoped-access/).
