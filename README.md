# GTA VI Trailer & Global Pre-Download Countdown Stream System

A professional, broadcast-ready 1080p stream dashboard and OBS overlay featuring the GTA VI trailer, country-wise pre-download countdown clocks, and a built-in YouTube copyright protection system.

---

## ⚡ Quick Start & Deployment

### Option 1: Deploy to Vercel (Free 24/7 Global HTTPS Hosting)
Because this app is built with high-performance static HTML5, CSS3, and modern Web APIs, it is **100% ready for Vercel deployment**:

* **Method A (Drag & Drop - No installation required)**:
  1. Open [vercel.com/new](https://vercel.com/new) in your browser and log in with GitHub/Google.
  2. Drag and drop the `d:\Antigravity\GTA VI` folder directly into the Vercel dashboard.
  3. Click **Deploy**. In ~15 seconds you get a live global HTTPS link (e.g., `https://gta6-countdown.vercel.app`) that you can paste directly into OBS Browser Source on any streaming PC!
* **Method B (GitHub to Vercel)**:
  1. Push this folder to a GitHub repository.
  2. In Vercel, click **Add New Project** → Import your repository → Click **Deploy**.
* **Method C (Vercel CLI)**:
  ```bash
  npx vercel
  ```

### Option 2: Direct File Open (OBS & Local Browser)
1. Double click `index.html` or open it directly in Google Chrome, Microsoft Edge, or Firefox.
2. In **OBS Studio**:
   - Add a new **Browser** source.
   - Check **[x] Local file** and select `d:\Antigravity\GTA VI\index.html` (or paste your live Vercel URL).
   - Set Width: `1920`, Height: `1080`.
   - Press <kbd>O</kbd> to activate Clean OBS Overlay Mode!

### Option 3: Local HTTP Server (Zero Dependencies)
Run the included PowerShell server script (no Node.js or Python needed):
```powershell
.\start_server.ps1
```
Open `http://localhost:8080/` in your browser or OBS Browser Source.

---

## 🛡️ YouTube Copyright & Content ID Safety Guide

### The Risk with GTA VI Trailer 1
The official GTA VI Trailer 1 contains the song **"Love Is a Long Road" by Tom Petty**, which is owned/administered by **Universal Music Publishing Group (UMPG)** and Sony Music Publishing.
- Streaming the trailer on YouTube Live with the original music at full volume triggers **automated Content ID detection**.
- Result: YouTube will either mute your live stream audio, restrict monetization, or claim your stream.

### Built-In Stream-Safe Solutions
This overlay provides 3 audio modes:
1. **🟢 Stream-Safe Synthwave (Default)**:
   - The trailer audio is automatically muted.
   - The application runs an embedded, procedural **80s Outrun Synthwave music generator** in the browser via Web Audio API.
   - **0% copyright risk, 0% Content ID claims**. Safe for continuous 24/7 YouTube live streams!
2. **🟢 Streamer Mic Only (Silent)**:
   - All sounds from the trailer and synthwave are muted.
   - Ideal if you are speaking on your microphone or playing your own copyright-cleared music playlist in OBS.
3. **🔴 Original Audio (Preview / Caution)**:
   - Plays Tom Petty's song. Triggers an on-screen warning banner and status alert. Only recommended for short private tests.

### Rockstar Games Video Policy
Rockstar Games allows trailer reactions, community countdowns, and gameplay commentary under Fair Use, provided:
- The stream adds value (timers, chat commentary, reaction).
- It is not an unedited raw re-upload claiming ownership of the intellectual property.

---

## 🌍 Country-Wise Pre-Download Times & Timezones

Pre-downloads for major titles typically open **48 to 72 hours prior** to official launch.

The right-side sidebar automatically synchronizes UTC timestamps into local time for:
- 🇺🇸 **United States (East)**: New York (EDT/EST)
- 🇺🇸 **United States (West)**: Los Angeles (PDT/PST)
- 🇬🇧 **United Kingdom**: London (BST/GMT)
- 🇪🇺 **Europe**: Berlin / Paris / Madrid (CEST/CET)
- 🇮🇳 **India**: New Delhi / Mumbai (IST)
- 🇯🇵 **Japan**: Tokyo (JST)
- 🇦🇺 **Australia**: Sydney (AEDT/AEST)
- 🇧🇷 **Brazil**: São Paulo (BRT)
- 🇨🇦 **Canada**: Toronto (EDT/EST)
- 🇦🇪 **UAE / Middle East**: Dubai (GST)
- 🇰🇷 **South Korea**: Seoul (KST)
- 🇲🇽 **Mexico**: Mexico City (CST)
- 🇸🇬 **Singapore**: Singapore (SGT)
- 🇿🇦 **South Africa**: Johannesburg (SAST)
- 🇳🇿 **New Zealand**: Auckland (NZDT)

Includes search filter, pinned favorite countries, and live local clocks.

---

## ⌨️ Streamer Hotkeys

| Hotkey | Action |
| :--- | :--- |
| <kbd>O</kbd> | Toggle **Clean OBS Overlay Mode** (Hides setup bars, leaves clean broadcast view) |
| <kbd>S</kbd> | Quick-toggle **Stream-Safe Audio** (Synthwave ⇄ Silent) |
| <kbd>Space</kbd> | Play / Pause Trailer |
| <kbd>C</kbd> | Toggle Retro CRT Scanlines Effect |

---

## ⚙️ Customization (Settings Modal)
Click the **Settings** icon on the top bar to customize:
- Your YouTube Channel Name (e.g. `GTA_VI_CENTRAL`).
- Bottom scrolling marquee announcement.
- Target Release Date (custom ISO or official target).
- Pre-download lead time (24h, 48h, 72h, or custom).

