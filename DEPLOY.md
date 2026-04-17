# Deploy to GitHub Pages (Free)

## One-time setup (~5 minutes)

1. **Create a GitHub repo** at github.com → New repository
   - Name it `iguanai` or `iguanai.github.io`
   - Set to Public (required for free GitHub Pages)

2. **Push this folder:**
   ```bash
   cd /Users/petercaufield/Desktop/IguanAI
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
   - Click Save

4. **Your site goes live at:**
   `https://YOUR_USERNAME.github.io/REPO_NAME`

## Custom domain (optional, still free)

1. Buy a domain (e.g. iguanai.us via Namecheap ~$10/yr)
2. In your domain DNS, add a CNAME record:
   - Host: `www`  →  Value: `YOUR_USERNAME.github.io`
3. In GitHub Pages settings, set your custom domain to `www.iguanai.us`
4. Check "Enforce HTTPS"

## Update the site later

```bash
git add .
git commit -m "Update content"
git push
```
GitHub Pages redeploys automatically within ~60 seconds.

## Before going live — checklist

- [ ] Replace `info@iguanai.us` in `main.js` with your real email
- [ ] Update the LinkedIn URL in `index.html` footer if needed
- [ ] Test the contact form
- [ ] Check on mobile
