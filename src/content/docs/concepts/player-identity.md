---
title: Player Identity
description: How monban distinguishes ONLINE, OFFLINE, and FLOODGATE identities.
---

An access record is only as reliable as the identity it matches. monban therefore stores an explicit identity type instead of treating every username and UUID as interchangeable.

| Type | Durable key | Username role | Available on |
| --- | --- | --- | --- |
| `ONLINE` | Verified Java UUID | Display metadata | Bukkit, Paper, Velocity |
| `OFFLINE` | Normalized username | Identity key | Bukkit, Paper, Velocity |
| `FLOODGATE` | Normalized Floodgate Java username | Identity key | Velocity |

## ONLINE

An `ONLINE` identity is created when the platform supplies an authenticated Java UUID. The UUID is the durable key; the username can change without creating a different identity.

Use an `ONLINE` record when you mean “this authenticated Java account,” not merely “a connection that happened to include a UUID.”

## OFFLINE

An `OFFLINE` identity is anchored to the normalized username. Matching is case-insensitive:

```text
Alex = alex = ALEX
```

A platform may attach a technical UUID to an offline-mode connection. That value is retained as technical metadata but does not prove account ownership and does not turn the record into `ONLINE`.

:::caution[Name-based means name-based]
Anyone who can present the same name to an offline-mode service can present the same `OFFLINE` identity. monban is an access-control layer, not a registration, password, or session system.
:::

## FLOODGATE

On Velocity, monban can ask Floodgate whether the connecting UUID belongs to an authenticated Bedrock player. A positive result creates a `FLOODGATE` identity.

- The normalized Floodgate Java username is the durable key.
- For unlinked accounts this is normally the server-visible name, including Floodgate's configured prefix such as the default `.`.
- The current release reads Floodgate's Java username, not the raw Bedrock `getUsername` value. A linked account can therefore use the linked Java name.
- XUID is optional metadata and does not participate in matching.
- Changing the Bedrock/Floodgate name changes the access key.

Example:

```text
/monban whitelist add floodgate .BedrockName
```

The legacy-looking form with an XUID is still accepted:

```text
/monban whitelist add floodgate .BedrockName 2535421234567890
```

The XUID is validated as 1–32 decimal digits, but the name remains the identity key.

Read [Geyser & Floodgate](/velocity/geyser-floodgate/) for installation, name checks, and failure behavior.

## identity.mode

`identity.mode` controls Java identity resolution:

| Mode | Platform authenticated | Platform not authenticated |
| --- | --- | --- |
| `AUTO` | `ONLINE` | `OFFLINE` |
| `OFFLINE` | `OFFLINE` | `OFFLINE` |

There is no `ONLINE` mode. `FLOODGATE` is selected by Floodgate detection, not by `identity.mode`.

Standalone builds do not resolve Floodgate identities. Their configuration also rejects `identity.floodgate` and `identity.hybrid`.

## Administration uses explicit types

Every player-facing access command names the identity type:

```text
offline <name>
online <name> <uuid>
floodgate <name>
floodgate <name> <xuid>
```

The shorter `online <name>` form is also available: it resolves the verified UUID through the official Mojang profile service. A direct UUID bypasses that lookup.

## Why the distinction matters

Suppose a player has both `ONLINE Alex` and `OFFLINE Alex` records. They are different identities with different security properties. Velocity hybrid deployments can use both as routing signals, but an admission decision still uses the identity produced by the selected authentication flow.

Continue with [Access Model](/concepts/access-model/) to see how an identity matches a grant.
