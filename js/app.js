/**
 * app.js — Public Portfolio Logic
 * Meet Jethawa (MJ) — Personal Portfolio Management System
 *
 * Handles all rendering, filtering, interaction, and
 * behaviour for the public-facing index.html.
 */

"use strict";

/* ═══════════════════════════════════════════════════════
   BOOTSTRAP / UTILITY
═══════════════════════════════════════════════════════ */
function el(id)    { return document.getElementById(id); }
function qs(sel)   { return document.querySelector(sel); }
function qsa(sel)  { return document.querySelectorAll(sel); }

/* ═══════════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-bs-theme", theme === "dark" ? "dark" : "light");
  const icon = el("themeIcon");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  saveData("settings", { ...loadData("settings"), theme });
}

function initTheme() {
  const settings = loadData("settings");
  applyTheme(settings?.theme || "light");
}

el("themeToggle")?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ═══════════════════════════════════════════════════════
   NAVBAR — Active link on scroll
═══════════════════════════════════════════════════════ */
function initNavbar() {
  const sections = qsa("section[id]");
  const navLinks = qsa(".navbar-nav .nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const active = qs(`.navbar-nav .nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));

  // Close mobile menu on link click
  qsa(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const toggler = qs(".navbar-toggler");
      const collapse = qs(".navbar-collapse");
      if (collapse && collapse.classList.contains("show")) {
        toggler?.click();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   TYPING ANIMATION
═══════════════════════════════════════════════════════ */
let typingInterval = null;
function initTyping(phrases) {
  const target = el("typingText");
  if (!target || !phrases || phrases.length === 0) return;
  if (typingInterval) clearInterval(typingInterval);

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      target.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      target.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    typingInterval = setTimeout(tick, deleting ? 55 : 85);
  }
  tick();
}

/* ═══════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════ */
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = Math.ceil(target / (duration / 30));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = start;
  }, 30);
}

/* ═══════════════════════════════════════════════════════
   RENDER HERO / PROFILE
═══════════════════════════════════════════════════════ */
function renderHero(profile) {
  const name    = el("heroName");
  const tagline = el("heroTagline");
  const intro   = el("heroIntro");
  const img     = el("heroImage");
  const navBrand = el("navBrand");
  const resumeBtn = el("resumeBtn");
  const githubBtn = el("heroGithub");
  const linkedinBtn = el("heroLinkedin");

  if (name)    name.textContent    = profile.name    || "Meet Jethawa";
  if (tagline) tagline.textContent = profile.headline || "";
  if (intro)   intro.textContent   = profile.heroTagline || "";
  if (navBrand) navBrand.textContent = profile.shortName || "MJ";
  if (img && profile.profileImage) {
    img.src = profile.profileImage;
    img.alt = profile.name || "Meet Jethawa";
    img.style.display = "block";
    const ph = el("heroPH");
    if (ph) ph.style.display = "none";
  }
  const resumeBtn2 = el("resumeBtn2");
  if (profile.resume) {
    const isData = profile.resume.startsWith("data:");
    const downloadName = `${(profile.name || "Meet_Jethawa").replace(/\s+/g, "_")}_Resume.pdf`;
    if (resumeBtn) {
      resumeBtn.href = profile.resume;
      if (isData) resumeBtn.setAttribute("download", downloadName);
    }
    if (resumeBtn2) {
      resumeBtn2.href = profile.resume;
      if (isData) resumeBtn2.setAttribute("download", downloadName);
    }
  }
  if (githubBtn && profile.github)  githubBtn.href = profile.github;
  if (linkedinBtn && profile.linkedin) linkedinBtn.href = profile.linkedin;

  document.title = `${profile.name || "Meet Jethawa"} — Portfolio`;
  initTyping(profile.typingPhrases || []);
}

/* ═══════════════════════════════════════════════════════
   RENDER ABOUT
═══════════════════════════════════════════════════════ */
function renderAbout(profile) {
  const setText = (id, val) => { if (el(id)) el(id).textContent = val || ""; };
  setText("aboutName",       profile.name);
  setText("aboutHeadline",   profile.headline);
  setText("aboutBio",        profile.aboutText || profile.bio);
  setText("aboutEducation",  profile.education);
  setText("aboutObjective",  profile.careerObjective);
  setText("aboutFocus",      profile.currentFocus);
  setText("aboutLocation",   profile.location);
  setText("aboutEmail",      profile.email);

  const aboutImg = el("aboutImage");
  if (aboutImg && profile.profileImage) {
    aboutImg.src = profile.profileImage;
    aboutImg.alt = profile.name;
  }
  const aboutGh = el("aboutGithub");
  const aboutLi = el("aboutLinkedin");
  if (aboutGh && profile.github)   aboutGh.href = profile.github;
  if (aboutLi && profile.linkedin) aboutLi.href = profile.linkedin;
}

/* ═══════════════════════════════════════════════════════
   RENDER STATS
═══════════════════════════════════════════════════════ */
function renderStats() {
  const projects     = loadData("projects")     || [];
  const skills       = loadData("skills")       || [];
  const certificates = loadData("certificates") || [];
  const experience   = loadData("experience")   || [];

  const statProj = el("statProjects");
  const statSkill = el("statSkills");
  const statCert  = el("statCerts");
  const statExp   = el("statExp");

  if (statProj)  animateCounter(statProj,  projects.length);
  if (statSkill) animateCounter(statSkill, skills.length);
  if (statCert)  animateCounter(statCert,  certificates.length);
  if (statExp)   animateCounter(statExp,   experience.length);
}

/* ═══════════════════════════════════════════════════════
   RENDER SKILLS
═══════════════════════════════════════════════════════ */
let allSkills = [];
let activeSkillFilter = "All";

function renderSkills(skills) {
  allSkills = skills;
  renderSkillsFiltered();
}

function renderSkillsFiltered() {
  const container = el("skillsContainer");
  if (!container) return;

  const filtered = activeSkillFilter === "All"
    ? allSkills
    : allSkills.filter(s => s.category === activeSkillFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h5>No skills found</h5>
          <p class="text-muted">No skills in this category yet.</p>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(skill => `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="skill-card card h-100 border-0 shadow-sm p-3">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="skill-icon fs-4">${skill.icon || "⚙️"}</span>
          <div>
            <h6 class="mb-0 fw-semibold">${escapeHtml(skill.name)}</h6>
            <span class="badge badge-category">${escapeHtml(skill.category)}</span>
          </div>
        </div>
        <div class="mb-1 d-flex justify-content-between">
          <small class="text-muted">${escapeHtml(skill.level || "")}</small>
          <small class="fw-semibold">${skill.percentage || 0}%</small>
        </div>
        <div class="progress skill-progress" style="height:6px;" role="progressbar" aria-valuenow="${skill.percentage || 0}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width:${skill.percentage || 0}%"></div>
        </div>
        ${skill.description ? `<p class="skill-desc text-muted mt-2 mb-0 small">${escapeHtml(skill.description)}</p>` : ""}
      </div>
    </div>
  `).join("");
}

function initSkillFilters(skills) {
  const categories = ["All", ...new Set(skills.map(s => s.category).filter(Boolean))];
  const container = el("skillFilters");
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <button class="btn btn-sm filter-btn ${cat === "All" ? "active" : ""}" data-filter="${cat}">${cat}</button>
  `).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSkillFilter = btn.dataset.filter;
      renderSkillsFiltered();
    });
  });
}

/* ═══════════════════════════════════════════════════════
   RENDER PROJECTS
═══════════════════════════════════════════════════════ */
let allProjects = [];
let activeProjectFilter = "All";
let projectSearchQuery  = "";

function renderProjects(projects) {
  allProjects = projects.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  renderFeaturedProjects();
  renderProjectsFiltered();
}

function renderFeaturedProjects() {
  const featured = allProjects.filter(p => p.featured);
  const section  = el("featuredSection");
  const container = el("featuredContainer");
  if (!section || !container) return;

  if (featured.length === 0) { section.style.display = "none"; return; }
  section.style.display = "";

  container.innerHTML = featured.map(p => buildProjectCard(p, "featured")).join("");
  attachProjectCardEvents(container);
}

function renderProjectsFiltered() {
  const container = el("projectsContainer");
  if (!container) return;

  let filtered = allProjects;
  if (activeProjectFilter !== "All") {
    filtered = filtered.filter(p => p.category === activeProjectFilter);
  }
  if (projectSearchQuery) {
    const q = projectSearchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      (p.title || "").toLowerCase().includes(q) ||
      (p.shortDescription || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.technologies || []).some(t => t.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <h5>No projects found</h5>
          <p class="text-muted">Try a different search or filter.</p>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => buildProjectCard(p)).join("");
  attachProjectCardEvents(container);
}

function buildProjectCard(p, variant = "") {
  const techs = (p.technologies || []).map(t =>
    `<span class="badge tech-badge">${escapeHtml(t)}</span>`).join(" ");
  const img = p.image
    ? `<img src="${p.image}" class="card-img-top project-card-img" alt="${escapeHtml(p.title)}" loading="lazy">`
    : `<div class="project-placeholder-img d-flex align-items-center justify-content-center">
         <span style="font-size:3rem;">💻</span>
       </div>`;

  return `
    <div class="col-sm-6 col-lg-4">
      <div class="card project-card h-100 border-0 shadow-sm">
        ${img}
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-start justify-content-between mb-2">
            <h5 class="card-title mb-0 fw-semibold">${escapeHtml(p.title)}</h5>
            <span class="badge badge-category ms-2 flex-shrink-0">${escapeHtml(p.category)}</span>
          </div>
          <p class="card-text text-muted small flex-grow-1">${escapeHtml(p.shortDescription || "")}</p>
          <div class="tech-badges mb-3">${techs}</div>
          <div class="d-flex gap-2 flex-wrap">
            <button class="btn btn-sm btn-outline-primary view-project-btn" data-id="${p.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="me-1"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>
              Details
            </button>
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="me-1"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </a>` : ""}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="me-1"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
              Live Demo
            </a>` : ""}
          </div>
        </div>
      </div>
    </div>`;
}

function attachProjectCardEvents(container) {
  container.querySelectorAll(".view-project-btn").forEach(btn => {
    btn.addEventListener("click", () => openProjectModal(btn.dataset.id));
  });
}

function openProjectModal(id) {
  const p = allProjects.find(x => x.id === id);
  if (!p) return;

  el("projModalTitle").textContent = p.title;
  el("projModalCategory").textContent = p.category;
  el("projModalDate").textContent = p.date || "";
  el("projModalDescription").textContent = p.fullDescription || p.shortDescription || "";
  el("projModalTechs").innerHTML = (p.technologies || []).map(t =>
    `<span class="badge tech-badge me-1 mb-1">${escapeHtml(t)}</span>`).join("");

  const imgEl = el("projModalImg");
  if (p.image) { imgEl.src = p.image; imgEl.style.display = ""; }
  else imgEl.style.display = "none";

  const ghLink = el("projModalGithub");
  const demoLink = el("projModalDemo");
  if (ghLink) { ghLink.href = p.github || "#"; ghLink.style.display = p.github ? "" : "none"; }
  if (demoLink) { demoLink.href = p.demo || "#"; demoLink.style.display = p.demo ? "" : "none"; }

  const modal = new bootstrap.Modal(el("projectModal"));
  modal.show();
}

function initProjectFilters() {
  const categories = ["All", ...new Set(allProjects.map(p => p.category).filter(Boolean))];
  const container  = el("projectFilters");
  if (!container) return;

  container.innerHTML = categories.map(cat =>
    `<button class="btn btn-sm filter-btn ${cat === "All" ? "active" : ""}" data-filter="${cat}">${cat}</button>`
  ).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeProjectFilter = btn.dataset.filter;
      renderProjectsFiltered();
    });
  });
}

function initProjectSearch() {
  const input = el("projectSearch");
  if (!input) return;
  input.addEventListener("input", (e) => {
    projectSearchQuery = e.target.value.trim();
    renderProjectsFiltered();
  });
}

/* ═══════════════════════════════════════════════════════
   RENDER EXPERIENCE
═══════════════════════════════════════════════════════ */
function renderExperience(experiences) {
  const container = el("experienceContainer");
  if (!container) return;

  if (!experiences || experiences.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <div class="empty-state">
          <div class="empty-icon">💼</div>
          <h5>No experience listed yet</h5>
          <p class="text-muted">Add experience from the Admin Dashboard.</p>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = experiences.map((exp, i) => {
    const skills = (exp.skills || []).map(s => `<span class="badge badge-category me-1">${escapeHtml(s)}</span>`).join("");
    return `
      <div class="timeline-item ${i % 2 === 0 ? "left" : "right"}">
        <div class="timeline-content card border-0 shadow-sm p-4">
          <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
            <div>
              <h5 class="fw-bold mb-0">${escapeHtml(exp.role || "")}</h5>
              <h6 class="text-primary mb-0">${escapeHtml(exp.organization || "")}</h6>
            </div>
            <span class="badge badge-date">
              ${escapeHtml(exp.startDate || "")}${exp.endDate ? " – " + escapeHtml(exp.endDate) : ""}
            </span>
          </div>
          ${exp.location ? `<p class="text-muted small mb-2">📍 ${escapeHtml(exp.location)}</p>` : ""}
          <p class="mb-3">${escapeHtml(exp.description || "")}</p>
          ${skills ? `<div class="mb-2">${skills}</div>` : ""}
          ${exp.certificateUrl ? `<a href="${exp.certificateUrl}" target="_blank" ${exp.certificateUrl.startsWith("data:") ? 'download="experience-document.pdf"' : ""} class="btn btn-sm btn-outline-primary mt-1">📄 View Credential / LoR</a>` : ""}
        </div>
      </div>`;
  }).join("");
}

/* ═══════════════════════════════════════════════════════
   RENDER CERTIFICATES
═══════════════════════════════════════════════════════ */
let allCertificates = [];
let activeCertFilter = "All";

function renderCertificates(certs) {
  allCertificates = certs;
  renderCertificatesFiltered();
}

function renderCertificatesFiltered() {
  const container = el("certificatesContainer");
  if (!container) return;

  const filtered = activeCertFilter === "All"
    ? allCertificates
    : allCertificates.filter(c => c.category === activeCertFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="empty-state">
          <div class="empty-icon">🏆</div>
          <h5>No certificates found</h5>
          <p class="text-muted">No certificates in this category yet.</p>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(cert => {
    const isPdf = cert.image && (cert.image.startsWith("data:application/pdf") || cert.image.toLowerCase().endsWith(".pdf"));
    const certVisual = cert.image
      ? (isPdf
          ? `<div class="cert-placeholder d-flex flex-column align-items-center justify-content-center bg-primary-subtle" style="height:160px;">
               <span style="font-size:2.8rem;">📄</span>
               <span class="badge bg-primary text-white mt-1">PDF Certificate</span>
             </div>`
          : `<img src="${cert.image}" class="card-img-top cert-img" alt="${escapeHtml(cert.title)}" loading="lazy">`)
      : `<div class="cert-placeholder d-flex align-items-center justify-content-center">
           <span style="font-size:3.5rem;">🏆</span>
         </div>`;

    return `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card cert-card h-100 border-0 shadow-sm">
        ${certVisual}
        <div class="card-body d-flex flex-column">
          <h6 class="card-title fw-semibold mb-1">${escapeHtml(cert.title)}</h6>
          <p class="text-muted small mb-1">${escapeHtml(cert.issuer || "")}</p>
          <p class="text-muted small mb-2">📅 ${escapeHtml(cert.date || "")}</p>
          <span class="badge badge-category mb-3">${escapeHtml(cert.category || "")}</span>
          <button class="btn btn-sm btn-outline-primary mt-auto view-cert-btn" data-id="${cert.id}">View Certificate</button>
        </div>
      </div>
    </div>`;
  }).join("");

  container.querySelectorAll(".view-cert-btn").forEach(btn => {
    btn.addEventListener("click", () => openCertModal(btn.dataset.id));
  });
}

function openCertModal(id) {
  const cert = allCertificates.find(c => c.id === id);
  if (!cert) return;

  el("certModalTitle").textContent  = cert.title;
  el("certModalIssuer").textContent = cert.issuer || "";
  el("certModalDate").textContent   = cert.date || "";
  el("certModalCat").textContent    = cert.category || "";

  const imgEl = el("certModalImg");
  const isPdf = cert.image && (cert.image.startsWith("data:application/pdf") || cert.image.toLowerCase().endsWith(".pdf"));
  if (cert.image) {
    if (isPdf) {
      imgEl.style.display = "none";
      const existingPdfLink = el("certModalPdfBtn");
      if (existingPdfLink) existingPdfLink.remove();
      imgEl.insertAdjacentHTML("afterend", `
        <div id="certModalPdfBtn" class="text-center py-4 bg-light rounded mb-3">
          <div style="font-size:3rem;">📄</div>
          <div class="fw-semibold mt-1 mb-2">PDF Certificate Document</div>
          <a href="${cert.image}" target="_blank" download="${(cert.title || "Certificate").replace(/\s+/g, "_")}.pdf" class="btn btn-primary btn-sm">
            📥 Download / View Full PDF
          </a>
        </div>
      `);
    } else {
      const existingPdfLink = el("certModalPdfBtn");
      if (existingPdfLink) existingPdfLink.remove();
      imgEl.src = cert.image;
      imgEl.style.display = "";
    }
  } else {
    imgEl.style.display = "none";
    const existingPdfLink = el("certModalPdfBtn");
    if (existingPdfLink) existingPdfLink.remove();
  }

  const verifyBtn = el("certModalVerify");
  if (verifyBtn) {
    verifyBtn.href = cert.verification || "#";
    verifyBtn.style.display = cert.verification ? "" : "none";
  }

  const modal = new bootstrap.Modal(el("certModal"));
  modal.show();
}

function initCertFilters(certs) {
  const categories = ["All", ...new Set(certs.map(c => c.category).filter(Boolean))];
  const container  = el("certFilters");
  if (!container) return;

  container.innerHTML = categories.map(cat =>
    `<button class="btn btn-sm filter-btn ${cat === "All" ? "active" : ""}" data-filter="${cat}">${cat}</button>`
  ).join("");

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCertFilter = btn.dataset.filter;
      renderCertificatesFiltered();
    });
  });
}

/* ═══════════════════════════════════════════════════════
   RENDER TIMELINE
═══════════════════════════════════════════════════════ */
function renderTimeline(items) {
  const container = el("timelineContainer");
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `<p class="text-muted text-center">Learning timeline will appear here.</p>`;
    return;
  }

  container.innerHTML = items.map((item, i) => `
    <div class="timeline-step ${i % 2 === 0 ? "step-left" : "step-right"}">
      <div class="timeline-dot">${item.icon || "⭐"}</div>
      <div class="timeline-card card border-0 shadow-sm p-3">
        <h6 class="fw-semibold mb-1">${escapeHtml(item.title || "")}</h6>
        <p class="text-muted small mb-1">${escapeHtml(item.description || "")}</p>
        <span class="badge badge-date">${escapeHtml(item.date || "")}</span>
      </div>
    </div>`).join("");
}

/* ═══════════════════════════════════════════════════════
   RENDER CURRENT LEARNING
═══════════════════════════════════════════════════════ */
function renderLearning(items) {
  const container = el("learningContainer");
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-4">
        <p class="text-muted">No current learning items added yet.</p>
      </div>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="col-sm-6 col-lg-4">
      <div class="card learning-card border-0 shadow-sm p-3 h-100">
        <h6 class="fw-semibold mb-1">${escapeHtml(item.topic || "")}</h6>
        <p class="text-muted small mb-2">${escapeHtml(item.description || "")}</p>
        <div class="d-flex justify-content-between mb-1">
          <small class="text-muted">Progress</small>
          <small class="fw-semibold">${item.progress || 0}%</small>
        </div>
        <div class="progress" style="height:8px;" role="progressbar" aria-valuenow="${item.progress || 0}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar progress-bar-striped progress-bar-animated" style="width:${item.progress || 0}%"></div>
        </div>
      </div>
    </div>`).join("");
}

/* ═══════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════ */
function initContactForm() {
  const form = el("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name    = el("contactName").value.trim();
    const email   = el("contactEmail").value.trim();
    const subject = el("contactSubject").value.trim();
    const message = el("contactMessage").value.trim();

    // Validation
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    clearContactErrors();

    if (!name) { showFieldError("contactName", "Name is required."); valid = false; }
    if (!email || !emailRegex.test(email)) { showFieldError("contactEmail", "A valid email is required."); valid = false; }
    if (!subject) { showFieldError("contactSubject", "Subject is required."); valid = false; }
    if (!message || message.length < 10) { showFieldError("contactMessage", "Message must be at least 10 characters."); valid = false; }

    if (!valid) return;

    const msg = {
      id:      generateId("msg"),
      name,
      email,
      subject,
      message,
      date:    new Date().toLocaleString(),
      status:  "unread"
    };

    addItem("messages", msg);
    form.reset();
    showToast("Your message has been saved successfully! I'll get back to you soon.", "success");
  });
}

function clearContactErrors() {
  qsa(".contact-error").forEach(e => e.remove());
  qsa("#contactForm .is-invalid").forEach(e => e.classList.remove("is-invalid"));
}

function showFieldError(fieldId, msg) {
  const field = el(fieldId);
  if (!field) return;
  field.classList.add("is-invalid");
  const err = document.createElement("div");
  err.className = "invalid-feedback contact-error";
  err.textContent = msg;
  field.parentNode.appendChild(err);
}

/* ═══════════════════════════════════════════════════════
   TOAST NOTIFICATION
═══════════════════════════════════════════════════════ */
function showToast(message, type = "success") {
  const container = el("toastContainer") || createToastContainer();
  const id = "toast_" + Date.now();
  const bgMap = { success: "bg-success", error: "bg-danger", warning: "bg-warning text-dark", info: "bg-info text-dark" };
  const bg = bgMap[type] || "bg-secondary";

  const html = `
    <div id="${id}" class="toast align-items-center text-white border-0 ${bg}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${escapeHtml(message)}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", html);
  const toastEl = el(id);
  const t = new bootstrap.Toast(toastEl, { delay: 4000 });
  t.show();
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

function createToastContainer() {
  const c = document.createElement("div");
  c.id = "toastContainer";
  c.className = "toast-container position-fixed bottom-0 end-0 p-3";
  c.style.zIndex = "1100";
  document.body.appendChild(c);
  return c;
}

/* ═══════════════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = el("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 400 ? "flex" : "none";
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function renderFooter(profile) {
  const fName = el("footerName");
  const fHeadline = el("footerHeadline");
  const fGh = el("footerGithub");
  const fLi = el("footerLinkedin");
  const fEmail = el("footerEmail");
  const fYear = el("footerYear");

  if (fName) fName.textContent = profile.name || "Meet Jethawa";
  if (fHeadline) fHeadline.textContent = profile.headline || "";
  if (fGh && profile.github) fGh.href = profile.github;
  if (fLi && profile.linkedin) fLi.href = profile.linkedin;
  if (fEmail && profile.email) fEmail.href = `mailto:${profile.email}`;
  if (fYear) fYear.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════════════ */
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navHeight = qs(".navbar")?.offsetHeight || 70;
        window.scrollTo({ top: target.offsetTop - navHeight, behavior: "smooth" });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   HTML ESCAPE
═══════════════════════════════════════════════════════ */
function escapeHtml(str) {
  if (typeof str !== "string") return str || "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ═══════════════════════════════════════════════════════
   MAIN INIT
═══════════════════════════════════════════════════════ */
function startApp() {
  initStorage();
  initTheme();

  const profile      = loadData("profile")      || DEFAULT_DATA.profile;
  const projects     = loadData("projects")     || DEFAULT_DATA.projects || [];
  const skills       = loadData("skills")       || DEFAULT_DATA.skills || [];
  const certificates = loadData("certificates") || DEFAULT_DATA.certificates || [];
  const experience   = loadData("experience")   || DEFAULT_DATA.experience || [];
  const timeline     = loadData("timeline")     || DEFAULT_DATA.timeline || [];
  const learning     = loadData("learning")     || DEFAULT_DATA.learning || [];

  renderHero(profile);
  renderAbout(profile);
  renderStats();
  renderSkills(skills);
  initSkillFilters(skills);
  renderProjects(projects);
  initProjectFilters();
  initProjectSearch();
  renderExperience(experience);
  renderCertificates(certificates);
  initCertFilters(certificates);
  renderTimeline(timeline);
  renderLearning(learning);
  renderFooter(profile);
  initContactForm();
  initNavbar();
  initBackToTop();
  initSmoothScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}
