# LIV Instant Messenger

Independent golf satire for livgolf4sale.com. Original retro messenger interface, fictional screen names and status messages, and separately sourced roster classifications.

## Editing

- `players.js`: names, presence, fictional messages, factual notes, source URLs and checked dates. Online means publicly stated intent to stay, not a signed-contract claim. Unverified or conflicting decisions remain Idle. Offline includes verified voluntary exits, not relegation or being dropped. Cantlay stays in Lurkers.
- `index.html`, `styles.css`, `app.js`: buildless interface. No dependencies, analytics, accounts, messages or payment collection.
- `favicon.svg`: original pixel golf illustration.
- `archive/under-construction/`: previous holding page and icon.

The roster snapshot was checked October 26, 2026 against Golf Channel, Golf Digest, Golf Monthly, GolfMagic and the official LIV season roster. Reconcile the newer player-specific reporting before moving a buddy. Keep sources and checked dates current; a season roster alone is not evidence of a 2.0 commitment.

## Hosting

GitHub Pages serves `main` from `/` in `ejstover/livgolf4sale`. Preserve `CNAME` (`livgolf4sale.com`) and `.nojekyll`. Do not modify the separate blog repository or its domain.

Squarespace DNS: apex A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; `www` CNAME `ejstover.github.io`. HTTPS issuance is managed separately by GitHub Pages.

## Local preview and acceptance

Run `python -m http.server 8765 --bind 127.0.0.1` in this folder and open http://127.0.0.1:8765/.

Check 5 online / 39 idle / 16 offline / 1 lurker, Richard Bland selected initially, alphabetical groups, source links, search, collapse controls, keyboard focus and selection, mobile without nested scrolling, and native share with clipboard/manual-copy fallbacks. Honor reduced motion. No blog link or active fundraiser should appear.

## Screen names and away messages

All 61 players have a personal screen-name reference recorded in `players.js` as `usernameOrigin` for editors. The handles refer to nicknames, career moments, college backgrounds, name puns or the owner's supplied podcast lore, rather than LIV departure status. Away messages are original fictional AIM-era verse. Creative reference: https://www.reddit.com/r/nostalgia/comments/urxw2g/aim_away_messages/ . No song lyrics are reproduced.

Cantlay appears once inside the ordinary collapsible Lurkers group as PattyIceCapital, with a static green dot. The former attendance line and separate lurker panel are removed. His fictional message carries the distressed-assets joke without explanatory reporting text. Sharing remains in the menu; the promotional forwarding window is removed.

