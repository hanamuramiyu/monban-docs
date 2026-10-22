---
title: sync.yml
description: Shared secret for signed Velocity-to-backend state synchronization.
---

`sync.yml` authenticates state sent from Velocity to a participating backend. Velocity generates it when `backend-permissions.enabled: true`.

```yaml
schema-version: 1
secret: <base64-secret>
```

Copy the exact same value to every backend that should accept the state. The decoded secret must be 16–128 bytes. The channel uses HMAC-SHA256 signatures and rejects invalid signatures and stale revisions.

## Security rules

- Keep the file private and out of source control.
- Use the same secret only across the intended network.
- Rotate by updating every participant together.
- Do not copy `state-revision`; Velocity owns that file.

When `backend-permissions.enabled: true`, a missing file prevents backend startup. After a valid startup, the backend exposes no synchronized monban permissions until it accepts a valid snapshot. A mismatched secret causes the snapshot to be rejected; it does not open a local fallback path.
