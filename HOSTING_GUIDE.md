# 🚀 Complete Hosting & Deployment Guide for Shristi Tech Website

This guide walks you through hosting and deploying your **Shristi Tech** website (`shristi-tech`) from scratch to production.

---

## 📋 Table of Contents
1. [Overview & Build Output](#1-overview--build-output)
2. [Prerequisites](#2-prerequisites)
3. [Quickest Options (Recommended)](#3-quickest-options-recommended)
   - [Method A: Vercel (1-Click, Best Performance)](#method-a-deploy-to-vercel-recommended)
   - [Method B: Netlify (Git or Drag-and-Drop)](#method-b-deploy-to-netlify)
   - [Method C: Cloudflare Pages (Free & Ultra Fast)](#method-c-deploy-to-cloudflare-pages)
   - [Method D: GitHub Pages (Free with your repository)](#method-d-deploy-to-github-pages)
   - [Method E: Firebase Hosting](#method-e-deploy-to-firebase-hosting)
4. [Traditional Hosting (cPanel / Apache / Nginx VPS)](#4-traditional-hosting-cpanel--vps)
5. [Connecting a Custom Domain (e.g. shristitech.com)](#5-connecting-a-custom-domain)
6. [Pre-configured SPA Routing Files in this Repo](#6-pre-configured-spa-routing-files)
7. [Troubleshooting Common Issues](#7-troubleshooting)

---

## 1. Overview & Build Output

This project is built using:
- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4

### How it builds:
Running the build command compiles your code into lightweight static HTML, CSS, JavaScript, and optimized media assets:
```bash
npm run build
```
This generates a production folder named **`dist/`**. **This `dist/` directory is what gets hosted on the web.**

---

## 2. Prerequisites

Make sure you have:
1. **Node.js** (v18 or higher installed on your computer). Check via:
   ```bash
   node -v
   npm -v
   ```
2. Your project files uploaded to a **GitHub / GitLab / Bitbucket** repository (recommended for automated deployments).

---

## 3. Quickest Options (Recommended)

### Method A: Deploy to Vercel (Recommended)
Vercel provides automatic deployments every time you push code, free SSL certificates, and global edge CDN.

#### Option A1: Via the Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com) and create a free account (sign in with GitHub).
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository for this project.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**.
6. In ~30 seconds, your site will be live at a URL like `shristi-tech.vercel.app`!

#### Option A2: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
# When ready for production:
vercel --prod
```

---

### Method B: Deploy to Netlify

#### Option B1: Git-Connected Deploy (Continuous Delivery)
1. Go to [netlify.com](https://netlify.com) and log in.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Connect your GitHub account and select your repository.
4. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**.

#### Option B2: Instant Manual Drag-and-Drop (No Git Required)
1. In your local terminal, build the project:
   ```bash
   npm install
   npm run build
   ```
2. In Netlify, navigate to **Sites** → scroll down to the drag-and-drop zone.
3. Drag the **`dist`** folder from your computer and drop it into Netlify.
4. Your website will be live in 10 seconds.

---

### Method C: Deploy to Cloudflare Pages
Cloudflare Pages provides unlimited bandwidth and ultra-low latency worldwide.

1. Sign up or log in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Choose your repository.
4. In the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

---

### Method D: Deploy to GitHub Pages

To deploy for free directly from your GitHub repository:

1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add these scripts to your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. If hosting at `username.github.io/repo-name/`, update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/<repo-name>/', // or '/' if custom domain / user root
     // ...
   });
   ```
4. Run:
   ```bash
   npm run deploy
   ```
5. In your GitHub repository settings, go to **Settings** → **Pages** and verify the source is set to the `gh-pages` branch.

---

### Method E: Deploy to Firebase Hosting

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```
   - Choose: **Use an existing project** (or create a new one).
   - What do you want to use as your public directory? Type: `dist`
   - Configure as a single-page app (rewrite all urls to /index.html)? Type: `Yes`
   - Set up automatic builds and deploys with GitHub? Type: `No` (or Yes if desired).
3. Build and deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---

## 4. Traditional Hosting (cPanel / VPS)

If you are using GoDaddy, Hostinger, Bluehost, Namecheap, or any shared cPanel hosting:

### Step 1: Build the site locally
Run on your computer:
```bash
npm install
npm run build
```
This will generate the `dist` folder.

### Step 2: Upload files via cPanel File Manager or FTP
1. Log in to your cPanel dashboard.
2. Open **File Manager** and navigate to `public_html/` (or your subdomain directory).
3. Upload all the contents **inside** the `dist/` folder (not the `dist` folder itself):
   - `index.html`
   - `assets/` folder
   - `_redirects` or `.htaccess`
4. If Apache is your web server, make sure an `.htaccess` file exists inside `public_html/` to support client-side routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### If using an Nginx VPS (Ubuntu/Debian):
Add this to your server configuration block:
```nginx
server {
    listen 80;
    server_name shristitech.com www.shristitech.com;
    root /var/www/shristi-tech/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 5. Connecting a Custom Domain

To link your own domain (e.g., `shristitech.com` or `www.shristitech.com`):

1. **In Vercel / Netlify / Cloudflare**:
   - Go to **Project Settings** → **Domains**.
   - Type your custom domain name (e.g., `shristitech.com`).
2. **In your Domain Registrar (GoDaddy, Namecheap, Cloudflare, Google Domains/Squarespace)**:
   - Add the DNS records shown by your hosting provider:
     - For Apex Domain (`shristitech.com`):
       - **Type**: `A`
       - **Host**: `@`
       - **Value**: Provider's IP (e.g. `76.76.21.21` for Vercel)
     - For Subdomain (`www.shristitech.com`):
       - **Type**: `CNAME`
       - **Host**: `www`
       - **Value**: Provided CNAME (e.g. `cname.vercel-dns.com` for Vercel or your netlify subdomain)
3. SSL certificates (HTTPS) are provisioned **automatically for free** by Vercel, Netlify, and Cloudflare Pages within 5–15 minutes.

---

## 6. Pre-configured SPA Routing Files

We have already added the following configuration files to your repository:
- **`vercel.json`**: Rewrites all routes to `/index.html` on Vercel so page refreshes and direct links never 404.
- **`public/_redirects`**: Ensures Netlify routes all deep paths cleanly to `index.html`.

---

## 7. Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| **404 Not Found on Page Refresh** | Web server is looking for a physical file matching the route. | Ensure `vercel.json` (for Vercel) or `_redirects` (for Netlify) or `.htaccess` (for Apache) is present. |
| **Blank white screen after deploy** | Asset path misconfiguration. | Ensure `base: './'` or `base: '/'` is set properly in `vite.config.ts`. In our setup, standard root path `/` is configured. |
| **Images or Logo missing** | Relative path issue. | All public assets are stored in the `/public` directory so they are copied directly into the root of `dist/` during build. |
| **Node.js version mismatch** | Hosting provider using legacy Node 14/16. | Set Node.js version to `18.x` or `20.x` in your hosting dashboard settings (e.g., Environment Variable `NODE_VERSION=20`). |

---

### Quick Terminal Cheat-Sheet
```bash
# 1. Install dependencies
npm install

# 2. Test locally
npm run dev

# 3. Create production bundle
npm run build

# 4. Preview the production bundle locally before deploying
npm run preview
```
