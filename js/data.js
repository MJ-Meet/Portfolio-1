/**
 * data.js — Dynamic Portfolio Data Loader
 * Meet Jethawa (MJ) Portfolio
 * 
 * Centralizes all portfolio records into data/portfolio-full.json.
 * Fetches the JSON dataset asynchronously and populates global state.
 */

let PORTFOLIO_DATA = {};

/**
 * Asynchronously fetch and load portfolio data from JSON
 * @returns {Promise<Object|null>}
 */
async function fetchPortfolioData() {
  try {
    const response = await fetch("data/portfolio-full.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Assign globally
    PORTFOLIO_DATA = data;
    window.PORTFOLIO_DATA = data;
    return data;
  } catch (error) {
    console.error("Failed to load portfolio-full.json:", error);
    if (window.location.protocol === "file:") {
      console.warn(
        "Notice: Browsers block fetch() on file:/// URLs due to CORS security.\n" +
        "To preview the site locally, please use a local web server (e.g. run `python -m http.server 8000` or `npx serve`)."
      );
    }
    return null;
  }
}
