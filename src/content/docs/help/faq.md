---
title: FAQ
description: Direct answers to common monban questions.
---

## Does monban replace the vanilla whitelist?

On a standalone Bukkit, Spigot, Paper, or Folia server, yes. Set `white-list=false` so monban is the only whitelist authority.

## Can I still use `/whitelist`?

After successful startup, monban blocks native whitelist administration and directs operators to `/monban whitelist`. On Velocity it registers a guard for the same command labels when they are free.

## Does monban support cracked or offline players?

Yes. Use an `OFFLINE` identity. Matching is based on the normalized username and does not prove account ownership.

## Does a UUID make a player ONLINE?

No. The platform's authentication provenance determines whether the UUID is trusted as `ONLINE`. A technical UUID on an offline connection remains metadata.

## What is a FLOODGATE identity?

It is an authenticated Bedrock identity resolved through Floodgate on Velocity. Its key is the normalized Floodgate Java username; for unlinked accounts that is normally the server-visible name with the configured prefix. XUID is optional metadata.

## Does Floodgate work on Paper or Bukkit?

No. Floodgate identity resolution belongs to the Velocity build. A backend can receive synchronized permissions for Java identities, but it does not create a second Floodgate authority or match Floodgate grants locally.

## Is Floodgate enabled by default?

No. Set `identity.floodgate.enabled: true` only on a Velocity network that uses Geyser and Floodgate.

## Can one player have ONLINE and OFFLINE entries?

Yes. They are separate identities. A hybrid Velocity deployment can use both to choose an authentication flow, but the final admission decision uses the identity produced by that flow.

## Does disabling the whitelist disable backend restrictions?

No. `whitelist.enabled: false` removes only the global `NETWORK` requirement. `GRANT_REQUIRED` backend policies still apply.

## Can a backend have its own whitelist?

Not in centralized mode. Administer whitelist, groups, and permissions on Velocity and synchronize the resulting state to participating backends.

## Do Floodgate permissions reach backend plugins?

Not in 3.3.0. Velocity evaluates Floodgate groups and direct permissions for admission and proxy permissions. A Bukkit or Paper backend resolves only Java `ONLINE` and `OFFLINE` identities, so it does not apply those entries as a local permission attachment. Keep permission-controlled features for Bedrock players on the proxy, or use a backend permissions plugin with its own Bedrock-aware integration.

## Does monban require LuckPerms?

No. monban can attach its own permission nodes on Bukkit and Paper. It can coexist with another permission provider, but monban's nodes do not require LuckPerms.

## Does monban support deny grants or temporary grants?

No. The current model has positive grants only, with no expiry or deny precedence.

## Does monban provide registration, passwords, or captcha?

No.

## Why can a player join the proxy but not a backend?

The player passed `NETWORK` admission and then hit a `GRANT_REQUIRED` backend policy without a matching `SERVER` or `SERVER_GROUP` grant. See [Backend Policies](/velocity/backend-policies/).
