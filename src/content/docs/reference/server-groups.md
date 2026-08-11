---
title: server-groups.yml
description: Schema and validation reference for Velocity server groups.
---

`server-groups.yml` defines named Velocity backend groups used by scoped grants and backend policies.

A missing file is created as:

```yaml
schema-version: 1
groups: []
```

## Schema

```yaml
schema-version: 1
groups:
  - id: testing
    servers:
      - test-lobby
      - test-survival
```

| Field | Type | Rules |
| --- | --- | --- |
| `schema-version` | integer | Must be `1` |
| `groups` | list | List of group objects |
| `groups[].id` | string | Must match `[a-z0-9][a-z0-9._-]{0,63}` |
| `groups[].servers` | list of strings | Non-blank, unpadded Velocity backend references |

## Validation

The file rejects:

- unsupported schema versions;
- unknown fields;
- duplicate YAML keys or aliases;
- duplicate group IDs;
- a duplicate server inside one group;
- the same server appearing in multiple groups;
- blank or padded server names.

Velocity startup additionally resolves every server reference against the configured proxy topology. Unknown backends fail startup. Runtime state uses Velocity's canonical backend names after successful resolution.

For the operator workflow, see [Server Groups](/velocity/server-groups/).
