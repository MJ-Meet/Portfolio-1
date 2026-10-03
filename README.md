# Meet Jethawa (MJ) — Personal Portfolio Management System

A modern, responsive, and complete **Personal Portfolio Management System & Mini CMS** built specifically for **Meet Jethawa (MJ)** — *Computer Science Student | AI/ML | Data Analytics*.

This application features a dual-interface architecture:
1. **Public Viewer Dashboard (`index.html`)**: An interactive portfolio website for recruiters, faculty, hiring managers, and visitors.
2. **Private Admin Dashboard (`admin.html`)**: A client-side CMS panel allowing full CRUD (Create, Read, Update, Delete) management of portfolio content, contact inquiries, appearance settings, and data backup.

---

## 1. Project Overview

The **Personal Portfolio Management System** allows developers and students to maintain an up-to-date, visually appealing web presence without requiring server setups, databases, or complex build tooling.

All data persists in the client's **browser `localStorage`** and synchronizes instantly across both the public and admin views on the same browser.

---

## 2. Key Features

### 🌐 Public Viewer Dashboard (`index.html`)
* **Hero Section**: Dynamic typing effect with customizable positioning phrases, bio summary, quick call-to-actions, and social links.
* **Live Impact Counters**: Interactive animated statistics showing counts of projects, technical skills, certifications, and experience entries.
* **About Me**: In-depth narrative, education details, career objective, and current research focus.
* **Skills Matrix**: Categorized tech stack with animated progress bars, proficiency levels, and category filtering.
* **Projects Showcase**: Filterable portfolio projects with search bar, tags, links to GitHub and live demos, plus detailed view modals.
* **Work & Internship Experience**: Chronological history of roles, responsibilities, locations, and verification links.
* **Certifications & Credentials**: Categorized certificates with issuer details, dates, and verification links.
* **Learning Timeline**: Milestone-based journey of academic and programming milestones.
* **Currently Learning Roadmap**: Live progress indicators of active research topics and new technologies.
* **Interactive Contact Form**: In-browser message submission with validation, feedback toasts, and storage for admin review.
* **Dark / Light Theme Toggle**: Persistent theme switching using CSS custom properties.
* **Responsive & Mobile Optimized**: Fully adaptive navigation with offcanvas mobile menu and touch-friendly controls.

### 🛡️ Private Admin Dashboard (`admin.html`)
* **Authentication Screen**: Secure session-based login gateway with error handling and default credentials.
* **Executive Metric Cards**: Real-time counts of projects, skills, certificates, experience items, total messages, and unread inquiries.
* **Profile Management**: Edit name, bio, social URLs, typing animation phrases, and career objectives with immediate preview updates.
* **Full CRUD Management**:
  * **Projects**: Add, edit, reorder, delete, and toggle "Featured" status.
  * **Skills**: Add, edit, filter, and adjust proficiency percentages.
  * **Certificates**: Add, edit, categorize, and link verification credentials.
  * **Experience**: Manage organizations, roles, date ranges, and descriptions.
  * **Timeline & Learning**: Update journey milestones and active study roadmaps.
* **Message Inbox**: View incoming messages from the contact form, toggle Read/Unread status, view full message bodies, and delete inquiries.
* **JSON Export & Import**: One-click download of the complete portfolio dataset as `.json` and full restoration from backup.
* **Factory Reset**: Instant rollback to original sample data with safety confirmation modal.

---

## 3. Strict Technology Stack

This application is strictly **frontend-only** with zero backend or framework dependencies:

* **HTML5**: Semantic document structure, accessibility attributes, and SEO meta tags.
* **CSS3**: Modern custom styling, variables (design tokens), animations, glassmorphism, and responsive breakpoints.
* **Bootstrap 5 (v5.3.3 CDN)**: Responsive grid, flexbox utilities, modal dialogs, and offcanvas components.
* **Vanilla JavaScript (ES6+)**: Modular application logic, DOM manipulation, custom event listeners, and counter animations.
* **Browser localStorage**: Persistent client-side data store for all portfolio content.

> **No Frameworks or Databases**: No React, Vue, Angular, Node.js, PHP, Python, MySQL, Firebase, or external servers are required.

---

## 4. Folder Structure

```text
Portfolio-1/
│
├── index.html              # Public Viewer Dashboard
├── admin.html              # Private Admin CMS Dashboard
├── README.md               # Project documentation & guide
│
├── css/
│   └── style.css           # Custom styling & design system (light/dark themes)
│
├── js/
│   ├── data.js             # Default initial sample data for Meet Jethawa
│   ├── storage.js          # Centralized localStorage CRUD & export/import engine
│   ├── app.js              # Public portfolio controller & DOM renderers
│   └── admin.js            # Admin dashboard logic, CRUD operations & auth
│
├── images/
│   ├── projects/           # Project screenshots and illustrations
│   └── certificates/       # Certificate images and badges
│
└── resume/
    └── resume.pdf          # Downloadable resume document
```

---

## 5. How to Run

Because this project is built entirely on native web standards, you can run it immediately without installing any dependencies or package managers:

### Method 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Method 2: Live Server (VS Code / IDE)
1. Open the project folder in your editor (e.g. Visual Studio Code).
2. Right-click `index.html` and select **"Open with Live Server"**.
3. Access the public portfolio at `http://127.0.0.1:5500/index.html`.
4. Access the admin dashboard at `http://127.0.0.1:5500/admin.html`.

---

## 6. Admin Login Credentials

To access the CMS dashboard, navigate to `admin.html` or click the **"⚙️ Admin"** link in the footer of `index.html`:

| Field | Default Value | Notes |
|---|---|---|
| **Username** | `admin` | Editable in Admin Settings |
| **Password** | `admin123` | Editable in Admin Settings |

*Credentials can be modified at any time in the **Settings** section of the Admin Dashboard.*

---

## 7. localStorage Architecture

All portfolio information is organized into modular keys within browser `localStorage`:

| Storage Key | Content Description |
|---|---|
| `portfolio_profile` | Personal details, headline, bio, contact info, and typing phrases |
| `portfolio_projects` | Array of projects with categories, descriptions, links, and featured flags |
| `portfolio_skills` | Array of technical skills, proficiency levels, and percentage values |
| `portfolio_certificates` | Array of certifications, issuers, categories, and verification URLs |
| `portfolio_experience` | Work history, internships, roles, and dates |
| `portfolio_timeline` | Milestone events and learning journey steps |
| `portfolio_learning` | Topics currently being studied and progress percentages |
| `portfolio_messages` | Inquiries submitted via the public contact form |
| `portfolio_settings` | Admin credentials and global color theme preference |

---

## 8. JSON Export / Import & Cross-Device Portability

### Why Export / Import is Needed
Browser `localStorage` is isolated to the specific browser and machine on which it is stored:
* **Same Device + Same Browser**: Updates made in `admin.html` immediately reflect in `index.html`.
* **Different Device or Browser**: Changes will not synchronize automatically because there is no remote cloud server.

### How to Transfer Data Across Devices:
1. In the Admin Dashboard (`admin.html`), click **"📥 Export"** in the top bar or under **Settings**.
2. A file named `portfolio-backup-YYYY-MM-DD.json` will be downloaded to your computer.
3. Open `admin.html` on your second device or browser.
4. Click **"📤 Import"** and select your downloaded JSON backup file.
5. All your projects, skills, certificates, and profile configurations will instantly restore.

---

## 9. Limitations & Security Disclaimer

> **Important Notice**: This application is a frontend-only portfolio management prototype designed for academic demonstrations, personal portfolios, and recruiter presentations.

* **Client-Side Storage**: Data is stored inside browser `localStorage`. Clearing browser cookies/cache will erase custom modifications unless backed up via JSON export.
* **Authentication Security**: The admin login is implemented in client-side JavaScript. It is suitable for personal use and portfolio evaluation, but does not provide cryptographic backend authentication.
* **File Uploads**: Image and document paths refer to local files in the `images/` or `resume/` directories or public image URLs.

---

## 10. Future Backend Upgrade Roadmap

For enterprise production use or multi-user deployment, the system can seamlessly transition to a client-server architecture:

1. **REST / GraphQL API**: Replace `storage.js` localStorage methods (`loadData`, `saveData`) with asynchronous `fetch()` API calls.
2. **Backend Framework**: Implement a lightweight Node.js (Express), Python (FastAPI / Flask), or Go server.
3. **Database**: Store JSON documents in MongoDB or relational records in PostgreSQL / SQLite.
4. **Cloud Authentication**: Implement JWT (JSON Web Tokens) or OAuth 2.0 with bcrypt password hashing.
5. **Asset Storage**: Upload images and PDF documents to Amazon S3, Cloudinary, or Firebase Storage.

---

## 11. Deployment Guide

Because this application is 100% static frontend code, it can be deployed for **free** on any modern static hosting service:

### Option A: GitHub Pages (Recommended)
1. Initialize git and push the folder to a GitHub repository named `portfolio` (or `<username>.github.io`):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   * Go to **Settings** → **Pages**.
   * Under **Branch**, select `main` and `/ (root)`.
   * Click **Save**.
3. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option B: Netlify (Drag & Drop in 30 Seconds)
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `Portfolio-1` folder into the browser window.
3. Your site goes live instantly with an SSL certificate and a custom `.netlify.app` domain.

### Option C: Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Connect your GitHub repository or deploy directly using Vercel CLI (`npx vercel`).
3. Vercel automatically detects the static files and deploys using `vercel.json`.

---

## 12. Author

**Meet Jethawa (MJ)**  
*Computer Science Student | AI/ML | Data Analytics*  
* GitHub: [github.com/meetjethawa](https://github.com/meetjethawa)  
* Portfolio: Built with HTML5, CSS3, Bootstrap 5 & Vanilla JavaScript
