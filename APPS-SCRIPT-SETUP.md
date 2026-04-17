# Apps Script Setup

One-time setup for the contact form backend.

---

## Google Apps Script (form backend)

### 1. Create a Google Sheet to store leads

1. Go to [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**
2. Name it `IguanAI Leads`
3. Leave it open — you'll come back to it

### 2. Open the Script Editor

1. In the sheet: **Extensions → Apps Script**
2. Delete the default `myFunction()` placeholder
3. Copy the entire contents of `Code.gs` (in this repo) and paste it in
4. Click **Save** (floppy disk icon) → name the project `IguanAI Contact Form`

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

Open `main.js` and replace `YOUR_APPS_SCRIPT_URL` with your deployment URL.

### 5. Test it

Open your site, submit the form → confirm:
- [ ] Email arrives at `info@iguanai.us`
- [ ] A new row appears in the `IguanAI Leads` sheet

### Re-deploying after code changes

If you ever edit `Code.gs` you must re-deploy:
**Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**
The URL stays the same — no change needed in `main.js`.

---

## Email setup (already complete)

- **Domain:** `iguanai.us` registered and managed on Cloudflare
- **Inbound:** Cloudflare Email Routing forwards `info@iguanai.us` → `caufield.peterj@gmail.com`
- **Outbound:** Gmail "Send as" configured via `smtp.gmail.com` with an App Password
- **Result:** You receive form submissions at `info@iguanai.us` in Gmail and can reply from that address

---

## Checklist

- [x] Cloudflare Email Routing active for `info@iguanai.us`
- [x] Gmail "Send as" configured for `info@iguanai.us`
- [x] Apps Script deployed and URL set in `main.js`
- [x] `NOTIFY_EMAIL` in `Code.gs` set to `info@iguanai.us`
- [ ] Re-deploy Apps Script after any changes to `Code.gs`
