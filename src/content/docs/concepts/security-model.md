---
title: Security Model
description: Trust boundaries, failure behavior, and operator responsibilities in monban.
---

monban is an access-control component, not a complete server security product. It is useful only when the platform authentication path, forwarding configuration, and operator permissions are also correct.

## Trust boundaries

| Boundary | Trusted input | monban's response |
| --- | --- | --- |
| Minecraft client to platform | Platform authentication result | Resolve an explicit identity |
| Proxy to backend | Velocity forwarding configuration | Use the forwarded identity and synchronized state |
| Velocity to backend | HMAC-signed state snapshot | Reject invalid signatures and stale revisions |
| Operator to stored files | Strict YAML and validated topology | Reject malformed or contradictory state |

The client is never trusted to declare its own identity type. A UUID by itself is not proof of account ownership.

## Identity controls

- `ONLINE` records match a verified Java UUID.
- `OFFLINE` records match a normalized name and intentionally do not prove ownership.
- `FLOODGATE` records match the normalized Floodgate Java username that monban receives.
- `identity.mode` never creates an `ONLINE` identity from an unauthenticated connection.
- Hybrid flow selection does not authenticate the player; Velocity still performs the selected flow.

## Fail-closed behavior

monban denies admission while admission-critical state is not ready. Examples include:

- startup guard active after initialization failure;
- unknown Velocity backend references;
- malformed or unsupported configuration;
- a required Floodgate provider that is unavailable;
- a Floodgate provider error during login.

Backend synchronization is fail-closed at the permission layer. A configured backend exposes no synchronized monban nodes until it accepts a valid snapshot. It does not add another admission gate; network and backend admission remain Velocity decisions.

Fail-closed behavior is deliberate. Do not “fix” it by disabling a guard unless the underlying trust boundary is also being removed.

## Secret handling

`sync.yml` is a shared credential. Anyone who can sign state for the channel can impersonate the proxy to a participating backend.

- Keep `sync.yml` out of Git and public backups.
- Restrict access to `plugins/monban/`.
- Rotate the secret by updating all participants together.
- Do not reuse the secret outside this network.
- Keep Floodgate's `key.pem` private as well.

## Threat examples

| Threat | Relevant control |
| --- | --- |
| A cracked client claims a licensed name | Use `ONLINE` or authenticated Floodgate identity; `OFFLINE` cannot distinguish impostors |
| A stale backend snapshot grants outdated permissions | Signed revisions and rejection of older state |
| A typo silently opens a backend | Strict topology validation and fail-closed startup |
| A backend accepts an unforwarded player | Correct Velocity forwarding and backend network isolation |
| An operator accidentally edits state | Commands, atomic writes, strict file validation, and backups |

## Operator responsibilities

- Keep the native standalone whitelist disabled.
- Do not expose backend ports that should be reachable only through Velocity.
- Grant command permissions narrowly.
- Review effective state with lookup and logs after changes.
- Back up access state and `sync.yml` securely.
- Test upgrades in a staging network before changing production.

## Out of scope

monban does not provide passwords, registration, anti-cheat, malware protection, DDoS mitigation, host hardening, or protection against a compromised proxy, backend, plugin, or operator account. Use the platform and hosting layers for those controls.
