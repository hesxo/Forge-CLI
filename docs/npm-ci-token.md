# npm token for GitHub Actions (fix `EOTP`)

If `npm publish` in CI fails with:

```text
npm error code EOTP
npm error This operation requires a one-time password.
```

GitHub Actions cannot open a browser. You must use a token that is allowed to **publish without OTP**.

## 1. npm account: allow automation tokens

1. On [npmjs.com](https://www.npmjs.com/), open **Account** → **Publishing access** (or package security settings).
2. Choose **Require two-factor authentication or a granular access token with bypass 2FA enabled**.
3. Do **not** choose “disallow tokens” for publishes.

## 2. Create the right token

On **Access Tokens** (under your npm profile):

- Prefer **Automation** (classic) if npm still offers it — meant for CI, no OTP on publish.
- Or create a **Granular access token** with:
  - Read + write (publish) for `@hesxo/forge-cli` (or “all packages” if you use that).
  - **Bypass 2FA** enabled for that token (wording may vary).

Do **not** use a token created only via the interactive `npm login` / browser OTP flow for CI.

## 3. Put it in GitHub

Because the workflow uses `environment: release`, add the secret in **one** of these places (same name in both is fine; environment secrets override if both exist):

- Repo → **Settings** → **Secrets and variables** → **Actions** → `NPM_TOKEN`
- Or **Environments** → **release** → **Environment secrets** → `NPM_TOKEN`

## 4. Retry the workflow

Bump `package.json` version if that version was already attempted, then push a tag or re-run the workflow.

## `always-auth` warning

That is a separate npm deprecation warning from user/global `.npmrc`. It does not cause `EOTP`.
