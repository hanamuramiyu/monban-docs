---
title: Velocity Setup
description: Configure monban with Velocity as the network access authority.
---

Use the Velocity build when the proxy should own network admission and scoped backend access.

<div class="download-actions compact">
  <a class="download-button primary" href="https://modrinth.com/plugin/monban">Download on Modrinth</a>
  <a class="download-button secondary" href="https://github.com/hanamuramiyu/monban/releases">GitHub Releases</a>
</div>

## 1. Install the proxy build

Use:

```text
monban-velocity-<version>.jar
```

Place it in Velocity's `plugins/` directory and start the proxy once. Velocity provides monban with its plugin data directory, normally `plugins/monban/` in a standard installation.

## 2. Configure `config.yml`

The Velocity default is:

```yaml
config-version: 1

deployment:
  mode: VELOCITY

whitelist:
  enabled: false

identity:
  mode: AUTO
  hybrid:
    enabled: false
    dual-entry-preference: ONLINE
```

The complete `identity.hybrid` mapping is required in a Velocity configuration even when `enabled: false`.

See [`config.yml` Reference](/reference/config/).

## 3. Understand the two access layers

Velocity evaluates two distinct concerns:

1. **Network Admission** — the global `NETWORK` whitelist, controlled by `whitelist.enabled`.
2. **Backend Admission** — `OPEN` or `GRANT_REQUIRED` policies for individual backends and server groups.

A player can therefore enter the network and still be denied access to a restricted backend.

## 4. Velocity data files

monban uses these files for the current Velocity access-control surface:

| File | Purpose |
| --- | --- |
| `config.yml` | Deployment, whitelist toggle, identity, hybrid settings |
| `whitelist.yml` | Persistent `NETWORK` grants |
| `server-groups.yml` | Velocity backend grouping |
| `access-grants.yml` | Persistent `SERVER_GROUP` and `SERVER` grants |
| `backend-access.yml` | Backend access modes and overrides |

`server-groups.yml` and `backend-access.yml` receive empty/open defaults when missing. Whitelist and scoped grant storage is created when persistent mutations require it.

## Next steps

<div class="doc-link-grid">
  <a class="doc-link-card" href="/velocity/server-groups/"><strong>Server Groups</strong><span>Build backend groups →</span></a>
  <a class="doc-link-card" href="/velocity/scoped-access/"><strong>Scoped Access</strong><span>Grant backend access →</span></a>
  <a class="doc-link-card" href="/velocity/backend-policies/"><strong>Backend Policies</strong><span>Restrict backends →</span></a>
  <a class="doc-link-card" href="/velocity/hybrid-authentication/"><strong>Hybrid Authentication</strong><span>Select auth flows →</span></a>
</div>
