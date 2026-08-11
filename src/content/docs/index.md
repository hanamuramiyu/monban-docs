---
title: Introduction
description: Minecraft access control for standalone servers and Velocity networks.
---

**monban** is a Minecraft whitelist and access-control plugin for standalone servers and Velocity networks. It keeps player identity explicit and applies access decisions before a connection is admitted where that decision belongs.

## Choose your deployment

| Deployment | Use it when | Access authority |
| --- | --- | --- |
| **Bukkit / Spigot** | You need a compatibility-focused standalone installation. | The server |
| **Paper / Folia** | You run a standalone modern server and want the preferred backend build. | The server |
| **Velocity** | A proxy owns network admission and you need network or scoped access. | Velocity |

Standalone installations use a global monban whitelist. Velocity can use the same global whitelist and additionally restrict individual backends or groups of backends.

## Player identity

monban distinguishes two identity types:

- **ONLINE** — identity is anchored to a verified Minecraft UUID. The current username is metadata.
- **OFFLINE** — identity is anchored to the normalized username. A technical UUID does not turn it into an ONLINE identity.

This distinction is deliberate. A UUID is trusted as an ONLINE identity only when the platform authentication path provides the required provenance.

[Read Player Identity →](/concepts/player-identity/)

## Access model

The global whitelist is the `NETWORK` access scope. On Velocity, monban also supports positive access grants for:

- `SERVER_GROUP` — a named group of Velocity backends;
- `SERVER` — one specific Velocity backend.

Backend policies decide whether a backend is `OPEN` or requires one of those scoped grants. The global whitelist and backend admission are separate checks, so disabling the global whitelist does not disable restricted backends.

[Read Access Model →](/concepts/access-model/)

## Hybrid authentication

Velocity can optionally select an `ONLINE` or `OFFLINE` authentication flow for each connection on a supported hybrid deployment. The selection does not authenticate a player by itself: Velocity remains responsible for the selected authentication flow, and monban resolves the final identity from the resulting authentication facts.

[Read Hybrid Authentication →](/velocity/hybrid-authentication/)

## Fail-closed access

When monban cannot safely initialize or verify security-sensitive access state, it does not silently turn that failure into an allow decision. Startup access guards remain in place until the access plane is ready, and malformed security-relevant configuration causes startup to fail visibly.

## Start here

<div class="doc-link-grid">
  <a class="doc-link-card" href="/getting-started/installation/"><strong>New installation</strong><span>Installation →</span></a>
  <a class="doc-link-card" href="/getting-started/choosing-a-platform/"><strong>Not sure which build?</strong><span>Choosing a Platform →</span></a>
  <a class="doc-link-card" href="/standalone/setup/"><strong>Standalone server</strong><span>Standalone Setup →</span></a>
  <a class="doc-link-card" href="/velocity/setup/"><strong>Velocity network</strong><span>Velocity Setup →</span></a>
</div>
