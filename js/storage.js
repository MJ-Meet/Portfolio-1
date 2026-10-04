/**
 * storage.js — Portfolio Utilities & Preferences
 * Meet Jethawa (MJ) Portfolio
 */

// Theme preference
function getPreferredTheme() {
  const stored = localStorage.getItem("mj_portfolio_theme");
  if (stored) return stored;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem("mj_portfolio_theme", theme);
  } catch (e) {
    console.warn("Could not save theme preference:", e);
  }
}

// Contact form message storage
function saveContactMessage(msg) {
  try {
    const raw = localStorage.getItem("mj_portfolio_messages");
    const list = raw ? JSON.parse(raw) : [];
    list.unshift({
      ...msg,
      id: "msg_" + Date.now(),
      date: new Date().toISOString()
    });
    localStorage.setItem("mj_portfolio_messages", JSON.stringify(list));
    return true;
  } catch (e) {
    console.warn("Could not save contact message:", e);
    return false;
  }
}

// Safe helper to access data
function loadPortfolioData() {
  return window.PORTFOLIO_DATA || (typeof PORTFOLIO_DATA !== "undefined" ? PORTFOLIO_DATA : {});
}
