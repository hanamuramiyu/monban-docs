---
title: Installation
description: Download the correct monban artifact and complete the first startup safely.
---

<div class="download-actions">
  <a class="download-button primary" href="https://modrinth.com/plugin/monban">Download on Modrinth</a>
  <a class="download-button secondary" href="https://github.com/hanamuramiyu/monban/releases">GitHub Releases</a>
</div>

## Pick one artifact

| Platform | Artifact | Runtime |
| --- | --- | --- |
| Bukkit / Spigot | `monban-bukkit-spigot-3.3.0.jar` | Java 21+ |
| Paper / Folia | `monban-paper-folia-3.3.0.jar` | Java 21+; Paper `26.1+` requires Java 25 |
| Velocity | `monban-velocity-3.3.0.jar` | Java 21+ |

The Paper/Folia artifact is a Paper plugin, not a renamed Bukkit artifact. Do not install both backend builds on the same server.

## Install the plugin

1. Stop the server or proxy.
2. Put the selected JAR in its `plugins/` directory.
3. On a standalone Bukkit, Spigot, Paper, or Folia server, set `white-list=false` in `server.properties`.
4. Start once so monban can create `plugins/monban/` and its initial configuration.
5. Edit `plugins/monban/config.yml`.
6. Restart and verify that monban loaded without an access-control error.

:::caution[The native whitelist stays under your control]
monban does not disable Minecraft's native whitelist. On a standalone server it must already be disabled, otherwise two whitelist authorities would compete.
:::

## Choose the next guide

- [Standalone Setup](/standalone/setup/) for Bukkit, Spigot, Paper, or Folia.
- [Velocity Setup](/velocity/setup/) for a proxy network.
- [Geyser & Floodgate](/velocity/geyser-floodgate/) for Bedrock players.
- [Centralized Permissions](/guides/centralized-permissions/) when backend plugins should receive monban permissions.

## Upgrade an existing installation

Follow [Upgrading to 3.3](/getting-started/upgrading-to-3-3/) before replacing an older Velocity configuration. The new `identity.floodgate` section is explicit and is disabled by default.
