# LIVGolf4Sale.com

A small 1990s-style under-construction page, with a link to twelvefs.com.

This is a standalone static site. It is intended for its own repository, ejstover/livgolf4sale, alongside the existing ejstover/twelvefsblog repository. It does not change the blog or its custom domain.

## GitHub Pages

1. Create the public repository ejstover/livgolf4sale.
2. Put these files at the repository root on main, including the empty .nojekyll file.
3. Under Settings → Pages, select Deploy from a branch, then main and / (root), and save.
4. Set the Pages custom domain to livgolf4sale.com. The CNAME file is included for this setting.
5. Set the Squarespace DNS records below. Once GitHub provisions the certificate, enable Enforce HTTPS.

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ejstover.github.io |

These records apply only to livgolf4sale.com. Preserve the blog's twelvefs.com settings. Replace conflicting apex web records and the previous www web record, while preserving unrelated email and verification records. Disable a Squarespace forwarding rule for these names if one has been added.

These GitHub Pages records supersede the earlier ChatGPT Sites DNS instructions. Do not point the domain to both providers. GitHub Pages will redirect www.livgolf4sale.com to livgolf4sale.com after both names are configured. DNS and HTTPS provisioning can take up to 24 hours.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Files

- index.html — self-contained page with inline styles and original roadwork illustration.
- favicon.svg — original construction sign icon.
- CNAME — custom domain for GitHub Pages.
- .nojekyll — serves these files directly without a Jekyll build.

No build step, package installation, payments, or analytics are required. The page is independent and unaffiliated with LIV Golf.
