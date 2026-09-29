# Vexoo Portfolio – Fully Customizable Website & Asset Suite

This folder contains a complete, fully downloaded, and cleanly structured clone of the **Vexoo Portfolio** ([vexoo.framer.website](https://vexoo.framer.website/)).

All original high-resolution assets, fonts, icons, layout structures, and case studies have been downloaded and organized into clean, human-readable HTML, CSS, and JavaScript so you can easily edit and customize every aspect of the site.

---

## 📁 Folder Structure

```
MY PORTFOLIO/
├── index.html                   # Home page (Bento grid, kinetic typography, tech ticker)
├── about.html                   # About page (Bio, capabilities, experience, testimonials)
├── portfolio.html               # Portfolio archive (Interactive category filters, project cards)
├── contact.html                 # Contact page (Direct contact, project request form, budget selector)
├── 404.html                     # Custom 404 page
│
├── portfolio/                   # Case study detail pages
│   ├── travel-easy.html         # Travel Easy case study (App Design)
│   ├── gamma.html               # Gamma case study (UX/UI Design)
│   ├── stream-ai.html           # Stream AI case study (Product Design)
│   ├── foome.html               # Foome case study (Web Design)
│   └── edbost.html              # Edbost case study (Visual Design)
│
├── css/
│   └── style.css                # Master design system & stylesheet (CSS variables, dark/light mode)
│
├── js/
│   └── main.js                  # Interactions: Cairo clock, kinetic typography, theme toggle, filters
│
├── assets/                      # All 119 original local assets (zero external dependencies)
│   ├── images/                  # Project showcases, avatar, portraits, logos, film grain texture
│   ├── fonts/                   # Inter, Open Sauce Sans, Open Sauce Two web fonts
│   └── scripts/                 # Original Framer runtime scripts
│
├── raw_pages/                   # Original raw Framer HTML files downloaded directly from the live site
├── framer_offline/              # Raw Framer HTML files rewritten to load from local assets
├── serve.js                     # Zero-dependency local web server
└── README.md                    # This documentation guide
```

---

## 🚀 How to Run Locally

You can preview the website in either of two ways:

### Option 1: Using the built-in local server (Recommended)
Run the included Node.js server:
```bash
node serve.js
```
Then open your browser to **`http://localhost:3000`**.

### Option 2: Direct browser opening
Double-click `index.html` directly in your file explorer to open it in Chrome, Edge, Safari, or Firefox.

---

## ✏️ How to Customize Your Portfolio

### 1. Change Your Name, Title & Location
- Open `index.html`, `about.html`, `portfolio.html`, and `contact.html`.
- Replace `Soren Weil` with your own name.
- Replace `AI Design Engineer` with your title / specialty.
- To change the city and timezone in the header, open `js/main.js` and edit the `initClock()` function:
  ```javascript
  timeZone: 'Africa/Cairo', // Change to 'America/New_York', 'Europe/London', etc.
  ```

### 2. Change Colors & Themes
Open `css/style.css`. The entire color palette is defined at the top using CSS custom properties:
```css
:root {
  --bg-color: #000000;         /* Background color */
  --accent: #ccf500;           /* Signature electric lime accent */
  --accent-glow: rgba(204, 245, 0, 0.35);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.65);
}
```
Simply change `--accent` to your favorite color (e.g. `#0066ff` for electric blue, `#ff3366` for neon pink, `#00f5a0` for mint green).

### 3. Replace Your Avatar & Portrait Images
- **Avatar icon (Header & Bento grid)**: Replace `assets/images/WsnVxaSk0dKenAYdMT2G7bpCDAQ.png` with your photo or update the `src` attribute in `index.html`.
- **About page portrait**: Replace `assets/images/7esgEDTfqoCmh2yHxI65XfkMOCI.jpg` with your own portrait photo.

### 4. Edit or Add Projects & Case Studies
- In `portfolio.html`, each project is defined as a `<a class="project-card" data-category="...">`.
- In `portfolio/`, you can edit the text, client name, challenge, objective, results, and gallery images in each `.html` file.
- To link your own project screenshots, place your images in `assets/images/` and update the `src` paths.

### 5. Update Contact Info & Social Links
In the footer of each HTML file and in `contact.html`, update:
- Email: `hello@soren.com`
- Phone: `(+20) 115 123-4567`
- Social links: X/Twitter, Instagram, LinkedIn.
- Resume link: Update the Google Drive link in `index.html` to point to your own PDF or URL.
