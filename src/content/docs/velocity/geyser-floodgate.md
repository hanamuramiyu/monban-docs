---
title: Geyser & Floodgate
description: Admit authenticated Bedrock players through Geyser and Floodgate on Velocity.
---

Geyser translates Bedrock traffic to the Java protocol. Floodgate supplies the authenticated Bedrock identity to Velocity. monban then treats that connection as a `FLOODGATE` identity.

This integration belongs to the Velocity build. Bukkit and Paper builds do not inspect Floodgate state.

## Topology

```text
Bedrock client
└── Geyser
    └── Velocity
        ├── Floodgate
        ├── monban
        └── Java backends
```

Install Geyser, Floodgate, and monban on the proxy. Install monban on a backend only if that backend needs synchronized permissions for Java identities.

## 1. Install the proxy plugins

Place Geyser, Floodgate, and `monban-velocity-3.3.0.jar` in Velocity's `plugins/` directory. Floodgate is an optional monban dependency: Java-only networks can omit it, and when it is installed its plugin lifecycle is ordered before monban.

Configure Geyser to use Floodgate authentication according to Geyser's configuration for your topology. For the common Geyser-Velocity layout, the relevant setting is:

```yaml
auth-type: floodgate
```

## 2. Enable Floodgate in monban

Start once to generate `plugins/monban/config.yml`, then set:

```yaml
identity:
  mode: AUTO
  floodgate:
    enabled: true
    require-provider: true
```

The generated defaults are `enabled: false` and `require-provider: false`. Set both explicitly; an explicitly present `identity.floodgate` mapping with no `enabled` key is treated as enabled.

| Setting | Effect |
| --- | --- |
| `enabled: false` | monban never asks Floodgate for an identity |
| `enabled: true` | Floodgate connections become `FLOODGATE` |
| `require-provider: true` | Startup fails if the Floodgate API cannot be found |

Use `require-provider: true` when the network depends on Bedrock access control. With `enabled: true` and `require-provider: false`, a proxy that cannot discover the Floodgate API at startup continues with Java identity resolution. Once a provider has been discovered, a runtime provider failure denies the connection instead of silently downgrading it.

## 3. Add the Bedrock identity

Use the Floodgate Java username reported to monban, including its configured prefix. For an unlinked account this is normally the server-visible name. With the common default prefix:

```text
/monban whitelist add floodgate .BedrockName
```

The XUID can be recorded as optional metadata:

```text
/monban whitelist add floodgate .BedrockName <xuid>
```

The XUID is not the matching key. monban normalizes the name and uses it as the durable `FLOODGATE` identity. The current release reads Floodgate's Java username, so a linked account can resolve to the linked Java name rather than the raw Bedrock name.

The same `floodgate` selector is available in scoped access, group assignment, and direct-permission commands. These records are evaluated by Velocity:

```text
/monban access grant server survival floodgate .BedrockName
/monban user .BedrockName floodgate group add bedrock
/monban user .BedrockName floodgate permission add server survival some.permission
```

## 4. Verify

- Velocity starts without a missing-provider error.
- A Bedrock player connects through Geyser.
- `/monban whitelist list floodgate` shows the stored name key.
- The player passes or fails the `NETWORK` check according to the Floodgate record.
- Java players continue to resolve as `ONLINE` or `OFFLINE`.

For a production Bedrock network, verify a real Bedrock connection. monban does not log every successful Floodgate discovery, so use the resulting identity and admission decision rather than a startup-message assumption.

## Name changes and prefixes

The reported Java username is the key. If it changes, the old record no longer matches. Add the new name before removing the old one if the player must stay online.

If Floodgate reports a different Java username, that value is the key even when the raw Bedrock name looks familiar. Use `/monban whitelist list floodgate` to compare stored records and inspect the live connection when diagnosing a mismatch.

For unlinked accounts, if Floodgate uses a different prefix, include it exactly. A record for `.BedrockName` does not match `BedrockName`.

## Operational boundaries

- Do not configure Floodgate on a standalone Paper server.
- Do not expect a backend to create a second `FLOODGATE` identity.
- Do not expect a Floodgate group or direct permission to become a local permission attachment on a backend. Backend synchronization resolves Java identities only; use Velocity-side permission checks for Bedrock players.
- Keep Floodgate's `key.pem` private.
- When Geyser changes transport behavior, verify that the chosen Geyser version and published ports match its configuration.

For upgrade steps, see [Upgrading to 3.3](/getting-started/upgrading-to-3-3/). For failures, see [Troubleshooting](/help/troubleshooting/).
