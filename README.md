# Melody — Spotify-Inspired Music Player

A responsive music streaming interface built with **HTML, CSS and vanilla JavaScript**. This is an independent learning project inspired by common music player layouts; it is not affiliated with Spotify or YouTube.

## Playback Method — YouTube IFrame Player API

Melody embeds the **YouTube IFrame Player API** inside the page. When you select a track, the matching official YouTube video loads in a small floating panel above the player bar and plays directly within Melody — no new tabs are opened.

### Why YouTube IFrame?
- **Authorized**: The YouTube IFrame API is a publicly available, terms-compliant embedding API. Embedding publicly available YouTube videos is permitted under YouTube's standard Terms of Service for web projects.
- **No API key needed**: Basic embedding does not require a server or YouTube Data API key.
- **No login required**: Visitors do not need a Google or YouTube account.
- **No DRM bypass**: Only publicly available official uploads are used.

---

## Music Catalogue (19 tracks)

### Kannada / Sandalwood (9 tracks)

| # | Title | Artist | YouTube ID | Source |
|---|-------|---------|------------|--------|
| 1 | Soul of Dia | Sanjith Hegde | `3V-wb9EZCZk` | Paramvah Music |
| 2 | Marali Manasaagide | Sanjith Hegde | `01uRBlLAjFg` | Anand Audio |
| 3 | Puttamalli | Sanjith Hegde | `kxeWpi3_xT0` | Anand Audio |
| 4 | Kaagadada Doniyalli | Vasuki Vaibhav | `EtGh9oC2SZ0` | Paramvah Music |
| 5 | Arere Avala Naguva | Vasuki Vaibhav | `fclPhO1FsOY` | Official channel |
| 6 | Tulasi | Sumedh K | `Y8ZApXcnhy4` | Sumedh K official |
| 7 | Maaye | Sumedh K | `Yxx-zTuw1xE` | Sumedh K official |
| 8 | Jhumki | Tanmay Gururaj | `XhUPPuZMEPY` | Tanmay Gururaj official |
| 9 | Nasheya Gungale | Tanmay Gururaj | `9dlbKgxvg_A` | Tanmay Gururaj official |

> **Note:** The original project listed "Tunumay Guraj" — the correct artist name is **Tanmay Gururaj** (Kannada independent artist, @TanmayGururaj on YouTube).

### Hindi / Bollywood (5 tracks)

| # | Title | Artist | YouTube ID | Source |
|---|-------|---------|------------|--------|
| 10 | Kesariya | Arijit Singh | `NJAv_7lHUIU` | Sony Music India |
| 11 | Chaleya | Arijit Singh, Shilpa Rao | `VAdGW7QDJiU` | Sony Music India |
| 12 | Apna Bana Le | Arijit Singh | `ElZ_qp0n9aM` | Zee Music Company |
| 13 | Heeriye | Jasleen Royal ft. Arijit Singh | `RLzC55ai0eo` | Official |
| 14 | What Jhumka? | Pritam · Arijit Singh · Jonita Gandhi | `P1fIdFRnfqw` | Dharma Music |

### English Pop (5 tracks)

| # | Title | Artist | YouTube ID | Source |
|---|-------|---------|------------|--------|
| 15 | Anti-Hero | Taylor Swift | `b1kbLwvqugk` | Taylor Swift official |
| 16 | Blinding Lights | The Weeknd | `4NRXx6U8ABQ` | The Weeknd official |
| 17 | Shape of You | Ed Sheeran | `JGwWNGJdvx8` | Ed Sheeran official |
| 18 | Levitating | Dua Lipa | `TUVcZfQe-Kw` | Dua Lipa official |
| 19 | Flowers | Miley Cyrus | `G7KNmW9a75Y` | Miley Cyrus official |

---

## Features
- ✅ Real YouTube video plays **inside the Melody page** when a track is selected
- ✅ Play / Pause / Previous / Next track
- ✅ Seek bar (progress) synced to actual playback position
- ✅ Volume slider and Mute/Unmute button
- ✅ Shuffle and Repeat
- ✅ Like / Unlike tracks and Liked Songs playlist
- ✅ Search by song title, artist, language, or vibe
- ✅ Sandalwood Hits, Bollywood Mix, Global Pop, Focus Flow, Golden Hour, Late Night Drive playlists
- ✅ Responsive layout: desktop, tablet (1050px), mobile (360px)
- ✅ Clear error messages when a video cannot be embedded (error code 101/150 — rights holder restriction)
- ✅ "Playback unavailable" message if a track has no verified YouTube ID

---

## Possible Playback Issues

Some official music videos may have **embedding disabled** by the rights holder (YouTube error 101 or 150). This affects some major label videos. When this happens:
- Melody displays: **"Playback unavailable — Embed not permitted by rights holder."**
- Melody will **never silently substitute another song** or play unrelated audio.
- The track's metadata (title, artist, artwork) remains displayed correctly.

This is a limitation of YouTube's embedding policy, not a bug in Melody.

---

## No Credentials Required

The YouTube IFrame Player API used here does **not** require:
- A YouTube Data API key
- A Google Cloud project
- Any server-side component
- User login

Simply open `index.html` in a browser.

---

## Run Locally

1. Download or clone this project.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. For a smoother local development workflow, use VS Code with the **Live Server** extension.

> ⚠️ Some browsers may block YouTube embeds on `file://` URLs. If tracks do not load, serve the project from a local HTTP server (VS Code Live Server, `python -m http.server`, or similar).

---

## Deploy on GitHub Pages

1. Create a GitHub repository (suggested name: `melody-player`).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish. Add the live URL to your portfolio.

GitHub Pages serves over HTTPS, so YouTube embeds work reliably there.

---

## What Was Changed vs the Previous Version

| Before | After |
|--------|-------|
| Clicking a track opened a YouTube search results tab | Clicking a track loads the matching official video inside Melody |
| "3 Peg" listed under Sanjith Hegde (incorrect — "3 Peg" is by Chandan Shetty) | Replaced with verified Sanjith Hegde songs (Soul of Dia, Marali Manasaagide, Puttamalli) |
| "Kannada Indie Vibes" (invented title) under "Sumedh K" | Replaced with real tracks: Tulasi and Maaye |
| "New Wave Kannada" (invented title) under "Tunumay Guraj" | Replaced with Jhumki and Nasheya Gungale by Tanmay Gururaj (correct spelling) |
| "Nee Sigovaregu" listed under Vasuki Vaibhav (that song is by Sid Sriram) | Replaced with correct Vasuki Vaibhav songs: Kaagadada Doniyalli, Arere Avala Naguva |
| Generic sample MP3 audio (SoundHelix) | Removed entirely |
| ↗ play button with "Open on YouTube" tooltip | ▶ play button with in-page playback |
| Progress bar disabled / shown "—" always | Progress bar live-updated during playback |
| No volume control | Volume slider + Mute button functional |

---

## Licensing

- **YouTube videos**: Embedded via the YouTube IFrame API under YouTube's Terms of Service. All embedded content is owned by the respective rights holders.
- **Melody UI code**: Independent learning project. Not affiliated with Spotify, YouTube, or any music label.

---

## AI Disclosure

AI tools assisted with the initial UI/code draft. All YouTube video IDs were verified against official uploads on YouTube before being included. Be prepared to explain the HTML structure, CSS layout, JavaScript event model, and YouTube IFrame API integration.

## Before Submitting

- [ ] Test at 360px mobile width and desktop width.
- [ ] Test search, likes, playlist navigation and playback controls.
- [ ] Confirm that selecting "Soul of Dia" plays the Sanjith Hegde song (not unrelated audio).
- [ ] Note any tracks that show "Playback unavailable" (embed restriction).
- [ ] Confirm GitHub Pages deployment works over HTTPS.
