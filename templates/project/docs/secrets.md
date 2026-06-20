# Secrets Guide

## Never Commit

- `.env`
- `.env.local`
- private keys
- provider tokens
- production exports

## Required Secrets

| Name | Env Var | Environment | Source | Notes |
| --- | --- | --- | --- | --- |
| <secret-name> | `<ENV_VAR>` | local/staging/prod | <where> | <notes> |

## Local Development

Copy `.env.example` to the project-specific local env file and fill values outside git.

## Rotation

- 
