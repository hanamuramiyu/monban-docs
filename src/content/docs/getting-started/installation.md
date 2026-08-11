---
title: Installation
description: Download monban and choose the correct build for your platform.
---

<div class="download-actions">
  <a class="download-button primary" href="https://modrinth.com/plugin/monban">Download on Modrinth</a>
  <a class="download-button secondary" href="https://github.com/hanamuramiyu/monban/releases">GitHub Releases</a>
</div>

## Choose the correct build

| Platform | Artifact |
| --- | --- |
| Bukkit / Spigot | `monban-bukkit-spigot-<version>.jar` |
| Paper / Folia | `monban-paper-folia-<version>.jar` |
| Velocity | `monban-velocity-<version>.jar` |

The **Paper / Folia** artifact is a Paper plugin and is not the Bukkit compatibility artifact. Use the separate **Bukkit / Spigot** build when Paper APIs are unavailable. Velocity has its own proxy build.

## Java requirements

monban distributable bytecode targets **Java 21**.

| Runtime | Java requirement |
| --- | --- |
| Bukkit / Spigot | Java 21 |
| Velocity | Java 21 |
| Paper `1.20` through `1.21.11` | Java 21 |
| Paper `26.1+` | Java 25 |

:::note[Bytecode vs. server runtime]
monban is compiled for Java 21 bytecode, but a modern Paper server may itself require Java 25 to start. In that case, run the server on Java 25; the Java 21-targeted monban plugin remains compatible with that newer JVM.
:::

## Install

1. Download the artifact for your platform.
2. Put the JAR in the platform's `plugins/` directory.
3. For a standalone Bukkit/Spigot or Paper/Folia server, set `white-list=false` in `server.properties` **before starting monban**.
4. Start the server or proxy so monban can create its data directory and default configuration.
5. Configure `plugins/monban/config.yml`.
6. Restart and manage access with `/monban ...`.

:::caution[Standalone whitelist ownership]
A standalone monban installation requires the native Minecraft whitelist to be disabled with `white-list=false`. monban does not silently disable it for you.
:::

Continue with [Standalone Setup](/standalone/setup/) or [Velocity Setup](/velocity/setup/).
