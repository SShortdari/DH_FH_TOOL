[README.md](https://github.com/user-attachments/files/29841045/README.md)
# Dau Hang Item Appraiser — Deployment Guide

This folder has everything needed for a real, public website:

```
dauhang-appraiser-site/
  index.html        <- the app your employees will see and use
  api/appraise.js    <- tiny backend that keeps your API key secret
```

Follow these steps in order. No coding experience needed beyond copy-paste.
Total time: ~20-30 minutes the first time.

---

## Step 1 — Get an Anthropic API key (separate from your claude.ai account)

1. Go to **console.anthropic.com** and sign up (email or Google).
2. In the left sidebar, click **Settings → API Keys**.
3. Click **Create Key**, name it something like `dauhang-appraiser-prod`, and copy the key
   (it starts with `sk-ant-...`). You will NOT be able to see it again — if you lose it,
   just make a new one.
4. Go to **Settings → Billing** and add a payment card. This API is pay-per-use, not
   covered by a claude.ai subscription. For a beta test with a handful of employees
   trying it occasionally, costs are typically small (a few dollars), but it's real
   metered billing, not free — keep an eye on usage the first week.

Keep this key somewhere private for now (a notes app is fine, just don't paste it into
any code file or share it in Slack/email).

---

## Step 2 — Put the code on GitHub

1. Go to **github.com** and sign up if you don't have an account (free).
2. Click **New repository**. Name it `dauhang-appraiser`. Keep it **Private** if you'd
   rather your code not be public (the app itself can still be a public website even if
   the code repo is private).
3. Click **Add file → Upload files**, and drag in all 3 files from this folder
   (`index.html`, and the `api` folder with `appraise.js` inside it — GitHub will keep
   the folder structure if you drag the whole `api` folder in).
4. Click **Commit changes**.

---

## Step 3 — Deploy on Vercel

1. Go to **vercel.com** and sign up using your GitHub account (this makes Step 3 much
   easier since it can import directly).
2. Click **Add New... → Project**.
3. Find and **Import** the `dauhang-appraiser` repo you just created.
4. Before clicking Deploy, expand **Environment Variables** and add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste the `sk-ant-...` key from Step 1
5. Click **Deploy**. Wait about a minute.
6. You'll get a live URL like `dauhang-appraiser.vercel.app` — this is your real,
   public website.

---

## Step 4 — Test it

1. Open the URL on your phone or laptop.
2. Go through the staff gate, pick a branch, try identifying a real item.
3. If you get an error mentioning `ANTHROPIC_API_KEY`, double check Step 3.4 — the
   environment variable name must match exactly (all caps, no typos), and you need to
   **redeploy** after adding/changing an environment variable (Vercel's dashboard has a
   "Redeploy" button — it doesn't apply automatically to a variable added after the
   first deploy).

---

## Making future changes

Whenever I (or you) edit `index.html` or `api/appraise.js`, just upload the new version
to the same GitHub repo (GitHub's web UI lets you edit or replace a file directly, no
git commands needed). Vercel automatically redeploys within a minute or two of any
change to the repo — no extra steps.

---

## Sharing with employees

Just send them the `.vercel.app` link (or set up a custom domain later, e.g.
`appraiser.dauhang.com`, from the Vercel project's Domains settings). No Claude account,
no login, and no separate app install needed — it's a normal website.
