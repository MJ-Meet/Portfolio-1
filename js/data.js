/**
 * data.js — Dynamic Modular Portfolio Data Loader
 * Meet Jethawa (MJ) Portfolio
 * 
 * Fetches dedicated domain JSON datasets in parallel from data/
 * (profile, skills, projects, experience, certificates, journey, achievements)
 * and merges them into a clean, reactive global state.
 */

let PORTFOLIO_DATA = {};

/**
 * Asynchronously fetch and load portfolio data from modular JSON files
 * @returns {Promise<Object|null>}
 */
async function fetchPortfolioData() {
  try {
    const [
      profile,
      skills,
      projects,
      experience,
      certificates,
      journey,
      achievements
    ] = await Promise.all([
      fetch("data/profile.json").then(r => {
        if (!r.ok) throw new Error("profile.json not found");
        return r.json();
      }),
      fetch("data/skills.json").then(r => {
        if (!r.ok) throw new Error("skills.json not found");
        return r.json();
      }),
      fetch("data/projects.json").then(r => {
        if (!r.ok) throw new Error("projects.json not found");
        return r.json();
      }),
      fetch("data/experience.json").then(r => {
        if (!r.ok) throw new Error("experience.json not found");
        return r.json();
      }),
      fetch("data/certificates.json").then(r => {
        if (!r.ok) throw new Error("certificates.json not found");
        return r.json();
      }),
      fetch("data/journey.json").then(r => {
        if (!r.ok) throw new Error("journey.json not found");
        return r.json();
      }),
      fetch("data/achievements.json").then(r => {
        if (!r.ok) throw new Error("achievements.json not found");
        return r.json();
      })
    ]);

    const data = {
      profile,
      skills,
      projects,
      experience,
      certificates,
      journey,
      achievements
    };

    // Assign globally
    PORTFOLIO_DATA = data;
    window.PORTFOLIO_DATA = data;
    return data;
  } catch (error) {
    console.error("Failed to load modular portfolio JSON datasets:", error);
    if (window.location.protocol === "file:") {
      console.warn(
        "Notice: Browsers block fetch() on file:/// URLs due to CORS security.\n" +
        "To preview the site locally, please use a local web server (e.g. run `python -m http.server 8000` or `npx serve`)."
      );
    }
    return null;
  }
}
