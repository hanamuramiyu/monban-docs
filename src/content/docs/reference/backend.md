---
title: backend.yml (legacy)
description: Legacy backend configuration reference.
---

New installations must configure backend permissions in `config.yml`. This file is retained only as a reference for older installations and is no longer read by current builds.

```yaml
schema-version: 1
server-name: survival
```

Use this current configuration instead:

```yaml
backend-permissions:
  enabled: true
  server-name: survival
```

The backend also needs [`sync.yml`](/reference/sync/) with the same secret as Velocity. `backend-permissions.enabled: false` leaves the instance standalone.
