---
title: Standalone Setup
description: Configure monban on Bukkit, Spigot, Paper, or Folia as the local access authority.
---

<div class="download-actions compact">
  <a class="download-button primary" href="https://modrinth.com/plugin/monban">Download on Modrinth</a>
  <a class="download-button secondary" href="https://github.com/hanamuramiyu/monban/releases">GitHub Releases</a>
</div>

## 1. Choose the build

Use one of these artifacts:

- Bukkit / Spigot: `monban-bukkit-spigot-<version>.jar`
- Paper / Folia: `monban-paper-folia-<version>.jar`

Put the JAR in `plugins/`.

## 2. Disable the vanilla whitelist

Set this in `server.properties`:

```properties
white-list=false
```

This is a requirement of the current standalone model. monban and the native Minecraft whitelist must not act as competing whitelist authorities.

If the native whitelist is enabled when monban starts, monban does **not** turn it off automatically. Startup fails safely and leaves the native setting untouched.

After monban starts successfully, direct native whitelist administration is blocked for:

```text
/whitelist
/minecraft:whitelist
/bukkit:whitelist
```

Use `/monban whitelist` instead.

## 3. First startup

Start the server once. monban uses `plugins/monban/` as its data directory and creates the default `config.yml` when it is missing.

If startup fails, fix the reported configuration or whitelist conflict before treating monban access control as ready.

## 4. Configure monban

The standalone default configuration is:

```yaml
config-version: 1

deployment:
  mode: STANDALONE

whitelist:
  enabled: false

identity:
  mode: AUTO
```

### `whitelist.enabled`

- `false` — monban does not require a `NETWORK` whitelist entry to join.
- `true` — a matching `NETWORK` entry is required.

### `identity.mode`

- `AUTO` — authenticated platform connections resolve as ONLINE; non-authenticated connections resolve as OFFLINE.
- `OFFLINE` — every connection uses OFFLINE name-based identity semantics.

See [Player Identity](/concepts/player-identity/) before changing identity mode.

## 5. Add players

Use the cross-platform whitelist command surface:

[Whitelist Administration →](/administration/whitelist/)

For example:

```text
/monban whitelist add online hanamuramiyu <verified-uuid>
/monban whitelist add offline hanamuramiyu2
```

## 6. Verify the installation

- monban loads without a startup error;
- `white-list=false` is still set;
- the configured identity mode matches the server's intended authentication model;
- an expected allowed player can join;
- an expected non-whitelisted player is denied when `whitelist.enabled: true`.
