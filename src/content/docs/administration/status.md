---
title: Status
description: Read the current Velocity monban access-control summary.
---

`/monban status` is available on **Velocity only**.

## Permission

```text
monban.command.status
```

## Command

```text
/monban status
```

The status view reports loaded runtime state useful for understanding the current access-control installation:

- deployment mode;
- global whitelist enabled/disabled state;
- identity mode;
- hybrid enabled/disabled state and active preference when enabled;
- Velocity global `online-mode`;
- total access-grant count and counts for `NETWORK`, `SERVER_GROUP`, and `SERVER`;
- server-group count;
- backend policy default and explicit policy counts.

The command is intentionally an operator summary. It does **not** expose forwarding secrets, player UUID listings, active session lists, CPU/RAM/uptime metrics, or a synthetic health-check verdict.
