/**
 * app.js — Portfolio Controller & Dynamic Renderer
 * Meet Jethawa (MJ) Portfolio
 * High-performance, clean vanilla JS with Bootstrap 5
 */

// Global State
let currentTheme = "light";
let activeSkillCategory = "All";
let activeProjectCategory = "All";
let projectSearchQuery = "";
let typewriterIndex = 0;
let typewriterCharIndex = 0;
let isTypewriterDeleting = false;
let typewriterTimeout = null;

// Shorthand selector
const $ = (id) => document.getElementById(id);

/* ─────────────────────────────────────────────────────────
   1. Theme Controller (Dark / Light)
───────────────────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem("mj_portfolio_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  currentTheme = saved || (prefersDark ? "dark" : "light");
  applyTheme(currentTheme);

  const toggleBtn = $("themeToggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
      try {
        localStorage.setItem("mj_portfolio_theme", currentTheme);
      } catch (e) {
        console.warn("Storage not available", e);
      }
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-bs-theme", theme);

  const icon = $("themeToggleIcon");
  if (icon) {
    if (theme === "dark") {
      icon.className = "bi bi-sun-fill text-warning";
    } else {
      icon.className = "bi bi-moon-stars-fill text-primary";
    }
  }
}

/* ─────────────────────────────────────────────────────────
   2. Typewriter Effect
───────────────────────────────────────────────────────── */
function initTypewriter(phrases) {
  if (!phrases || phrases.length === 0) return;
  const target = $("typewriterTarget");
  if (!target) return;

  function tick() {
    const currentPhrase = phrases[typewriterIndex];
    if (isTypewriterDeleting) {
      typewriterCharIndex--;
      target.textContent = currentPhrase.substring(0, typewriterCharIndex);
    } else {
      typewriterCharIndex++;
      target.textContent = currentPhrase.substring(0, typewriterCharIndex);
    }

    let delay = isTypewriterDeleting ? 45 : 90;

    if (!isTypewriterDeleting && typewriterCharIndex === currentPhrase.length) {
      delay = 1800; // Pause at end of phrase
      isTypewriterDeleting = true;
    } else if (isTypewriterDeleting && typewriterCharIndex === 0) {
      isTypewriterDeleting = false;
      typewriterIndex = (typewriterIndex + 1) % phrases.length;
      delay = 400; // Pause before typing next
    }

    typewriterTimeout = setTimeout(tick, delay);
  }

  tick();
}

/* ─────────────────────────────────────────────────────────
   3. Render Hero & Profile Information
───────────────────────────────────────────────────────── */
function renderHero(profile) {
  if (!profile) return;

  // Title, Badges & Headline
  if ($("heroName")) $("heroName").textContent = profile.name || "Meet Jethawa";
  if ($("heroBadgeText")) $("heroBadgeText").textContent = profile.heroBadge || "✨ Available for Opportunities";
  if ($("heroHeadline")) $("heroHeadline").textContent = profile.headline || "";
  if ($("heroBio")) $("heroBio").textContent = profile.bio || "";
  if ($("brandName")) $("brandName").textContent = profile.shortName || "MJ";

  // Resume buttons
  const resumeUrl = profile.resume || "assets/resume/resume.pdf";
  ["navResumeBtn", "heroResumeBtn", "aboutResumeBtn"].forEach((id) => {
    const btn = $(id);
    if (btn) {
      btn.href = resumeUrl;
      btn.setAttribute("target", "_blank");
    }
  });

  // Social Links
  if ($("heroGithub")) $("heroGithub").href = profile.github || "#";
  if ($("heroLinkedin")) $("heroLinkedin").href = profile.linkedin || "#";
  if ($("heroEmail")) $("heroEmail").href = `mailto:${profile.email || "meetjethava07@gmail.com"}`;

  // Avatar Image with Fallback to SVG
  const avatarImg = $("heroAvatarImg");
  if (avatarImg) {
    avatarImg.src = profile.profileImage || "assets/images/profile.jpg";
    avatarImg.onerror = function () {
      this.src = "assets/images/profile-placeholder.svg";
    };
  }

  // Typewriter
  if (profile.typingPhrases) {
    initTypewriter(profile.typingPhrases);
  }
}

/* ─────────────────────────────────────────────────────────
   4. Animated Stats Counters
───────────────────────────────────────────────────────── */
function renderStats(data) {
  const pCount = (data.projects || []).length;
  const sCount = (data.skills || []).length;
  const cCount = (data.certificates || []).length;
  const eCount = (data.experience || []).length;

  animateCount("statProjects", pCount);
  animateCount("statSkills", sCount);
  animateCount("statCertificates", cCount);
  animateCount("statExperience", eCount);
}

function animateCount(elemId, target) {
  const el = $(elemId);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 25));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + "+";
      clearInterval(interval);
    } else {
      el.textContent = current;
    }
  }, 40);
}

/* ─────────────────────────────────────────────────────────
   5. Render About Section
───────────────────────────────────────────────────────── */
function renderAbout(profile) {
  if (!profile) return;

  if ($("aboutHeadline")) $("aboutHeadline").textContent = profile.headline || "";
  if ($("aboutBioText")) $("aboutBioText").textContent = profile.aboutText || profile.bio || "";
  if ($("aboutCareerObjective")) $("aboutCareerObjective").textContent = profile.careerObjective || "";

  // Quick info pills
  if ($("infoEducation")) $("infoEducation").textContent = profile.education || "Computer Science";
  if ($("infoLocation")) $("infoLocation").textContent = profile.location || "India";
  if ($("infoEmail")) $("infoEmail").textContent = profile.email || "meetjethava07@gmail.com";
  if ($("infoFocus")) $("infoFocus").textContent = profile.currentFocus || "AI/ML & Data Analytics";
}

/* ─────────────────────────────────────────────────────────
   6. Render Skills & Category Filtering
───────────────────────────────────────────────────────── */
function renderSkills(skills) {
  const container = $("skillsContainer");
  if (!container || !skills) return;

  const categories = ["All", "Programming", "AI & ML", "Data Science", "Web Development", "Tools"];
  renderSkillFilterButtons(categories, skills);
  filterAndRenderSkills(skills);
}

function renderSkillFilterButtons(categories, skills) {
  const btnContainer = $("skillFilterButtons");
  if (!btnContainer) return;

  btnContainer.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === activeSkillCategory ? "active" : ""}" data-category="${cat}">
      ${cat}
    </button>
  `).join("");

  btnContainer.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btnContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSkillCategory = btn.getAttribute("data-category");
      filterAndRenderSkills(skills);
    });
  });
}

function filterAndRenderSkills(skills) {
  const container = $("skillsContainer");
  if (!container) return;

  let filtered = skills;
  if (activeSkillCategory !== "All") {
    filtered = skills.filter(s => s.category.toLowerCase().includes(activeSkillCategory.toLowerCase()));
  }

  container.innerHTML = filtered.map(skill => `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <div class="card-modern skill-card">
        <div>
          <div class="skill-header">
            <div class="skill-icon-badge" style="color: ${skill.color || 'var(--primary)'}">
              <i class="bi ${skill.icon || 'bi-code-slash'}"></i>
            </div>
            <span class="skill-badge-level">${escapeHtml(skill.level || 'Competent')}</span>
          </div>
          <h5 class="fw-bold mb-1 fs-6">${escapeHtml(skill.name)}</h5>
          <p class="text-muted small mb-3" style="min-height: 2.4rem;">${escapeHtml(skill.description || '')}</p>
        </div>
        <div>
          <div class="d-flex justify-content-between small fw-semibold mb-1">
            <span class="text-muted">Proficiency</span>
            <span style="color: ${skill.color || 'var(--primary)'}">${skill.percentage}%</span>
          </div>
          <div class="progress-custom">
            <div class="progress-bar-custom" style="width: ${skill.percentage}%; background: ${skill.color ? `linear-gradient(90deg, ${skill.color}, var(--primary))` : 'var(--grad-primary)'};"></div>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

/* ─────────────────────────────────────────────────────────
   7. Render Projects (With Live Search & Modals)
───────────────────────────────────────────────────────── */
function renderProjects(projects) {
  const container = $("projectsContainer");
  if (!container || !projects) return;

  // Category filter buttons
  const categories = ["All", "AI/ML", "Data Analytics", "Web Development", "Machine Learning"];
  renderProjectFilterButtons(categories, projects);

  // Search input listener
  const searchInput = $("projectSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      projectSearchQuery = e.target.value.trim().toLowerCase();
      filterAndRenderProjects(projects);
    });
  }

  filterAndRenderProjects(projects);
}

function renderProjectFilterButtons(categories, projects) {
  const btnContainer = $("projectFilterButtons");
  if (!btnContainer) return;

  btnContainer.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === activeProjectCategory ? "active" : ""}" data-cat="${cat}">
      ${cat}
    </button>
  `).join("");

  btnContainer.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btnContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeProjectCategory = btn.getAttribute("data-cat");
      filterAndRenderProjects(projects);
    });
  });
}

function filterAndRenderProjects(projects) {
  const container = $("projectsContainer");
  if (!container) return;

  let filtered = projects;
  if (activeProjectCategory !== "All") {
    filtered = filtered.filter(p =>
      p.category.toLowerCase().includes(activeProjectCategory.toLowerCase()) ||
      (activeProjectCategory === "Machine Learning" && p.category.toLowerCase().includes("ml"))
    );
  }

  if (projectSearchQuery) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(projectSearchQuery) ||
      p.shortDescription.toLowerCase().includes(projectSearchQuery) ||
      (p.technologies || []).some(t => t.toLowerCase().includes(projectSearchQuery))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="card-modern p-5 d-inline-block text-center" style="max-width: 460px;">
          <i class="bi bi-search text-muted fs-1 mb-3 d-block"></i>
          <h5 class="fw-bold">No Projects Found</h5>
          <p class="text-muted small mb-0">Try clearing the search query or selecting a different category filter.</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(proj => `
    <div class="col-md-6 col-lg-4">
      <div class="card-modern project-card">
        <div class="project-img-container">
          <img src="${proj.image || 'assets/projects/project-placeholder.svg'}"
               alt="${escapeHtml(proj.title)}"
               class="project-img"
               onerror="this.src='assets/projects/project-placeholder.svg'">
          ${proj.featured ? `<span class="project-featured-badge"><i class="bi bi-star-fill me-1"></i> Featured</span>` : ''}
          <span class="project-overlay-badge">${escapeHtml(proj.category)}</span>
        </div>
        <div class="project-body">
          <h4 class="fw-bold mb-2 fs-5">${escapeHtml(proj.title)}</h4>
          <p class="text-muted small mb-3 flex-grow-1">${escapeHtml(proj.shortDescription)}</p>
          <div class="d-flex flex-wrap gap-1 mb-4">
            ${(proj.technologies || []).slice(0, 4).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            ${(proj.technologies || []).length > 4 ? `<span class="tech-tag">+${(proj.technologies || []).length - 4}</span>` : ''}
          </div>
          <div class="d-flex gap-2 pt-2 border-top" style="border-color: var(--border-color) !important;">
            <button class="btn btn-modern-primary btn-sm flex-grow-1" onclick="openProjectModal('${proj.id}')">
              <i class="bi bi-eye"></i> Details
            </button>
            ${proj.github ? `
              <a href="${proj.github}" target="_blank" class="btn btn-modern-outline btn-sm px-3" title="GitHub Source">
                <i class="bi bi-github"></i>
              </a>
            ` : ''}
            ${proj.demo ? `
              <a href="${proj.demo}" target="_blank" class="btn btn-modern-outline btn-sm px-3" title="Live Preview">
                <i class="bi bi-box-arrow-up-right"></i>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

/* ─────────────────────────────────────────────────────────
   8. Project Details Modal
───────────────────────────────────────────────────────── */
function openProjectModal(projectId) {
  const data = window.PORTFOLIO_DATA || {};
  const project = (data.projects || []).find(p => p.id === projectId);
  if (!project) return;

  $("modalProjectTitle").textContent = project.title;
  $("modalProjectCategory").textContent = project.category;
  $("modalProjectDescription").textContent = project.fullDescription || project.shortDescription;

  // Image with fallback
  const modalImg = $("modalProjectImage");
  if (modalImg) {
    modalImg.src = project.image || "assets/projects/project-placeholder.svg";
    modalImg.onerror = function() { this.src = "assets/projects/project-placeholder.svg"; };
  }

  // Tech tags
  const tagsContainer = $("modalProjectTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = (project.technologies || []).map(t => `
      <span class="tech-tag fs-6 px-3 py-1">${escapeHtml(t)}</span>
    `).join("");
  }

  // Key Highlights
  const highlightsContainer = $("modalProjectHighlights");
  if (highlightsContainer) {
    if (project.highlights && project.highlights.length > 0) {
      highlightsContainer.innerHTML = `
        <h6 class="fw-bold mt-4 mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Key Capabilities & Highlights:</h6>
        <ul class="text-muted small ps-3 mb-0">
          ${project.highlights.map(h => `<li class="mb-1">${escapeHtml(h)}</li>`).join("")}
        </ul>
      `;
    } else {
      highlightsContainer.innerHTML = "";
    }
  }

  // Action links
  const ghBtn = $("modalProjectGithub");
  if (ghBtn) {
    if (project.github) {
      ghBtn.href = project.github;
      ghBtn.style.display = "inline-flex";
    } else {
      ghBtn.style.display = "none";
    }
  }

  const demoBtn = $("modalProjectDemo");
  if (demoBtn) {
    if (project.demo) {
      demoBtn.href = project.demo;
      demoBtn.style.display = "inline-flex";
    } else {
      demoBtn.style.display = "none";
    }
  }

  const modalEl = $("projectModal");
  if (modalEl && window.bootstrap) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

/* ─────────────────────────────────────────────────────────
   9. Render Certificates & Modal
───────────────────────────────────────────────────────── */
function renderCertificates(certs) {
  const container = $("certificatesContainer");
  if (!container || !certs) return;

  container.innerHTML = certs.map(cert => `
    <div class="col-md-6 col-lg-4">
      <div class="card-modern cert-card">
        <div>
          <div class="cert-thumbnail-box">
            <img src="${cert.image || 'assets/certificates/certificate-placeholder.svg'}"
                 alt="${escapeHtml(cert.title)}"
                 class="cert-thumbnail-img"
                 onerror="this.src='assets/certificates/certificate-placeholder.svg'">
            <div class="position-absolute top-0 end-0 m-2">
              <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1">
                <i class="bi bi-patch-check-fill me-1"></i> Verified
              </span>
            </div>
          </div>
          <span class="text-gradient fw-bold small text-uppercase mb-1 d-block">${escapeHtml(cert.issuer)}</span>
          <h5 class="fw-bold mb-2 fs-6">${escapeHtml(cert.title)}</h5>
          <p class="text-muted small mb-3">${escapeHtml(cert.description || '')}</p>
        </div>
        <div class="d-flex align-items-center justify-content-between pt-3 border-top" style="border-color: var(--border-color) !important;">
          <span class="small text-muted"><i class="bi bi-calendar3 me-1"></i> ${escapeHtml(cert.date || '2024')}</span>
          <button class="btn btn-modern-outline btn-sm" onclick="openCertModal('${cert.id}')">
            <i class="bi bi-arrows-fullscreen me-1"></i> View
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function openCertModal(certId) {
  const data = window.PORTFOLIO_DATA || {};
  const cert = (data.certificates || []).find(c => c.id === certId);
  if (!cert) return;

  $("modalCertTitle").textContent = cert.title;
  $("modalCertIssuer").textContent = cert.issuer;
  $("modalCertDate").textContent = cert.date || "2024";

  const img = $("modalCertImage");
  if (img) {
    img.src = cert.image || "assets/certificates/certificate-placeholder.svg";
    img.onerror = function() { this.src = "assets/certificates/certificate-placeholder.svg"; };
  }

  const verBtn = $("modalCertVerification");
  if (verBtn) {
    if (cert.verification) {
      verBtn.href = cert.verification;
      verBtn.style.display = "inline-flex";
    } else {
      verBtn.style.display = "none";
    }
  }

  const modalEl = $("certificateModal");
  if (modalEl && window.bootstrap) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

/* ─────────────────────────────────────────────────────────
   10. Render Experience & Timeline
───────────────────────────────────────────────────────── */
function renderExperience(experience, timeline) {
  // Experience cards
  const expContainer = $("experienceContainer");
  if (expContainer && experience) {
    expContainer.innerHTML = experience.map(exp => `
      <div class="card-modern p-4 mb-4">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
          <div>
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 mb-2 d-inline-block">
              ${escapeHtml(exp.badge || 'Virtual Internship')}
            </span>
            <h4 class="fw-bold mb-1 fs-5">${escapeHtml(exp.role)}</h4>
            <h5 class="text-primary fs-6 mb-0">${escapeHtml(exp.organization)}</h5>
          </div>
          <span class="text-muted small fw-semibold"><i class="bi bi-calendar3 me-1"></i> ${escapeHtml(exp.period || '2024')}</span>
        </div>
        <p class="text-muted small mt-2 mb-3">${escapeHtml(exp.description)}</p>
        <div class="d-flex flex-wrap gap-1">
          ${(exp.skills || []).map(s => `<span class="tech-tag">${escapeHtml(s)}</span>`).join('')}
        </div>
      </div>
    `).join("");
  }

  // Milestones Timeline
  const tlContainer = $("timelineContainer");
  if (tlContainer && timeline) {
    tlContainer.innerHTML = timeline.map(item => `
      <div class="timeline-item">
        <div class="timeline-node">
          <i class="bi ${item.icon || 'bi-mortarboard'}"></i>
        </div>
        <div class="card-modern timeline-card">
          <span class="text-gradient fw-bold small text-uppercase mb-1 d-block">${escapeHtml(item.year)}</span>
          <h5 class="fw-bold mb-1 fs-6">${escapeHtml(item.title)}</h5>
          <p class="text-muted small mb-0">${escapeHtml(item.description)}</p>
        </div>
      </div>
    `).join("");
  }
}

/* ─────────────────────────────────────────────────────────
   11. Contact Form & Feedback Toasts
───────────────────────────────────────────────────────── */
function initContactForm() {
  const form = $("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("contactName")?.value.trim() || "";
    const email = $("contactEmail")?.value.trim() || "";
    const subject = $("contactSubject")?.value.trim() || "";
    const message = $("contactMessage")?.value.trim() || "";

    if (!name || !email || !message) {
      showToast("Please fill in your name, email, and message.", "warning");
      return;
    }

    // Save to localStorage
    if (typeof saveContactMessage === "function") {
      saveContactMessage({ name, email, subject, message });
    }

    // Clear form
    form.reset();

    // Show stylish success toast
    showToast(`Thank you, ${name}! Your message has been sent successfully. ✨`, "success");
  });
}

function showToast(msg, type = "success") {
  const container = $("toastContainer");
  if (!container) return;

  const bgClass = type === "success" ? "bg-success text-white" : type === "warning" ? "bg-warning text-dark" : "bg-primary text-white";
  const icon = type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";

  const toastId = "toast_" + Date.now();
  const html = `
    <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${icon} fs-5"></i>
          <span>${escapeHtml(msg)}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", html);
  const toastEl = $(toastId);
  if (toastEl && window.bootstrap) {
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  }
}

/* ─────────────────────────────────────────────────────────
   12. Copy to Clipboard Utility
───────────────────────────────────────────────────────── */
function copyToClipboard(text, label = "Item") {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard! 📋`, "success");
    });
  } else {
    showToast(`Contact: ${text}`, "primary");
  }
}

/* ─────────────────────────────────────────────────────────
   13. Navbar Scroll & Back To Top
───────────────────────────────────────────────────────── */
function initNavigation() {
  const navbar = $("mainNavbar");
  const backToTop = $("backToTopBtn");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Navbar shadow
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* ─────────────────────────────────────────────────────────
   Helper: HTML Escaping
───────────────────────────────────────────────────────── */
function escapeHtml(str) {
  if (typeof str !== "string") return str ?? "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ─────────────────────────────────────────────────────────
   Application Entrypoint
───────────────────────────────────────────────────────── */
function startApp() {
  initTheme();
  initNavigation();

  // Load portfolio data from data.js
  const data = window.PORTFOLIO_DATA || (typeof PORTFOLIO_DATA !== "undefined" ? PORTFOLIO_DATA : {});

  renderHero(data.profile);
  renderStats(data);
  renderAbout(data.profile);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderCertificates(data.certificates);
  renderExperience(data.experience, data.timeline);
  initContactForm();

  // Set page year
  if ($("currentYear")) $("currentYear").textContent = new Date().getFullYear();
}

// Reliable boot
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}
