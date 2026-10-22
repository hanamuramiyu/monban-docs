---
title: backend.yml (Legacy)
description: Legacy backend configuration retained for older installations.
---

Current builds do not read `backend.yml`. Configure backend synchronization in `config.yml` instead.

Old shape:

```yaml
schema-version: 1
server-name: survival
```

Current shape:

```yaml
backend-permissions:
  enabled: true
  server-name: survival
```

The backend also needs the shared [`sync.yml`](/reference/sync/). See [Backend Synchronization](/concepts/backend-sync/).
