# Logo Replacement Reference

## Current status: TEMP 2026 LOGO live (swap when final assets arrive)

All ripple-logo references were removed and replaced with a temporary 2026 logo
(user-supplied `HMCC-2026.png` / `HMCC-2026.svg` / `HMCC-2026_1.png`). Every code spot
is live again with the marker `temp 2026 logo — swap when final assets arrive` — grep
for it to re-find everything: `grep -rn "temp 2026 logo" ui/src ui/index.html server`.
The only remaining `logo replacement spot` marker is the commented email header in
`server/views/layouts/layout-email.ejs` (still needs a hosted absolute URL).

## Brand constants

- Brand blue (site): `#4A6EEB` · Temp-2026 navy tile: `#0A387C`
- Title/wordmark font: `DMSerifDisplay-Italic.ttf` (in `ui/src/font/`, loaded in `ui/src/index.css`)

## Current asset files (standardized names — legacy `ripple*` names are obsolete)

| File (under `ui/public/`) | Variant | Used by | Display size |
|---|---|---|---|
| `images/logo.png` | navy tile (white mark on #0A387C), 2400×2400 | MainMenu, HeroSection ×2 | tile sizes below |
| `images/logo.svg` | black vector on transparent | (available; MainMenu uses the PNG tile instead for contrast) | — |
| `images/logo-blue.svg` | navy #0A387C vector on transparent | NavBar (2 spots), Footer, 6 auth pages | w 3.5em / 4em, h 3.5em, h 5–9vh |
| `userProfile/logo-white.png` | white vector on transparent (chroma-keyed) | UserProfile watermark | w 75% |
| `images/logo-lockup.png` | 600×600 "HMCC / HONG KONG / Harvest Mission Community Church" lockup on navy tile | email header (STAGED, not yet referenced) | — |

Favicon set (regenerated from the tile via Pillow; script was `.playwright-mcp/gen-assets.py`,
venv with Pillow in `.playwright-mcp/venv`):

- `ui/public/favicon.png` — 75×75
- `ui/public/apple-touch-icon.png` — 180×180
- `ui/public/logo.png` (root, for manifest) — 512×512 — NOTE: separate from `images/logo.png`
- `ui/public/logo-maskable.png` — 512×512 (mark inside 80% safe zone)
- `ui/public/favicon.ico` — 64/32/24/16 (matches `ui/public/manifest.json` declarations)
- `server/assets/favicon.ico` — same ico (served by the Sails backend site)

### Sermons placeholder (16:9 landscape, not a logo per se)

`ui/public/images/sermons/placeholder.svg` — 1600×900, white bg with the navy vector
mark centered (NO tile, per user decision). Marker comment inside. Referenced by path
in 5 places, so keep the same filename:

- `ui/src/pages/sermons/SermonSeriesCard.js` (fallback when series has no image)
- `ui/src/pages/sermons/RelatedSermonCard.js` (fallback)
- `ui/src/pages/admin/announcements/AdminAnnouncementContainer.js` (`fallbackSrc`, ~line 331)
- `ui/src/pages/admin/sermonNotes/AdminSermonNotesContainer.js` (`fallbackSrc`, ~line 310)
- `ui/src/pages/userProfile/SermonNotesPagination.js` (`FALLBACK_IMAGE` constant)

## All placement spots (current temp state)

| Location | File | Line | Asset | Size |
|---|---|---|---|---|
| Navbar logo | `ui/src/components/NavigationBar/NavBar.js` | 137 | logo-blue.svg | w 3.5em |
| Navbar logo (mobile) | `NavBar.js` | 388 | logo-blue.svg | w 4em |
| Main menu | `ui/src/components/NavigationBar/MainMenu.js` | 28 | logo.png (tile — navy SVG invisible on blue drawer bg) | w 3.5em |
| Footer | `ui/src/components/Footer/Footer.js` | 34 | logo-blue.svg | h 3.5em |
| Login | `ui/src/pages/auth/LoginContainer.js` | 123 | logo-blue.svg | h 5–9vh |
| Signup (container) | `ui/src/pages/auth/SignupContainer.js` | 82 | logo-blue.svg | same pattern |
| Signup (page) | `ui/src/pages/auth/Signup.js` | 203 | logo-blue.svg | same pattern |
| Recover password | `ui/src/pages/auth/RecoverPassword.js` | 72 | logo-blue.svg | same pattern |
| Reset password | `ui/src/pages/auth/ResetPassword.js` | 123 | logo-blue.svg | same pattern |
| Password submitted | `ui/src/pages/auth/PasswordSubmitted.js` | 22 | logo-blue.svg | same pattern |
| User profile watermark | `ui/src/pages/userProfile/UserProfileContainer.js` | 30 | userProfile/logo-white.png | w 75%, absolute top 35% — **outer Box got `position="relative" overflow="hidden"` to fix the footer break** |
| Home hero (desktop) | `ui/src/pages/home/HeroSection.js` | 115 | logo.png (tile) | h/w 2em — keeps `opacity="0"` (pre-existing) |
| Home hero (2nd spot) | `HeroSection.js` | 268 | logo.png (tile) | h/w 2em |
| Favicon set | `ui/index.html` | 19 | favicon files above | see list |
| Email header | `server/views/layouts/layout-email.ejs` | 20 | commented out | needs hosted absolute URL — lockup staged at `ui/public/images/logo-lockup.png`; host at `https://hk.hmccglobal.org/images/logo-email.png` |
| Sermons fallback | `ui/public/images/sermons/placeholder.svg` | — | navy mark on white, no tile | 1600×900 |

## NOT the logo (verified, don't touch)

`shine-logo.png`, `saturate-logo.png`, `PrayerLogo.png` (ministry brands),
`images/home/hk-green.png` + `images/default-hk-background.jpeg` (HK map
backgrounds), `ui/src/logo.svg` (unused React default logo).

## When the FINAL logo arrives

1. Generate the variant set from the designer's master (see brief below) and overwrite
   the standardized filenames above (no code changes needed — same paths).
2. Regenerate the favicon set (Pillow script pattern in `.playwright-mcp/gen-assets.py`).
3. Rebuild `placeholder.svg` from the new mark (keep filename + 1600×900).
4. Host the email lockup PNG (e.g. `https://hk.hmccglobal.org/images/logo-email.png`)
   and un-comment the `layout-email.ejs` header block.
5. `npm run build` in `ui/`; spot-check navbar, footer, hero, MainMenu drawer
   (contrast!), UserProfile (footer break), sermons cards, favicon in tab.
6. Delete the `temp 2026 logo` markers.

## Designer brief (for future branding requests)

Send this when commissioning final logo/branding artwork. 5 deliverables + source file;
everything else (variants, recolors, favicon sizes, email copy) is generated locally
from these. All on transparent background unless noted.

**Brand color: `#4A6EEB` (blue)** — use for all colored versions.

**Master logo (SVG, vector)**
- The core mark on its own, no text.
- Must be a single-color path (one fill we can recolor ourselves to black / brand blue / white).
- Should stay crisp at small sizes (it appears at ~56px in our navigation).

**Favicon version (SVG)**
- A simplified version of the mark that stays legible at 16–32px.
- Square composition (solid background tile is fine, even ideal — Android maskable icons
  want an opaque tile; iOS fills transparency with black anyway).
- Tight viewBox around the mark (SVGs have no resolution; padding just shrinks them).

**Lockup (high-res PNG, transparent)**
- The logo + the words "Harvest Mission Community Church", side by side.
- Wordmark set in our current title font (see Brand constants; **DM Serif Display Italic** —
  free Google Font). May need re-rendering if the site font ever changes.
- ~1200px wide or larger. Used in email headers (must be PNG — email clients don't render SVG).

**Wordmark (SVG, vector, transparent)**
- The text "Harvest Mission Community Church" alone, as vector outlines.
- Lets us compose lockups ourselves if the typeface changes later.

**Sermons placeholder image (JPG, 1600×900)**
- 16:9 landscape, white background with the mark/lockup centered or tastefully placed.

**Please include the editable source file (AI/Figma/Sketch) along with the exports.**

Notes:
- Do NOT ask the designer for recolors or sized exports — single-color-path master +
  source file covers everything; recoloring/sizing is done locally by script.
- Old email "logo" was just a 2020 screenshot hosted at
  `hongkong.sub.hmccglobal.org/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png`
  — a proper lockup replaces it.
