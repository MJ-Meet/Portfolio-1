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
    if (raw !== null) return JSON.parse(raw);
    return DEFAULT_DATA[key] ?? null;
  } catch (e) {
    console.error(`[Storage] loadData error for key "${key}":`, e);
    return DEFAULT_DATA[key] ?? null;
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
   Export Data
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
    const blob = new Blob([json], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "meet-jethawa-portfolio-backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (e) {
    console.error("[Storage] exportData error:", e);
    return false;
  }
}

/* ─────────────────────────────────────────────
   Import Data
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
        // Validate required keys
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
    if (localStorage.getItem(STORAGE_KEYS[key]) === null) {
      saveData(key, DEFAULT_DATA[key]);
    }
  });
}
