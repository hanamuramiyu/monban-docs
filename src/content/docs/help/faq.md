---
title: FAQ
description: Short answers to common monban access-control questions.
---

## Does monban replace the vanilla whitelist?

On standalone Bukkit/Spigot and Paper/Folia, yes. The native whitelist must be disabled with `white-list=false`, leaving monban as the whitelist authority.

## Can I use `/whitelist` while monban is active?

No. After successful standalone startup, direct `/whitelist`, `/minecraft:whitelist`, and `/bukkit:whitelist` administration is blocked. Use `/monban whitelist`.

## Does monban support cracked/offline players?

Yes. OFFLINE identity is explicit and name-based.

## Does a UUID make a player ONLINE?

No. Authentication provenance determines whether a UUID is trusted as a verified ONLINE identity.

## Can one player have both ONLINE and OFFLINE entries?

Yes. They are distinct identities. On Velocity hybrid deployments, `dual-entry-preference` decides which authentication flow is preferred when both forms match routing state.

## Does disabling the whitelist disable scoped access?

No. `whitelist.enabled: false` disables the global `NETWORK` requirement, not Velocity Backend Admission.

## Can Bukkit/Spigot use Velocity scoped access?

No. The strict Bukkit/Spigot artifact is intended for standalone use.

## Does Paper run hybrid authentication itself?

No. Authentication-flow selection belongs to Velocity. Paper can participate as a forwarded backend in the supported topology.

## Does monban currently provide registration, login, or captcha?

No.

## Does monban currently have temporary grants?

No.
