/**
 * storage.js — localStorage Management
 * Meet Jethawa (MJ) — Personal Portfolio Management System
 *
 * Centralizes all read/write operations to browser localStorage.
 * All portfolio data is persisted here.
 */

const STORAGE_KEYS = {
  profile:      "portfolio_profile",
  projects:     "portfolio_projects",
  skills:       "portfolio_skills",
  certificates: "portfolio_certificates",
  experience:   "portfolio_experience",
  timeline:     "portfolio_timeline",
  learning:     "portfolio_learning",
  messages:     "portfolio_messages",
  settings:     "portfolio_settings"
};

/* ─────────────────────────────────────────────
   Load Data
   Returns parsed object from localStorage or
   falls back to DEFAULT_DATA if key is missing.
───────────────────────────────────────────── */
function loadData(key) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[key]);
    if (raw !== null && raw !== "" && raw !== "undefined" && raw !== "null") {
      const parsed = JSON.parse(raw);
      if (parsed !== null && parsed !== undefined) return parsed;
    }
    return DEFAULT_DATA[key] !== undefined ? JSON.parse(JSON.stringify(DEFAULT_DATA[key])) : null;
  } catch (e) {
    console.warn(`[Storage] loadData error for key "${key}":`, e);
    return DEFAULT_DATA[key] !== undefined ? JSON.parse(JSON.stringify(DEFAULT_DATA[key])) : null;
  }
}

/* ─────────────────────────────────────────────
   Load All Data
   Returns full portfolio object.
───────────────────────────────────────────── */
function loadAllData() {
  return {
    profile:      loadData("profile"),
    projects:     loadData("projects"),
    skills:       loadData("skills"),
    certificates: loadData("certificates"),
    experience:   loadData("experience"),
    timeline:     loadData("timeline"),
    learning:     loadData("learning"),
    messages:     loadData("messages"),
    settings:     loadData("settings")
  };
}

/* ─────────────────────────────────────────────
   Save Data
   Serializes value and writes to localStorage.
───────────────────────────────────────────── */
function saveData(key, value) {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`[Storage] saveData error for key "${key}":`, e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Update Data (merge for objects)
───────────────────────────────────────────── */
function updateData(key, updates) {
  try {
    const existing = loadData(key);
    if (Array.isArray(existing)) {
      // Array: replace entirely with updates
      return saveData(key, updates);
    } else if (typeof existing === "object" && existing !== null) {
      return saveData(key, { ...existing, ...updates });
    } else {
      return saveData(key, updates);
    }
  } catch (e) {
    console.error(`[Storage] updateData error for key "${key}":`, e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Delete Item from Array by id
───────────────────────────────────────────── */
function deleteData(key, id) {
  try {
    const arr = loadData(key);
    if (!Array.isArray(arr)) return false;
    const filtered = arr.filter(item => item.id !== id);
    return saveData(key, filtered);
  } catch (e) {
    console.error(`[Storage] deleteData error for key "${key}":`, e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Add Item to Array
───────────────────────────────────────────── */
function addItem(key, item) {
  try {
    const arr = loadData(key) || [];
    arr.push(item);
    return saveData(key, arr);
  } catch (e) {
    console.error(`[Storage] addItem error for key "${key}":`, e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Update Item in Array by id
───────────────────────────────────────────── */
function updateItem(key, id, updates) {
  try {
    const arr = loadData(key);
    if (!Array.isArray(arr)) return false;
    const index = arr.findIndex(item => item.id === id);
    if (index === -1) return false;
    arr[index] = { ...arr[index], ...updates };
    return saveData(key, arr);
  } catch (e) {
    console.error(`[Storage] updateItem error for key "${key}":`, e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Reset Data
   Clears all portfolio keys and reloads defaults.
───────────────────────────────────────────── */
function resetData() {
  try {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    // Re-seed with defaults
    Object.keys(STORAGE_KEYS).forEach(k => saveData(k, DEFAULT_DATA[k]));
    return true;
  } catch (e) {
    console.error("[Storage] resetData error:", e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Safe Download Helper
───────────────────────────────────────────── */
function downloadFile(content, filename, mimeType) {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
    return true;
  } catch (e) {
    console.error("[Storage] downloadFile error:", e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Export Data (JSON)
   Triggers a download of all portfolio data.
───────────────────────────────────────────── */
function exportData() {
  try {
    const payload = {
      _exportedAt: new Date().toISOString(),
      _version: "1.0",
      ...loadAllData()
    };
    const json = JSON.stringify(payload, null, 2);
    const dateStr = new Date().toISOString().split("T")[0];
    return downloadFile(json, `meet-jethawa-portfolio-backup-${dateStr}.json`, "application/json");
  } catch (e) {
    console.error("[Storage] exportData error:", e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Import Data (JSON)
   Reads a JSON backup file and loads it into localStorage.
   Returns { success, error }
───────────────────────────────────────────── */
function importData(file) {
  return new Promise((resolve) => {
    if (!file) { resolve({ success: false, error: "No file selected." }); return; }
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        const required = ["profile","projects","skills","certificates","experience","timeline","learning","messages","settings"];
        const missing  = required.filter(k => !(k in parsed));
        if (missing.length > 0) {
          resolve({ success: false, error: `Invalid backup file. Missing keys: ${missing.join(", ")}` });
          return;
        }
        required.forEach(k => saveData(k, parsed[k]));
        resolve({ success: true });
      } catch (err) {
        resolve({ success: false, error: "Invalid JSON file. Could not parse the backup." });
      }
    };
    reader.onerror = () => resolve({ success: false, error: "File read error." });
    reader.readAsText(file);
  });
}

/* ─────────────────────────────────────────────
   CSV Schemas & Utilities (RFC 4180 Compliant)
───────────────────────────────────────────── */
const CSV_SCHEMAS = {
  projects: [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "shortDescription", label: "Short Description" },
    { key: "fullDescription", label: "Full Description" },
    { key: "technologies", label: "Technologies" },
    { key: "github", label: "GitHub URL" },
    { key: "demo", label: "Demo URL" },
    { key: "image", label: "Image URL" },
    { key: "date", label: "Date" },
    { key: "featured", label: "Featured" },
    { key: "order", label: "Order" }
  ],
  skills: [
    { key: "id", label: "ID" },
    { key: "name", label: "Skill Name" },
    { key: "category", label: "Category" },
    { key: "level", label: "Level" },
    { key: "percentage", label: "Percentage" },
    { key: "icon", label: "Icon" },
    { key: "description", label: "Description" }
  ],
  certificates: [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "issuer", label: "Issuer" },
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "verification", label: "Verification URL" },
    { key: "image", label: "Image" }
  ],
  experience: [
    { key: "id", label: "ID" },
    { key: "organization", label: "Organization" },
    { key: "role", label: "Role" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "location", label: "Location" },
    { key: "skills", label: "Skills" },
    { key: "description", label: "Description" },
    { key: "certificateUrl", label: "Certificate URL" }
  ],
  timeline: [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "icon", label: "Icon" },
    { key: "description", label: "Description" }
  ],
  learning: [
    { key: "id", label: "ID" },
    { key: "topic", label: "Topic" },
    { key: "progress", label: "Progress" },
    { key: "description", label: "Description" }
  ],
  messages: [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    { key: "message", label: "Message" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" }
  ]
};

function escapeCsvCell(val) {
  if (val === null || val === undefined) return '""';
  if (Array.isArray(val)) val = val.join("; ");
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

function generateCsv(schema, rows) {
  const headerLine = schema.map(h => `"${h.label}"`).join(",");
  const dataLines = (rows || []).map(row => {
    return schema.map(h => escapeCsvCell(row[h.key])).join(",");
  });
  // Prefix with \uFEFF for seamless UTF-8 display in Microsoft Excel & Google Sheets
  return "\uFEFF" + [headerLine, ...dataLines].join("\r\n");
}

function parseCsv(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let cell = "";

  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && next === '\n') i++;
      row.push(cell.trim());
      if (row.length > 0 && row.some(c => c !== "")) lines.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    if (row.some(c => c !== "")) lines.push(row);
  }
  return lines;
}

function exportCollectionCSV(name) {
  try {
    const schema = CSV_SCHEMAS[name];
    if (!schema) throw new Error("Unknown collection: " + name);
    const data = loadData(name) || [];
    const csvContent = generateCsv(schema, data);
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `portfolio-${name}-${dateStr}.csv`;
    return downloadFile(csvContent, filename, "text/csv;charset=utf-8;");
  } catch (e) {
    console.error(`[Storage] exportCollectionCSV error for "${name}":`, e);
    return false;
  }
}

function importCollectionCSV(name, file) {
  return new Promise((resolve) => {
    if (!file) { resolve({ success: false, error: "No file selected." }); return; }
    const schema = CSV_SCHEMAS[name];
    if (!schema) { resolve({ success: false, error: "Unknown collection type." }); return; }

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const text = e.target.result;
        const rows = parseCsv(text);
        if (rows.length < 2) {
          resolve({ success: false, error: "CSV file is empty or missing headers." });
          return;
        }

        const headerRow = rows[0].map(h => h.trim().toLowerCase());
        const dataRows = rows.slice(1);

        const colMap = {};
        schema.forEach(field => {
          const idx = headerRow.findIndex(h =>
            h === field.label.toLowerCase() ||
            h === field.key.toLowerCase() ||
            h.replace(/[^a-z0-9]/g, "") === field.key.toLowerCase().replace(/[^a-z0-9]/g, "")
          );
          if (idx !== -1) colMap[field.key] = idx;
        });

        const items = dataRows.map((row) => {
          const item = {};
          schema.forEach(field => {
            const idx = colMap[field.key];
            const val = idx !== undefined && idx < row.length ? row[idx] : "";
            if (field.key === "technologies" || (field.key === "skills" && name === "experience")) {
              item[field.key] = val ? val.split(/[;,]/).map(s => s.trim()).filter(Boolean) : [];
            } else if (field.key === "featured") {
              item[field.key] = val.toLowerCase() === "true" || val === "1" || val.toLowerCase() === "yes";
            } else if (field.key === "percentage" || field.key === "progress" || field.key === "order") {
              item[field.key] = parseInt(val) || 0;
            } else {
              item[field.key] = val;
            }
          });
          if (!item.id) {
            item.id = generateId(name.slice(0, 3));
          }
          return item;
        });

        saveData(name, items);
        resolve({ success: true, count: items.length });
      } catch (err) {
        resolve({ success: false, error: err.message || "Failed to parse CSV." });
      }
    };
    reader.onerror = () => resolve({ success: false, error: "File read error." });
    reader.readAsText(file);
  });
}

/* ─────────────────────────────────────────────
   Generate Unique ID
───────────────────────────────────────────── */
function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/* ─────────────────────────────────────────────
   Initialize Storage
   Seeds defaults if localStorage is empty.
───────────────────────────────────────────── */
function initStorage() {
  Object.keys(STORAGE_KEYS).forEach(key => {
    const raw = localStorage.getItem(STORAGE_KEYS[key]);
    if (raw === null || raw === "undefined" || raw === "null" || raw === "") {
      saveData(key, DEFAULT_DATA[key]);
    }
  });
}
