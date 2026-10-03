/**
 * admin.js — Admin Dashboard Logic
 * Meet Jethawa (MJ) — Personal Portfolio Management System
 *
 * Handles login, all CRUD operations, messages,
 * settings, import/export, and admin UI interactions.
 */

"use strict";

/* ═══════════════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════════════ */
function el(id)  { return document.getElementById(id); }
function qs(sel) { return document.querySelector(sel); }

function escapeHtml(str) {
  if (typeof str !== "string") return str ?? "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ═══════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════ */
function showAdminToast(message, type = "success") {
  const container = el("adminToastContainer") || (() => {
    const c = document.createElement("div");
    c.id = "adminToastContainer";
    c.className = "toast-container position-fixed bottom-0 end-0 p-3";
    c.style.zIndex = "9999";
    document.body.appendChild(c);
    return c;
  })();

  const id = "at_" + Date.now();
  const bgMap = {
    success: "bg-success text-white",
    error:   "bg-danger text-white",
    warning: "bg-warning text-dark",
    info:    "bg-info text-dark"
  };
  const bg = bgMap[type] || "bg-secondary text-white";

  container.insertAdjacentHTML("beforeend", `
    <div id="${id}" class="toast align-items-center border-0 ${bg}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body fw-semibold">${message}</div>
        <button type="button" class="btn-close ${type !== "warning" && type !== "info" ? "btn-close-white" : ""} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`);

  const toastEl = el(id);
  new bootstrap.Toast(toastEl, { delay: 3500 }).show();
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

/* ═══════════════════════════════════════════════════════
   ADMIN LOGIN / AUTH
═══════════════════════════════════════════════════════ */
function isLoggedIn() {
  return sessionStorage.getItem("admin_logged_in") === "true";
}

function showLogin() {
  el("loginScreen").style.display  = "flex";
  el("adminApp").style.display     = "none";
}

function showApp() {
  el("loginScreen").style.display  = "none";
  el("adminApp").style.display     = "flex";
  initAdminApp();
}

function initAuth() {
  if (isLoggedIn()) { showApp(); return; }
  showLogin();

  el("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = el("loginUsername").value.trim();
    const password = el("loginPassword").value.trim();
    const settings = loadData("settings");

    if (username === settings.adminUsername && password === settings.adminPassword) {
      sessionStorage.setItem("admin_logged_in", "true");
      el("loginError").classList.add("d-none");
      showApp();
    } else {
      el("loginError").classList.remove("d-none");
    }
  });

  el("logoutBtn")?.addEventListener("click", () => {
    sessionStorage.removeItem("admin_logged_in");
    showLogin();
  });
  el("logoutBtnSidebar")?.addEventListener("click", () => {
    sessionStorage.removeItem("admin_logged_in");
    showLogin();
  });
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION / SECTIONS
═══════════════════════════════════════════════════════ */
const SECTIONS = ["dashboard","profile","projects","skills","certificates","experience","timeline","learning","messages","settings"];

function showSection(name) {
  SECTIONS.forEach(s => {
    const sec = el(`section-${s}`);
    if (sec) sec.style.display = s === name ? "block" : "none";
  });

  // Update active sidebar link
  document.querySelectorAll(".sidebar-link").forEach(l => {
    l.classList.toggle("active", l.dataset.section === name);
  });

  // Update page title
  const titleMap = {
    dashboard:"Dashboard", profile:"Profile", projects:"Projects", skills:"Skills",
    certificates:"Certificates", experience:"Experience", timeline:"Timeline",
    learning:"Currently Learning", messages:"Messages", settings:"Settings"
  };
  if (el("pageTitle")) el("pageTitle").textContent = titleMap[name] || "Dashboard";

  // Load section data
  const loaders = {
    dashboard:    loadDashboard,
    profile:      loadProfileSection,
    projects:     loadProjectsSection,
    skills:       loadSkillsSection,
    certificates: loadCertificatesSection,
    experience:   loadExperienceSection,
    timeline:     loadTimelineSection,
    learning:     loadLearningSection,
    messages:     loadMessagesSection,
    settings:     loadSettingsSection
  };
  loaders[name]?.();

  // Close offcanvas on mobile
  const oc = bootstrap.Offcanvas.getInstance(el("sidebarOffcanvas"));
  if (oc) oc.hide();
}

function initSidebar() {
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });
}

/* ═══════════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════════ */
function applyAdminTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-bs-theme", theme === "dark" ? "dark" : "light");
  const icon = el("adminThemeIcon");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

function initAdminTheme() {
  const settings = loadData("settings");
  applyAdminTheme(settings?.theme || "light");
  el("adminThemeToggle")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    const next = cur === "dark" ? "light" : "dark";
    applyAdminTheme(next);
    updateData("settings", { theme: next });
  });
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════ */
function loadDashboard() {
  const projects     = loadData("projects")     || [];
  const skills       = loadData("skills")       || [];
  const certificates = loadData("certificates") || [];
  const experience   = loadData("experience")   || [];
  const messages     = loadData("messages")     || [];
  const unread       = messages.filter(m => m.status === "unread").length;

  const setText = (id, val) => { if (el(id)) el(id).textContent = val; };
  setText("dashProjects",     projects.length);
  setText("dashSkills",       skills.length);
  setText("dashCerts",        certificates.length);
  setText("dashExp",          experience.length);
  setText("dashMessages",     messages.length);
  setText("dashUnread",       unread);

  // Recent projects
  const rpContainer = el("recentProjects");
  if (rpContainer) {
    const recent = projects.slice(-3).reverse();
    rpContainer.innerHTML = recent.length
      ? recent.map(p => `
          <div class="d-flex align-items-center gap-3 p-2 rounded hover-row">
            <span class="badge badge-category">${escapeHtml(p.category)}</span>
            <span class="flex-grow-1 fw-medium">${escapeHtml(p.title)}</span>
            <small class="text-muted">${escapeHtml(p.date || "")}</small>
          </div>`).join("")
      : `<p class="text-muted text-center py-3">No projects yet.</p>`;
  }

  // Recent messages
  const rmContainer = el("recentMessages");
  if (rmContainer) {
    const recent = messages.slice(-3).reverse();
    rmContainer.innerHTML = recent.length
      ? recent.map(m => `
          <div class="d-flex align-items-start gap-3 p-2 rounded hover-row">
            <span class="badge ${m.status === "unread" ? "bg-danger" : "bg-secondary"}">${m.status}</span>
            <div class="flex-grow-1 overflow-hidden">
              <div class="fw-medium text-truncate">${escapeHtml(m.name)}</div>
              <div class="text-muted small text-truncate">${escapeHtml(m.subject)}</div>
            </div>
          </div>`).join("")
      : `<p class="text-muted text-center py-3">No messages yet.</p>`;
  }

  // Unread badge in sidebar
  if (el("unreadBadge")) el("unreadBadge").textContent = unread > 0 ? unread : "";
}

/* ═══════════════════════════════════════════════════════
   PROFILE
═══════════════════════════════════════════════════════ */
function loadProfileSection() {
  const profile = loadData("profile");
  const fields = ["name","shortName","headline","bio","email","phone","location","github","linkedin","resume","heroTagline","aboutText","education","careerObjective","currentFocus","profileImage"];
  fields.forEach(f => {
    const inp = el(`prof_${f}`);
    if (inp) inp.value = profile[f] || "";
  });

  // Typing phrases
  const tpEl = el("prof_typingPhrases");
  if (tpEl) tpEl.value = (profile.typingPhrases || []).join("\n");
}

function initProfileForm() {
  el("profileForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const profile = loadData("profile");
    const fields = ["name","shortName","headline","bio","email","phone","location","github","linkedin","resume","heroTagline","aboutText","education","careerObjective","currentFocus","profileImage"];
    fields.forEach(f => {
      const inp = el(`prof_${f}`);
      if (inp) profile[f] = inp.value.trim();
    });

    const tpEl = el("prof_typingPhrases");
    if (tpEl) {
      profile.typingPhrases = tpEl.value.split("\n").map(s => s.trim()).filter(Boolean);
    }

    saveData("profile", profile);
    showAdminToast("Profile updated successfully! ✅");
  });
}

/* ═══════════════════════════════════════════════════════
   PROJECTS CRUD
═══════════════════════════════════════════════════════ */
let editingProjectId = null;

function loadProjectsSection() {
  const projects = loadData("projects") || [];
  const tbody = el("projectsTableBody");
  if (!tbody) return;

  tbody.innerHTML = projects.length
    ? projects.sort((a,b) => (a.order||0)-(b.order||0)).map(p => `
        <tr>
          <td class="fw-medium">${escapeHtml(p.title)}</td>
          <td><span class="badge badge-category">${escapeHtml(p.category)}</span></td>
          <td>${p.featured ? '<span class="badge bg-warning text-dark">⭐ Featured</span>' : '<span class="text-muted small">—</span>'}</td>
          <td>${escapeHtml(p.date || "—")}</td>
          <td>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-primary edit-proj-btn" data-id="${p.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger del-proj-btn" data-id="${p.id}" data-name="${escapeHtml(p.title)}">Delete</button>
            </div>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="5" class="text-center text-muted py-4">No projects yet. Click "Add Project" to get started.</td></tr>`;

  tbody.querySelectorAll(".edit-proj-btn").forEach(btn => {
    btn.addEventListener("click", () => openProjectForm(btn.dataset.id));
  });
  tbody.querySelectorAll(".del-proj-btn").forEach(btn => {
    btn.addEventListener("click", () => confirmDelete("project", btn.dataset.id, btn.dataset.name));
  });
}

function openProjectForm(id = null) {
  editingProjectId = id;
  const form = el("projectForm");
  if (!form) return;

  if (id) {
    const projects = loadData("projects") || [];
    const p = projects.find(x => x.id === id);
    if (!p) return;
    el("pf_title").value         = p.title        || "";
    el("pf_category").value      = p.category     || "AI/ML";
    el("pf_shortDesc").value     = p.shortDescription || "";
    el("pf_fullDesc").value      = p.fullDescription  || "";
    el("pf_techs").value         = (p.technologies || []).join(", ");
    el("pf_github").value        = p.github        || "";
    el("pf_demo").value          = p.demo          || "";
    el("pf_image").value         = p.image         || "";
    el("pf_date").value          = p.date          || "";
    el("pf_featured").checked    = !!p.featured;
    el("pf_order").value         = p.order         ?? "";
    el("projFormTitle").textContent = "Edit Project";
  } else {
    form.reset();
    el("projFormTitle").textContent = "Add Project";
  }

  const modal = new bootstrap.Modal(el("projectFormModal"));
  modal.show();
}

function saveProjectForm() {
  const title    = el("pf_title").value.trim();
  const category = el("pf_category").value.trim();
  const shortDesc = el("pf_shortDesc").value.trim();

  if (!title || !category) { showAdminToast("Title and category are required.", "error"); return; }

  const projData = {
    title,
    category,
    shortDescription: shortDesc,
    fullDescription:  el("pf_fullDesc").value.trim(),
    technologies:     el("pf_techs").value.split(",").map(s => s.trim()).filter(Boolean),
    github:           el("pf_github").value.trim(),
    demo:             el("pf_demo").value.trim(),
    image:            el("pf_image").value.trim(),
    date:             el("pf_date").value.trim(),
    featured:         el("pf_featured").checked,
    order:            parseInt(el("pf_order").value) || 99
  };

  if (editingProjectId) {
    updateItem("projects", editingProjectId, projData);
    showAdminToast("Project updated successfully! ✅");
  } else {
    projData.id = generateId("proj");
    addItem("projects", projData);
    showAdminToast("Project added successfully! ✅");
  }

  bootstrap.Modal.getInstance(el("projectFormModal"))?.hide();
  loadProjectsSection();
  loadDashboard();
}

/* ═══════════════════════════════════════════════════════
   SKILLS CRUD
═══════════════════════════════════════════════════════ */
let editingSkillId = null;
let skillFilterQuery = "";

function loadSkillsSection() {
  renderSkillsTable();
}

function renderSkillsTable() {
  let skills = loadData("skills") || [];
  if (skillFilterQuery) {
    const q = skillFilterQuery.toLowerCase();
    skills = skills.filter(s => s.name.toLowerCase().includes(q) || (s.category||"").toLowerCase().includes(q));
  }
  const tbody = el("skillsTableBody");
  if (!tbody) return;

  tbody.innerHTML = skills.length
    ? skills.map(s => `
        <tr>
          <td>${escapeHtml(s.icon || "")} ${escapeHtml(s.name)}</td>
          <td><span class="badge badge-category">${escapeHtml(s.category)}</span></td>
          <td>${escapeHtml(s.level || "")}</td>
          <td>
            <div class="progress" style="height:6px;min-width:80px">
              <div class="progress-bar" style="width:${s.percentage||0}%"></div>
            </div>
            <small>${s.percentage||0}%</small>
          </td>
          <td>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-primary edit-skill-btn" data-id="${s.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger del-skill-btn" data-id="${s.id}" data-name="${escapeHtml(s.name)}">Delete</button>
            </div>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="5" class="text-center text-muted py-4">No skills found.</td></tr>`;

  tbody.querySelectorAll(".edit-skill-btn").forEach(btn => {
    btn.addEventListener("click", () => openSkillForm(btn.dataset.id));
  });
  tbody.querySelectorAll(".del-skill-btn").forEach(btn => {
    btn.addEventListener("click", () => confirmDelete("skill", btn.dataset.id, btn.dataset.name));
  });
}

function openSkillForm(id = null) {
  editingSkillId = id;
  if (id) {
    const skills = loadData("skills") || [];
    const s = skills.find(x => x.id === id);
    if (!s) return;
    el("sf_name").value        = s.name        || "";
    el("sf_category").value    = s.category    || "";
    el("sf_level").value       = s.level       || "";
    el("sf_percentage").value  = s.percentage  ?? 0;
    el("sf_icon").value        = s.icon        || "";
    el("sf_description").value = s.description || "";
    el("skillFormTitle").textContent = "Edit Skill";
  } else {
    el("skillForm").reset();
    el("skillFormTitle").textContent = "Add Skill";
  }
  new bootstrap.Modal(el("skillFormModal")).show();
}

function saveSkillForm() {
  const name     = el("sf_name").value.trim();
  const category = el("sf_category").value.trim();
  if (!name || !category) { showAdminToast("Name and category are required.", "error"); return; }

  const skillData = {
    name, category,
    level:       el("sf_level").value.trim(),
    percentage:  Math.min(100, Math.max(0, parseInt(el("sf_percentage").value) || 0)),
    icon:        el("sf_icon").value.trim(),
    description: el("sf_description").value.trim()
  };

  if (editingSkillId) {
    updateItem("skills", editingSkillId, skillData);
    showAdminToast("Skill updated successfully! ✅");
  } else {
    skillData.id = generateId("sk");
    addItem("skills", skillData);
    showAdminToast("Skill added successfully! ✅");
  }

  bootstrap.Modal.getInstance(el("skillFormModal"))?.hide();
  renderSkillsTable();
}

/* ═══════════════════════════════════════════════════════
   CERTIFICATES CRUD
═══════════════════════════════════════════════════════ */
let editingCertId = null;
let certFilterCat = "All";

function loadCertificatesSection() {
  renderCertsTable();
}

function renderCertsTable() {
  let certs = loadData("certificates") || [];
  if (certFilterCat !== "All") certs = certs.filter(c => c.category === certFilterCat);
  const tbody = el("certsTableBody");
  if (!tbody) return;

  tbody.innerHTML = certs.length
    ? certs.map(c => `
        <tr>
          <td class="fw-medium">${escapeHtml(c.title)}</td>
          <td>${escapeHtml(c.issuer || "")}</td>
          <td>${escapeHtml(c.date || "")}</td>
          <td><span class="badge badge-category">${escapeHtml(c.category || "")}</span></td>
          <td>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-primary edit-cert-btn" data-id="${c.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger del-cert-btn" data-id="${c.id}" data-name="${escapeHtml(c.title)}">Delete</button>
            </div>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="5" class="text-center text-muted py-4">No certificates found.</td></tr>`;

  tbody.querySelectorAll(".edit-cert-btn").forEach(btn => {
    btn.addEventListener("click", () => openCertForm(btn.dataset.id));
  });
  tbody.querySelectorAll(".del-cert-btn").forEach(btn => {
    btn.addEventListener("click", () => confirmDelete("certificate", btn.dataset.id, btn.dataset.name));
  });
}

function openCertForm(id = null) {
  editingCertId = id;
  if (id) {
    const c = (loadData("certificates") || []).find(x => x.id === id);
    if (!c) return;
    el("cf_title").value        = c.title        || "";
    el("cf_issuer").value       = c.issuer       || "";
    el("cf_date").value         = c.date         || "";
    el("cf_category").value     = c.category     || "";
    el("cf_image").value        = c.image        || "";
    el("cf_verification").value = c.verification || "";
    el("certFormTitle").textContent = "Edit Certificate";
  } else {
    el("certForm").reset();
    el("certFormTitle").textContent = "Add Certificate";
  }
  new bootstrap.Modal(el("certFormModal")).show();
}

function saveCertForm() {
  const title = el("cf_title").value.trim();
  if (!title) { showAdminToast("Title is required.", "error"); return; }

  const certData = {
    title,
    issuer:       el("cf_issuer").value.trim(),
    date:         el("cf_date").value.trim(),
    category:     el("cf_category").value.trim(),
    image:        el("cf_image").value.trim(),
    verification: el("cf_verification").value.trim()
  };

  if (editingCertId) {
    updateItem("certificates", editingCertId, certData);
    showAdminToast("Certificate updated! ✅");
  } else {
    certData.id = generateId("cert");
    addItem("certificates", certData);
    showAdminToast("Certificate added! ✅");
  }

  bootstrap.Modal.getInstance(el("certFormModal"))?.hide();
  renderCertsTable();
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE CRUD
═══════════════════════════════════════════════════════ */
let editingExpId = null;

function loadExperienceSection() {
  const experience = loadData("experience") || [];
  const tbody = el("expTableBody");
  if (!tbody) return;

  tbody.innerHTML = experience.length
    ? experience.map(exp => `
        <tr>
          <td class="fw-medium">${escapeHtml(exp.organization || "")}</td>
          <td>${escapeHtml(exp.role || "")}</td>
          <td>${escapeHtml(exp.startDate || "")}${exp.endDate ? " – " + escapeHtml(exp.endDate) : ""}</td>
          <td>${escapeHtml(exp.location || "")}</td>
          <td>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-primary edit-exp-btn" data-id="${exp.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger del-exp-btn" data-id="${exp.id}" data-name="${escapeHtml(exp.organization)}">Delete</button>
            </div>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="5" class="text-center text-muted py-4">No experience entries yet.</td></tr>`;

  tbody.querySelectorAll(".edit-exp-btn").forEach(btn => {
    btn.addEventListener("click", () => openExpForm(btn.dataset.id));
  });
  tbody.querySelectorAll(".del-exp-btn").forEach(btn => {
    btn.addEventListener("click", () => confirmDelete("experience", btn.dataset.id, btn.dataset.name));
  });
}

function openExpForm(id = null) {
  editingExpId = id;
  if (id) {
    const exp = (loadData("experience") || []).find(x => x.id === id);
    if (!exp) return;
    el("ef_org").value         = exp.organization || "";
    el("ef_role").value        = exp.role         || "";
    el("ef_desc").value        = exp.description  || "";
    el("ef_start").value       = exp.startDate    || "";
    el("ef_end").value         = exp.endDate      || "";
    el("ef_location").value    = exp.location     || "";
    el("ef_skills").value      = (exp.skills || []).join(", ");
    el("ef_certUrl").value     = exp.certificateUrl || "";
    el("expFormTitle").textContent = "Edit Experience";
  } else {
    el("expForm").reset();
    el("expFormTitle").textContent = "Add Experience";
  }
  new bootstrap.Modal(el("expFormModal")).show();
}

function saveExpForm() {
  const org = el("ef_org").value.trim();
  if (!org) { showAdminToast("Organization is required.", "error"); return; }

  const expData = {
    organization:   org,
    role:           el("ef_role").value.trim(),
    description:    el("ef_desc").value.trim(),
    startDate:      el("ef_start").value.trim(),
    endDate:        el("ef_end").value.trim(),
    location:       el("ef_location").value.trim(),
    skills:         el("ef_skills").value.split(",").map(s => s.trim()).filter(Boolean),
    certificateUrl: el("ef_certUrl").value.trim()
  };

  if (editingExpId) {
    updateItem("experience", editingExpId, expData);
    showAdminToast("Experience updated! ✅");
  } else {
    expData.id = generateId("exp");
    addItem("experience", expData);
    showAdminToast("Experience added! ✅");
  }

  bootstrap.Modal.getInstance(el("expFormModal"))?.hide();
  loadExperienceSection();
}

/* ═══════════════════════════════════════════════════════
   TIMELINE CRUD
═══════════════════════════════════════════════════════ */
let editingTimelineId = null;

function loadTimelineSection() {
  const items = loadData("timeline") || [];
  const tbody = el("timelineTableBody");
  if (!tbody) return;

  tbody.innerHTML = items.length
    ? items.map(item => `
        <tr>
          <td>${escapeHtml(item.icon || "")} ${escapeHtml(item.title || "")}</td>
          <td class="d-none d-md-table-cell">${escapeHtml(item.description || "").slice(0, 60)}…</td>
          <td>${escapeHtml(item.date || "")}</td>
          <td>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-primary edit-tl-btn" data-id="${item.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger del-tl-btn" data-id="${item.id}" data-name="${escapeHtml(item.title)}">Delete</button>
            </div>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="4" class="text-center text-muted py-4">No timeline items yet.</td></tr>`;

  tbody.querySelectorAll(".edit-tl-btn").forEach(btn => {
    btn.addEventListener("click", () => openTimelineForm(btn.dataset.id));
  });
  tbody.querySelectorAll(".del-tl-btn").forEach(btn => {
    btn.addEventListener("click", () => confirmDelete("timeline", btn.dataset.id, btn.dataset.name));
  });
}

function openTimelineForm(id = null) {
  editingTimelineId = id;
  if (id) {
    const item = (loadData("timeline") || []).find(x => x.id === id);
    if (!item) return;
    el("tl_title").value = item.title       || "";
    el("tl_desc").value  = item.description || "";
    el("tl_date").value  = item.date        || "";
    el("tl_icon").value  = item.icon        || "";
    el("tlFormTitle").textContent = "Edit Timeline Item";
  } else {
    el("timelineForm").reset();
    el("tlFormTitle").textContent = "Add Timeline Item";
  }
  new bootstrap.Modal(el("timelineFormModal")).show();
}

function saveTimelineForm() {
  const title = el("tl_title").value.trim();
  if (!title) { showAdminToast("Title is required.", "error"); return; }

  const itemData = {
    title,
    description: el("tl_desc").value.trim(),
    date:        el("tl_date").value.trim(),
    icon:        el("tl_icon").value.trim() || "⭐"
  };

  if (editingTimelineId) {
    updateItem("timeline", editingTimelineId, itemData);
    showAdminToast("Timeline item updated! ✅");
  } else {
    itemData.id = generateId("tl");
    addItem("timeline", itemData);
    showAdminToast("Timeline item added! ✅");
  }

  bootstrap.Modal.getInstance(el("timelineFormModal"))?.hide();
  loadTimelineSection();
}

/* ═══════════════════════════════════════════════════════
   CURRENT LEARNING CRUD
═══════════════════════════════════════════════════════ */
let editingLearnId = null;

function loadLearningSection() {
  const items = loadData("learning") || [];
  const tbody = el("learningTableBody");
  if (!tbody) return;

  tbody.innerHTML = items.length
    ? items.map(item => `
        <tr>
          <td class="fw-medium">${escapeHtml(item.topic || "")}</td>
          <td class="d-none d-md-table-cell">${escapeHtml(item.description || "").slice(0,60)}…</td>
          <td>
            <div class="progress" style="height:6px;min-width:80px">
              <div class="progress-bar" style="width:${item.progress||0}%"></div>
            </div>
            <small>${item.progress||0}%</small>
          </td>
          <td>
            <div class="d-flex gap-1">
              <button class="btn btn-sm btn-outline-primary edit-lrn-btn" data-id="${item.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger del-lrn-btn" data-id="${item.id}" data-name="${escapeHtml(item.topic)}">Delete</button>
            </div>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="4" class="text-center text-muted py-4">No learning items yet.</td></tr>`;

  tbody.querySelectorAll(".edit-lrn-btn").forEach(btn => {
    btn.addEventListener("click", () => openLearnForm(btn.dataset.id));
  });
  tbody.querySelectorAll(".del-lrn-btn").forEach(btn => {
    btn.addEventListener("click", () => confirmDelete("learning", btn.dataset.id, btn.dataset.name));
  });
}

function openLearnForm(id = null) {
  editingLearnId = id;
  if (id) {
    const item = (loadData("learning") || []).find(x => x.id === id);
    if (!item) return;
    el("lf_topic").value    = item.topic       || "";
    el("lf_progress").value = item.progress    ?? 0;
    el("lf_desc").value     = item.description || "";
    el("learnFormTitle").textContent = "Edit Learning Item";
  } else {
    el("learnForm").reset();
    el("learnFormTitle").textContent = "Add Learning Item";
  }
  new bootstrap.Modal(el("learnFormModal")).show();
}

function saveLearnForm() {
  const topic = el("lf_topic").value.trim();
  if (!topic) { showAdminToast("Topic is required.", "error"); return; }

  const itemData = {
    topic,
    progress:    Math.min(100, Math.max(0, parseInt(el("lf_progress").value) || 0)),
    description: el("lf_desc").value.trim()
  };

  if (editingLearnId) {
    updateItem("learning", editingLearnId, itemData);
    showAdminToast("Learning item updated! ✅");
  } else {
    itemData.id = generateId("lrn");
    addItem("learning", itemData);
    showAdminToast("Learning item added! ✅");
  }

  bootstrap.Modal.getInstance(el("learnFormModal"))?.hide();
  loadLearningSection();
}

/* ═══════════════════════════════════════════════════════
   MESSAGES
═══════════════════════════════════════════════════════ */
function loadMessagesSection() {
  const messages = loadData("messages") || [];
  const tbody = el("messagesTableBody");
  if (!tbody) return;

  tbody.innerHTML = messages.length
    ? [...messages].reverse().map(m => `
        <tr class="${m.status === "unread" ? "table-active fw-semibold" : ""}">
          <td>
            <span class="badge ${m.status === "unread" ? "bg-danger" : "bg-secondary"}">${m.status}</span>
          </td>
          <td>${escapeHtml(m.name)}</td>
          <td><a href="mailto:${escapeHtml(m.email)}">${escapeHtml(m.email)}</a></td>
          <td>${escapeHtml(m.subject)}</td>
          <td class="d-none d-lg-table-cell"><small>${escapeHtml(m.date)}</small></td>
          <td>
            <div class="d-flex gap-1 flex-wrap">
              <button class="btn btn-sm btn-outline-primary view-msg-btn" data-id="${m.id}">View</button>
              <button class="btn btn-sm btn-outline-secondary toggle-read-btn" data-id="${m.id}" data-status="${m.status}">
                ${m.status === "unread" ? "Mark Read" : "Mark Unread"}
              </button>
              <button class="btn btn-sm btn-outline-danger del-msg-btn" data-id="${m.id}" data-name="${escapeHtml(m.name)}">Delete</button>
            </div>
          </td>
        </tr>`).join("")
    : `<tr><td colspan="6" class="text-center text-muted py-4">No messages received yet.</td></tr>`;

  tbody.querySelectorAll(".view-msg-btn").forEach(btn => {
    btn.addEventListener("click", () => viewMessage(btn.dataset.id));
  });
  tbody.querySelectorAll(".toggle-read-btn").forEach(btn => {
    btn.addEventListener("click", () => toggleMessageRead(btn.dataset.id, btn.dataset.status));
  });
  tbody.querySelectorAll(".del-msg-btn").forEach(btn => {
    btn.addEventListener("click", () => confirmDelete("message", btn.dataset.id, btn.dataset.name));
  });
}

function viewMessage(id) {
  const messages = loadData("messages") || [];
  const m = messages.find(x => x.id === id);
  if (!m) return;

  el("msgViewFrom").textContent    = m.name;
  el("msgViewEmail").textContent   = m.email;
  el("msgViewSubject").textContent = m.subject;
  el("msgViewDate").textContent    = m.date;
  el("msgViewBody").textContent    = m.message;

  // Auto-mark as read
  if (m.status === "unread") {
    updateItem("messages", id, { status: "read" });
    loadMessagesSection();
    loadDashboard();
  }

  new bootstrap.Modal(el("msgViewModal")).show();
}

function toggleMessageRead(id, currentStatus) {
  const newStatus = currentStatus === "unread" ? "read" : "unread";
  updateItem("messages", id, { status: newStatus });
  loadMessagesSection();
  loadDashboard();
}

/* ═══════════════════════════════════════════════════════
   GENERIC DELETE CONFIRMATION
═══════════════════════════════════════════════════════ */
let pendingDelete = null;

function confirmDelete(type, id, name) {
  pendingDelete = { type, id };
  el("deleteItemName").textContent = name || "this item";
  new bootstrap.Modal(el("deleteConfirmModal")).show();
}

function executePendingDelete() {
  if (!pendingDelete) return;
  const { type, id } = pendingDelete;
  const keyMap = {
    project:     "projects",
    skill:       "skills",
    certificate: "certificates",
    experience:  "experience",
    timeline:    "timeline",
    learning:    "learning",
    message:     "messages"
  };
  const key = keyMap[type];
  if (key) {
    deleteData(key, id);
    showAdminToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.`, "info");
  }
  pendingDelete = null;
  bootstrap.Modal.getInstance(el("deleteConfirmModal"))?.hide();

  // Refresh current section
  const refreshMap = {
    project:     loadProjectsSection,
    skill:       renderSkillsTable,
    certificate: renderCertsTable,
    experience:  loadExperienceSection,
    timeline:    loadTimelineSection,
    learning:    loadLearningSection,
    message:     loadMessagesSection
  };
  refreshMap[type]?.();
  loadDashboard();
}

/* ═══════════════════════════════════════════════════════
   SETTINGS
═══════════════════════════════════════════════════════ */
function loadSettingsSection() {
  const settings = loadData("settings");
  if (el("set_username")) el("set_username").value = settings.adminUsername || "";
  if (el("set_password")) el("set_password").value = "";
  if (el("set_theme"))    el("set_theme").value    = settings.theme || "light";
}

function saveSettingsForm() {
  const settings = loadData("settings");
  settings.adminUsername = el("set_username")?.value.trim() || settings.adminUsername;
  const newPw = el("set_password")?.value.trim();
  if (newPw) settings.adminPassword = newPw;
  settings.theme = el("set_theme")?.value || "light";
  saveData("settings", settings);
  applyAdminTheme(settings.theme);
  showAdminToast("Settings saved! ✅");
}

/* ═══════════════════════════════════════════════════════
   EXPORT / IMPORT / RESET / PREVIEW
═══════════════════════════════════════════════════════ */
function handleExport() {
  if (exportData()) {
    showAdminToast("Portfolio data exported successfully! 📥");
  } else {
    showAdminToast("Export failed. Please try again.", "error");
  }
}

function handleImport() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.addEventListener("change", async () => {
    const file = input.files[0];
    const result = await importData(file);
    if (result.success) {
      showAdminToast("Portfolio data imported successfully! ✅");
      setTimeout(() => location.reload(), 1500);
    } else {
      showAdminToast(`Import failed: ${result.error}`, "error");
    }
  });
  input.click();
}

function handleReset() {
  new bootstrap.Modal(el("resetConfirmModal")).show();
}

function executeReset() {
  resetData();
  bootstrap.Modal.getInstance(el("resetConfirmModal"))?.hide();
  showAdminToast("Portfolio data has been reset to defaults.", "info");
  setTimeout(() => location.reload(), 1500);
}

/* ═══════════════════════════════════════════════════════
   QUICK ACTIONS
═══════════════════════════════════════════════════════ */
function initQuickActions() {
  const map = {
    "qa_addProject":     () => { showSection("projects");  setTimeout(() => openProjectForm(), 200); },
    "qa_addSkill":       () => { showSection("skills");    setTimeout(() => openSkillForm(), 200); },
    "qa_addCert":        () => { showSection("certificates"); setTimeout(() => openCertForm(), 200); },
    "qa_addExp":         () => { showSection("experience"); setTimeout(() => openExpForm(), 200); },
    "qa_viewMessages":   () => showSection("messages"),
    "qa_previewPortfolio": () => window.open("index.html", "_blank")
  };
  Object.entries(map).forEach(([id, fn]) => el(id)?.addEventListener("click", fn));
}

/* ═══════════════════════════════════════════════════════
   GLOBAL BUTTON BINDINGS
═══════════════════════════════════════════════════════ */
function bindGlobalButtons() {
  // Projects
  el("addProjectBtn")?.addEventListener("click", () => openProjectForm());
  el("saveProjectBtn")?.addEventListener("click", saveProjectForm);

  // Skills
  el("addSkillBtn")?.addEventListener("click", () => openSkillForm());
  el("saveSkillBtn")?.addEventListener("click", saveSkillForm);
  el("skillSearchInput")?.addEventListener("input", e => {
    skillFilterQuery = e.target.value.trim();
    renderSkillsTable();
  });

  // Certificates
  el("addCertBtn")?.addEventListener("click", () => openCertForm());
  el("saveCertBtn")?.addEventListener("click", saveCertForm);
  el("certCatFilter")?.addEventListener("change", e => {
    certFilterCat = e.target.value;
    renderCertsTable();
  });

  // Experience
  el("addExpBtn")?.addEventListener("click", () => openExpForm());
  el("saveExpBtn")?.addEventListener("click", saveExpForm);

  // Timeline
  el("addTimelineBtn")?.addEventListener("click", () => openTimelineForm());
  el("saveTimelineBtn")?.addEventListener("click", saveTimelineForm);

  // Learning
  el("addLearnBtn")?.addEventListener("click", () => openLearnForm());
  el("saveLearnBtn")?.addEventListener("click", saveLearnForm);

  // Messages
  // (handled per-row above)

  // Settings
  el("saveSettingsBtn")?.addEventListener("click", saveSettingsForm);

  // Delete confirm
  el("confirmDeleteBtn")?.addEventListener("click", executePendingDelete);

  // Reset confirm
  el("confirmResetBtn")?.addEventListener("click", executeReset);

  // Export / Import / Preview / Reset
  el("exportBtn")?.addEventListener("click", handleExport);
  el("importBtn")?.addEventListener("click", handleImport);
  el("resetBtn")?.addEventListener("click", handleReset);
  el("previewBtn")?.addEventListener("click", () => window.open("index.html", "_blank"));
  el("exportBtnSettings")?.addEventListener("click", handleExport);
  el("importBtnSettings")?.addEventListener("click", handleImport);
  el("resetBtnSettings")?.addEventListener("click", handleReset);
  el("previewBtnSettings")?.addEventListener("click", () => window.open("index.html", "_blank"));
}

/* ═══════════════════════════════════════════════════════
   MAIN ADMIN INIT
═══════════════════════════════════════════════════════ */
function initAdminApp() {
  initAdminTheme();
  initSidebar();
  initProfileForm();
  initQuickActions();
  bindGlobalButtons();
  showSection("dashboard");
}

document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  initAuth();
});
