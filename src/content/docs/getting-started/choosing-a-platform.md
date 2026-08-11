---
title: Choosing a Platform
description: Choose the monban build and deployment model that matches your server topology.
---

Choose the platform based on **where access authority belongs**.

## Feature comparison

| Capability | Bukkit / Spigot | Paper / Folia | Velocity |
| --- | :---: | :---: | :---: |
| Standalone whitelist | ✓ | ✓ | <span class="table-muted">—</span> |
| Network whitelist | <span class="table-muted">—</span> | <span class="table-muted">—</span> | ✓ |
| Server groups | <span class="table-muted">—</span> | <span class="table-muted">—</span> | ✓ |
| Per-server grants | <span class="table-muted">—</span> | <span class="table-muted">—</span> | ✓ |
| Backend policies | <span class="table-muted">—</span> | <span class="table-muted">—</span> | ✓ |
| Hybrid auth selection | <span class="table-muted">—</span> | <span class="table-muted">—</span> | ✓ |
| Folia-native | <span class="table-muted">—</span> | ✓ | <span class="table-muted">—</span> |

## Use Bukkit / Spigot when

Use `monban-bukkit-spigot-<version>.jar` when you need a compatibility-focused **standalone** installation and Paper APIs are unavailable.

This build owns access for that one server. It does not provide Velocity server groups, backend policies, scoped grants, or hybrid authentication-flow selection.

## Use Paper / Folia when

Use `monban-paper-folia-<version>.jar` for a standalone Paper or Folia server. This is the preferred modern standalone backend and is packaged separately from the Bukkit/Spigot artifact.

Folia support is declared by the Paper/Folia build, and platform work is performed through Paper/Folia-safe scheduling paths where scheduling is required.

:::caution[Do not enable VELOCITY deployment on the Paper/Folia plugin]
The current Paper/Folia plugin rejects `deployment.mode: VELOCITY`. A Paper backend can participate behind a Velocity proxy through the proxy's forwarding topology, including the tested hybrid topology, but the Paper plugin itself does not become the network authority.
:::

## Use Velocity when

Use `monban-velocity-<version>.jar` when Velocity is the network access authority. Choose this deployment when you need any of the following:

- one global network whitelist;
- server groups;
- per-server or per-group grants;
- backend access policies;
- hybrid ONLINE/OFFLINE authentication-flow selection.

Continue with [Velocity Setup](/velocity/setup/).
