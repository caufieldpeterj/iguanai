# Apps Script + Cloudflare Email Setup

Two one-time steps. Total time: ~20 minutes.

---

## Part 1 — Google Apps Script (form backend)

### 1. Create a Google Sheet to store leads

1. Go to [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**
2. Name it `IguanAI Leads`
3. Leave it open — you'll come back to it

### 2. Open the Script Editor

1. In the sheet: **Extensions → Apps Script**
2. Delete the default `myFunction()` placeholder
3. Copy the entire contents of `Code.gs` (in this repo) and paste it in
4. Update line 4 with your email address:
   ```
   var NOTIFY_EMAIL = 'hello@iguanai.com';
   ```
   (Use your personal Gmail for now — swap to the custom address after Part 2)
5. Click **Save** (floppy disk icon) → name the project `IguanAI Contact Form`

### 3. Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Type" → select **Web app**
3. Fill in:
   - Description: `IguanAI Contact Form`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. If prompted, click **Authorize access** → pick your Google account → Allow
6. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### 4. Wire it into the site

Open `main.js` and replace line 4:
```js
const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL';
```
with:
```js
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```

### 5. Test it

Open your site locally, submit the form → check:
- [ ] Email arrives in your inbox
- [ ] A new row appears in the `IguanAI Leads` sheet

### Re-deploying after code changes

If you ever edit `Code.gs` you must re-deploy:
**Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**
The URL stays the same — no change needed in `main.js`.

---

## Part 2 — Custom email with Cloudflare (free)

Get `hello@iguanai.com` forwarding to your personal Gmail, with the ability
to reply from that address. Zero cost beyond the domain itself.

### 1. Add your domain to Cloudflare (if not already there)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Add a site** → enter `iguanai.com`
2. Choose the **Free plan**
3. Cloudflare scans your existing DNS — confirm the records look right
4. At your registrar (Namecheap, GoDaddy, etc.) update the nameservers to
   the two Cloudflare gives you (e.g. `aria.ns.cloudflare.com`)
5. Wait up to 24 hrs for nameserver propagation (usually under 1 hr)

### 2. Enable Email Routing

1. In Cloudflare: **Email → Email Routing → Enable Email Routing**
2. Cloudflare adds the required MX records automatically
3. Under **Routing rules → Custom addresses**:
   - Address: `hello@iguanai.com`
   - Action: **Send to** → your personal Gmail address
4. Cloudflare sends a verification email to your Gmail — click **Verify**

Test: send an email to `hello@iguanai.com` — it should arrive in your Gmail inbox.

### 3. Reply from hello@iguanai.com in Gmail

1. In Gmail: **Settings (gear) → See all settings → Accounts and Import**
2. Under **Send mail as** → **Add another email address**
3. Enter `hello@iguanai.com` → **Next Step**
4. Gmail will send a confirmation code to `hello@iguanai.com`
   (which now forwards to you) — enter the code
5. Done. When replying to a contact-form email, switch the "From" dropdown
   to `hello@iguanai.com`

### 4. Update Apps Script

Once forwarding is confirmed, update `Code.gs` line 4:
```js
var NOTIFY_EMAIL = 'hello@iguanai.com';
```
Then re-deploy (see Step 5 in Part 1 above).

---

## Checklist before going live

- [ ] Apps Script deployed and URL in `main.js`
- [ ] Test submission lands in Sheet + inbox
- [ ] Cloudflare Email Routing verified
- [ ] Gmail "Send as" confirmed
- [ ] `NOTIFY_EMAIL` in `Code.gs` updated to `hello@iguanai.com` and re-deployed
