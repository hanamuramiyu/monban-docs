---
title: Status
description: Read a concise runtime summary from the Velocity access authority.
---

`/monban status` is available on Velocity and requires `monban.command.status`.

```text
/monban status
```

The summary reports:

- deployment mode;
- global whitelist state;
- identity mode;
- hybrid state and dual-entry preference;
- Velocity global `online-mode`;
- grant counts for `NETWORK`, `SERVER_GROUP`, and `SERVER`;
- server-group and backend-policy counts.

It is a configuration and topology view. It does not list player UUIDs, active sessions, memory or CPU usage, or forwarding secrets, and it does not claim to perform a synthetic health check.

For a player-specific view, use [Lookup](/administration/lookup/). For startup failures, inspect the proxy log and [Troubleshooting](/help/troubleshooting/).
