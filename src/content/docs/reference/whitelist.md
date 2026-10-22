---
title: whitelist.yml
description: Persistent NETWORK whitelist storage in monban 3.3.0.
---

`whitelist.yml` stores direct `NETWORK` grants. Prefer `/monban whitelist` for changes; this page documents the storage format and recovery behavior.

## Schema

```yaml
schema-version: 1
entries:
  - type: ONLINE
    name: hanamuramiyu
    verified-uuid: 00000000-0000-0000-0000-000000000000
  - type: OFFLINE
    name: hanamuramiyu2
  - type: FLOODGATE
    name: .BedrockName
    xuid: '2535421234567890'
```

## Identity fields

| Type | Required fields | Optional fields | Durable key |
| --- | --- | --- | --- |
| `ONLINE` | `type`, `name`, `verified-uuid` | — | Verified UUID |
| `OFFLINE` | `type`, `name` | `technical-uuid` | Normalized name |
| `FLOODGATE` | `type`, `name` | `xuid` | Normalized Floodgate name |

`technical-uuid` is platform metadata, not proof of Java account ownership. `xuid` is Bedrock metadata, not the Floodgate matching key.

## Validation

The file rejects malformed YAML, multiple documents, YAML aliases, duplicate keys, unknown fields, unsupported schema versions, invalid identities, and duplicate equivalent entries.

## Persistence and recovery

Writes use a temporary sibling file and replacement-style persistence. If the primary file is absent and a valid `whitelist.yml.tmp` exists, monban can recover it. A malformed primary file remains an error and is not silently replaced.
