---
title: Introduction
description: Minecraft access control for standalone servers and Velocity networks.
---

monban decides who may enter a Minecraft server or network. It combines a global whitelist, optional backend access rules, player groups, and ordinary permission nodes in one access-control layer.

Use it in one of two roles:

- **On a standalone server**, monban owns the whitelist for Bukkit, Spigot, Paper, or Folia.
- **On Velocity**, monban owns network admission, can restrict individual backends, and can distribute Java player groups and permissions to Bukkit or Paper backends.

The current release also resolves authenticated Bedrock players through Floodgate on Velocity. Java-only networks do not need Geyser or Floodgate.

## Start with the shape of your network

| Deployment | Use it when | monban controls |
| --- | --- | --- |
| Bukkit / Spigot standalone | You need the compatibility build for one server. | Whitelist and local permissions |
| Paper / Folia standalone | You want the modern backend build for one server. | Whitelist and local permissions |
| Velocity network | A proxy owns admission across multiple backends. | Network admission, backend admission, groups, permissions, and Floodgate identity |

[Compare platforms](/getting-started/choosing-a-platform/) if you are unsure which build to install. For the underlying model, read [How monban Works](/concepts/how-it-works/).

## Common paths

<div class="doc-link-grid">
  <a class="doc-link-card" href="/getting-started/installation/"><strong>Install monban</strong><span>Choose and install a build →</span></a>
  <a class="doc-link-card" href="/standalone/setup/"><strong>Set up a standalone server</strong><span>Replace the vanilla whitelist →</span></a>
  <a class="doc-link-card" href="/velocity/setup/"><strong>Set up a Velocity network</strong><span>Configure network admission →</span></a>
  <a class="doc-link-card" href="/velocity/geyser-floodgate/"><strong>Add Bedrock players</strong><span>Configure Geyser and Floodgate →</span></a>
</div>

## Three identities, one decision

monban records why an identity can be trusted instead of treating every UUID as equivalent:

| Identity | Durable key | Used for |
| --- | --- | --- |
| `ONLINE` | Verified Java UUID | Authenticated Java accounts |
| `OFFLINE` | Normalized username | Name-based Java identities |
| `FLOODGATE` | Normalized Floodgate Java username | Authenticated Bedrock players on Velocity |

[Player Identity](/concepts/player-identity/) explains the security boundaries. [Access Model](/concepts/access-model/) explains how whitelist entries and scoped grants combine.

## Access and permissions are related, not identical

Access grants answer **where a player may connect**. Permission nodes answer **what a plugin allows after the player is connected**. Both can be supplied directly or through a player group, and both use the same `NETWORK`, `SERVER_GROUP`, and `SERVER` scopes.

Use `/monban lookup <player>` on Velocity to inspect the combined result and see which group or direct entry produced it.

## Failure behavior

monban treats access control as security-sensitive. Invalid configuration, unresolved backend names, required-provider failures, and login-time Floodgate provider errors do not become silent allow decisions. A backend without accepted synchronized state exposes no monban permissions rather than falling back to local state.
