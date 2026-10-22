---
title: Restrict a Backend
description: Keep a public lobby while requiring a grant for a testing group.
---

Target:

```text
lobby        OPEN
testing
├── test-lobby      GRANT_REQUIRED
└── test-survival   GRANT_REQUIRED
```

## 1. Define the server group

`server-groups.yml`:

```yaml
schema-version: 1
groups:
  - id: testing
    servers:
      - test-lobby
      - test-survival
```

## 2. Require a grant

`backend-access.yml`:

```yaml
schema-version: 1
default: OPEN
policies:
  - scope:
      type: SERVER_GROUP
      id: testing
    mode: GRANT_REQUIRED
```

The lobby inherits `OPEN`. Both testing backends inherit `GRANT_REQUIRED`.

## 3. Grant a player

```text
/monban access grant group testing online hanamuramiyu <verified-uuid>
```

For a Bedrock player:

```text
/monban access grant group testing floodgate .BedrockName
```

## 4. Verify

- An ungranted player can enter the lobby.
- The same player cannot switch to a testing backend.
- The granted player can enter both testing backends.
- `/monban access list group testing` shows the grant.

If the player cannot enter the proxy at all, check `NETWORK` admission first. If the proxy accepts the login but the backend switch fails, check this policy and grant.
