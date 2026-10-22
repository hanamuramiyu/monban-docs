---
title: Choosing a Platform
description: Choose the monban build that matches where access decisions should happen.
---

Choose by **access authority**, not only by the server software in front of you.

| Capability | Bukkit / Spigot | Paper / Folia | Velocity |
| --- | :---: | :---: | :---: |
| Standalone whitelist | ✓ | ✓ | — |
| Network whitelist | — | — | ✓ |
| Scoped backend access | — | — | ✓ |
| Player groups and permissions | File-defined | File-defined | Managed + synchronized |
| Synchronized backend permissions | Receives | Receives | Sends |
| Hybrid auth-flow selection | — | — | ✓ |
| Floodgate identity | — | — | ✓ |
| Native Folia scheduling | — | ✓ | — |

## Bukkit / Spigot

Use `monban-bukkit-spigot` for one server when compatibility with the Bukkit API matters. It can own that server's whitelist and apply local permission attachments, but it does not provide Velocity server groups, backend policies, or scoped backend grants.

## Paper / Folia

Use `monban-paper-folia` for one modern server. It provides the same standalone access authority as the Bukkit build and uses Paper/Folia-safe scheduling where platform work is required.

The Paper/Folia artifact rejects `deployment.mode: VELOCITY`. It can still be a backend behind Velocity when it receives synchronized permissions, but the Velocity build remains the network authority.

## Velocity

Use `monban-velocity` when one proxy should decide who joins the network and which backend each player may reach. Choose Velocity if you need any of these:

- one network-wide whitelist;
- restricted backends or server groups;
- player groups and centralized permissions;
- Bedrock identity through Geyser and Floodgate;
- optional hybrid Java authentication.

Install a matching Bukkit or Paper monban build only on backends that must apply synchronized permissions. A backend without monban cannot attach monban nodes to local players.

## Common topologies

```text
One Java server
└── Bukkit/Spigot or Paper/Folia + monban

Velocity network
├── Velocity + monban
└── Backends
    ├── Paper + monban (optional, for permissions)
    └── Paper without monban (network admission still applies)

Geyser network
└── Velocity + Geyser + Floodgate + monban
```

Continue with [Standalone Setup](/standalone/setup/) or [Velocity Setup](/velocity/setup/).
