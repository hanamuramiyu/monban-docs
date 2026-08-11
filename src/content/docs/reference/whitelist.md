---
title: whitelist.yml
description: Persistent NETWORK whitelist storage format.
---

`whitelist.yml` is the persistent source of `NETWORK` grants used by the global monban whitelist.

:::caution[Prefer commands for administration]
Prefer `/monban whitelist` for normal operator changes. Persistent files are storage formats, not the primary administration interface.
:::

## Schema

The file uses schema version `1` and an `entries` list.

Example with both identity types:

```yaml
schema-version: 1
entries:
  - type: ONLINE
    name: hanamuramiyu
    verified-uuid: 00000000-0000-0000-0000-000000000000
  - type: OFFLINE
    name: hanamuramiyu2
```

An OFFLINE entry may contain a `technical-uuid` when that technical value has been persisted, but it is not verified account proof and does not participate as the durable OFFLINE identity key.

## Identity fields

### ONLINE

| Field | Required | Meaning |
| --- | :---: | --- |
| `type` | ✓ | `ONLINE` |
| `name` | ✓ | Current username metadata |
| `verified-uuid` | ✓ | Durable verified identity key |

### OFFLINE

| Field | Required | Meaning |
| --- | :---: | --- |
| `type` | ✓ | `OFFLINE` |
| `name` | ✓ | Durable normalized-name identity key |
| `technical-uuid` | <span class="table-muted">—</span> | Optional technical platform value; not identity proof |

## Validation and recovery

The parser rejects malformed YAML, unsupported schema versions, duplicate YAML keys, aliases, unknown fields, and invalid identity records.

Writes use replacement-style persistence with a temporary file. If the primary file is missing and a valid recovery temporary file is present, monban can recover it. A malformed existing primary file remains an error rather than being silently replaced by temporary state.
