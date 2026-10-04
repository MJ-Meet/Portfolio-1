# Meet Jethawa (MJ) — AI/ML & Data Science Portfolio

A modern, responsive, and ultra-stylish **Personal Portfolio** built for **Meet Jethawa (MJ)** — *Computer Science Student | AI/ML | Data Analytics*.

---

## 🚀 Key Features

* **Ultra-Modern AI/ML Aesthetics**: Frosted glass surfaces, ambient glowing background gradients, sleek dark/light mode toggle with persistent preference.
* **Dynamic Hero Section**: Interactive typewriter effect, live status badge (`✨ Available for AI/ML & Data Internships`), quick CTA buttons, and a tech avatar frame with floating technology chips.
* **Animated Impact Counters**: Dynamic statistics showing projects, skills, certificates, and internship milestones.
* **About Me & Core Pillars**: In-depth personal narrative, quick facts pills (Education, Location, Email with 1-click copy, and Focus), plus core competency cards.
* **Categorized Skills Matrix**: Interactive filter pills (`All`, `Programming`, `AI & ML`, `Data Science`, `Web Development`, `Tools`) with visual progress bars.
* **Projects Showcase & Search**: Filterable project gallery with instant real-time search, tech stack tags, and rich Bootstrap 5 modal dialogues detailing system architecture and links.
* **Experience & Milestones**: Detailed internship showcase and interactive growth timeline.
* **Verified Certificates**: Showcase credentials with verification links and preview modals.
* **Interactive Contact Form**: Client-side message handling with animated success feedback toasts and one-click copy buttons for contact info.

---

## 📁 Assets Directory Structure

Drop your personal photos, resume, project screenshots, and certificates directly into the `assets/` folder:

```
assets/
├── images/             # Place your profile picture (profile.jpg or profile.png)
│   └── profile-placeholder.svg
├── resume/             # Place your resume (resume.pdf)
│   └── resume.pdf
├── certificates/       # Place certificate scans / screenshots
│   └── certificate-placeholder.svg
├── projects/           # Place project screenshots / banners
│   └── project-placeholder.svg
└── README.md           # Quick reference guide
```

> **Smart Fallback:** If an image is not yet uploaded, the portfolio automatically displays high-tech SVG illustrations so your website never has broken image icons!

---

## 🛠️ Updating Your Data

All portfolio data (Profile, Projects, Skills, Certificates, Experience, and Milestones) is centralized in:
👉 [`js/data.js`](js/data.js)

Simply edit the fields in `PORTFOLIO_DATA` to customize any information.

---

## 💻 Tech Stack

* **HTML5**: Semantic document structure, accessibility attributes, and SEO meta tags.
* **CSS3**: Custom design tokens, glassmorphism, glowing gradients, responsive layout.
* **Bootstrap 5.3.3**: Grid, cards, modals, flexbox utilities.
* **Bootstrap Icons 1.11.3**: Crisp vector icons.
* **Vanilla JavaScript (ES6+)**: Typewriter animation, dynamic filters, live search, and modal triggers.
