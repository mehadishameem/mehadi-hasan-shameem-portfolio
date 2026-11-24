# Mehadi Hasan Shameem — Creative Developer Portfolio

A bespoke, craft-first developer portfolio engineered for **Mehadi Hasan Shameem**, inspired by the visual language, typography, and tactile charm of **[Robb Owen](https://robbowen.digital/)**.

---

## ✦ Key Design & Engineering Features

1. **Editorial Slab-Serif & Monospace Typography**:
   - Primary Headings: **Bitter** (Google Fonts) with custom bold phrasing and accent period dots (`.dot`).
   - Metadata, Coordinates, and System Telemetry: **JetBrains Mono** for crisp, monospaced terminal aesthetics.
   - Body & Hierarchy: **Plus Jakarta Sans** for modern legibility.

2. **Robb Owen-Inspired Visual Language (Anti-AI Aesthetics)**:
   - **Tactile Offset Shadows**: Hard-edge border boxes (`border: 2.5px solid var(--line)`) with rigid offset shadows and diagonal hatch stripes (`.stripes`) and halftone polka dots (`.dots`).
   - **Interactive Cursor-Tracking Illustrated Avatar**: A custom vector portrait in the hero section whose eyes smoothly follow the visitor's cursor across the screen, complete with subtle head tilt physics and natural blinking animations.
   - **Dual Color Modes**:
     - *Paper Light*: Clean eggshell blue (`#f4f9fc`), deep purple outlines (`#4c1d95`), and powder blue fills (`#bae6fd`).
     - *SynthWave '84 Dark*: Tribute to Robb Owen's legendary VS Code theme with neon magenta, cyber cyan, and deep void backgrounds.
   - **Tactile Web Audio Micro-Interactions**: Pure Web Audio API synthesized soft clicks and chimes (user-toggleable via the top navigation sound button, muted by default).
   - **Live Dhaka Time Indicator**: Real-time UTC+6 clock widget in the sticky navigation.

3. **The Kinetic Particle Field (User Special Request)**:
   - High-performance, zero-dependency HTML5 2D Canvas physics simulation.
   - Interactive modes: **Attract**, **Repel**, and **Vortex** orbital flow fields.
   - Real-time parameter controls: Node density slider (40 to 240 particles), velocity modifier, mesh connection lines toggle, and click/radial burst shockwaves.
   - Live telemetry HUD displaying instantaneous FPS, active node count, and force mode.

4. **Curated Showcase of Real GitHub Systems & Research**:
   - **Jatra Fleet Tracking System**: Full-stack bus tracking platform with sub-second Firebase GPS broadcasts, Leaflet.js dashboard, Android client, and 100-page engineering capstone report.
   - **SmartHome Tuya Digital Twin**: 10-floor, 40-room institutional building telemetry dashboard with live kilowatt load curves.
   - **E-Waste Pathways in Bangladesh**: Academic empirical qualitative research investigating domestic electronics hoarding, *bhangari* scrap networks, and green computing interventions.
   - **AttendanceCloud (EWU CSE489)**: Offline-first Android mobile app for East West University computer science courses.
   - **Yousuf Ali Munshi Bari Foundation Portal**: Civic community subscription management and financial ledger in PHP/MySQL.
   - **TechWave**: Responsive dark-themed podcast and media frontend built with Tailwind CSS.
   - **Cafeteria System & LeetCode**: Java algorithms, FIFO transaction queues, and data structures.

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 2. Build for Production
```bash
npm run build
```
Generates an optimized, lightning-fast static bundle inside the `dist/` directory, ready to deploy to GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

### 3. Adding Your Project Screenshots
If you have screenshots or device mockups of your projects:
1. Place them in `public/assets/img/` (e.g. `jatra.png`, `smarthome.png`, `ewaste.png`).
2. The portfolio will automatically detect and showcase them inside the respective project visual containers!
