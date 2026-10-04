/**
 * data.js — Personal Portfolio Data for Meet Jethawa (MJ)
 * Computer Science Student | AI/ML | Data Analytics
 *
 * Update your information, projects, skills, and certificates directly here.
 * Files (photos, resume, certificate scans, project screenshots) go in the /assets folder.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Meet Jethawa",
    shortName: "MJ",
    title: "Meet Jethawa — AI/ML & Data Science Portfolio",
    headline: "Computer Science Student | AI/ML | Data Analytics",
    heroBadge: "✨ Available for AI/ML & Data Internships",
    bio: "I'm a passionate Computer Science student specializing in Artificial Intelligence, Machine Learning, and Data Analytics. I love building intelligent software systems that turn raw data into actionable insights and deploying autonomous AI agents.",
    aboutText: "I am a dedicated Computer Science undergraduate with a deep focus on machine learning algorithms, deep learning models, data exploration, and intelligent systems. Through hands-on projects and virtual internships with organizations like IBM and Edunet Foundation, I have developed expertise in building NLP summarizers, predictive analytics models, and agentic workflows.",
    careerObjective: "To leverage artificial intelligence, machine learning, and advanced analytics to solve high-impact, real-world problems while continuously expanding my technical mastery in Generative AI, LLMs, and intelligent autonomous agents.",
    education: "B.Tech / B.Sc. in Computer Science (Ongoing)",
    location: "Gujarat, India",
    email: "meetjethava07@gmail.com",
    phone: "+91 98765 43210",
    github: "https://github.com/MJ-Meet",
    linkedin: "https://linkedin.com/in/meetjethawa",
    resume: "assets/resume/resume.pdf",
    profileImage: "assets/images/profile.jpg",
    currentFocus: "Generative AI, Large Language Models (LLMs) & Agentic AI",
    heroTagline: "Engineering the Future with AI, Machine Learning & Data Intelligence",
    typingPhrases: [
      "AI & Machine Learning Enthusiast",
      "Data Analytics & Insights Explorer",
      "Python & Deep Learning Developer",
      "Agentic AI & LLMs Explorer",
      "Computer Science Student"
    ],
    stats: {
      projectsCount: 5,
      skillsCount: 15,
      certificatesCount: 3,
      experienceCount: 1
    }
  },

  projects: [
    {
      id: "proj_mechmind",
      title: "MechMind — Agentic AI Assistant",
      category: "AI/ML",
      badge: "Featured AI Project",
      shortDescription: "An intelligent autonomous agent system built on IBM Watsonx ecosystem to assist mechanical engineers with rapid technical solutions.",
      fullDescription: "MechMind is an agentic AI solution engineered using IBM Watsonx. It harnesses the power of multi-agent LLM architectures to automate troubleshooting, technical literature queries, and domain-specific engineering equations. The system utilizes semantic search, prompt chaining, and tool-augmented LLM reasoning to ensure zero hallucinations and rapid information retrieval.",
      technologies: ["Python", "IBM Watsonx", "Agentic AI", "LangChain", "LLMs", "NLP"],
      image: "assets/projects/mechmind.jpg",
      github: "https://github.com/MJ-Meet/Portfolio-1",
      demo: "https://portfolio-1-mj-meets-projects.vercel.app",
      date: "2024",
      featured: true,
      highlights: [
        "Multi-agent autonomous architecture for context-aware engineering support",
        "Integrated with IBM Watsonx foundation models",
        "Sub-second response time for domain technical lookups"
      ]
    },
    {
      id: "proj_life_pattern",
      title: "Life Pattern Detector & Analytics",
      category: "Data Analytics",
      badge: "Data Science",
      shortDescription: "An end-to-end data analytics platform detecting lifestyle patterns, habit anomalies, and productivity insights from multi-stream behavioral data.",
      fullDescription: "Life Pattern Detector processes behavioral time-series data to identify correlations between sleep, daily habits, screen time, and peak productivity hours. Utilizing Pandas for heavy feature engineering and Matplotlib/Seaborn for interactive exploratory analysis, the platform produces actionable health and routine recommendations.",
      technologies: ["Python", "Data Analytics", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      image: "assets/projects/life-pattern.jpg",
      github: "https://github.com/MJ-Meet/Portfolio-1",
      demo: "https://portfolio-1-mj-meets-projects.vercel.app",
      date: "2024",
      featured: true,
      highlights: [
        "Processed high-dimensional lifestyle logs with statistical outlier detection",
        "Generated visual insight dashboards and correlation heatmaps",
        "Empowers users to optimize daily focus cycles and recovery"
      ]
    },
    {
      id: "proj_ai_summarizer",
      title: "AI Note & Document Summarizer",
      category: "AI/ML",
      badge: "NLP System",
      shortDescription: "A natural language processing application that transforms voluminous notes and academic papers into concise executive summaries.",
      fullDescription: "AI Note Summarizer utilizes advanced extractive and abstractive NLP algorithms to ingest extensive lecture notes, technical PDFs, and research papers, returning structured bullet points and key takeaway highlights. Built with a clean Python backend and optimized text tokenization pipelines.",
      technologies: ["Python", "NLP", "TextRank", "Transformers", "Streamlit/Web"],
      image: "assets/projects/ai-summarizer.jpg",
      github: "https://github.com/MJ-Meet/Portfolio-1",
      demo: "https://portfolio-1-mj-meets-projects.vercel.app",
      date: "2024",
      featured: true,
      highlights: [
        "Reduces reading time by 75% while preserving critical domain context",
        "Supports structured export in Markdown, PDF, and text formats",
        "Handles multi-page technical documentation with keyword extraction"
      ]
    },
    {
      id: "proj_campus_go",
      title: "Campus Go — Interactive Portal",
      category: "Web Development",
      badge: "Web App",
      shortDescription: "A modern, responsive campus navigation and resource discovery hub designed for university students, faculty, and visitors.",
      fullDescription: "Campus Go delivers an intuitive student-centric interface for campus facility directories, real-time event discovery, and student club portals. Engineered with high-performance semantic HTML5, modern CSS3 animations, and Bootstrap 5 for seamless accessibility across smartphones and desktops.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Responsive UI"],
      image: "assets/projects/campus-go.jpg",
      github: "https://github.com/MJ-Meet/Portfolio-1",
      demo: "https://portfolio-1-mj-meets-projects.vercel.app",
      date: "2024",
      featured: false,
      highlights: [
        "Fully responsive mobile-first architecture",
        "Dynamic search and categorised facility filtering",
        "Instant event schedule lookup"
      ]
    },
    {
      id: "proj_iris_classification",
      title: "Iris Classification & ML Benchmark",
      category: "Machine Learning",
      badge: "ML Benchmark",
      shortDescription: "A machine learning benchmarking suite comparing Decision Trees, SVM, KNN, and Logistic Regression with cross-validation.",
      fullDescription: "A comprehensive machine learning implementation exploring feature correlations, hyperparameter tuning, and decision boundaries across multi-class datasets. Evaluates precision, recall, F1-scores, and confusion matrices to compare linear versus non-linear algorithmic performance.",
      technologies: ["Python", "scikit-learn", "Machine Learning", "Pandas", "Data Visualization"],
      image: "assets/projects/iris-classification.jpg",
      github: "https://github.com/MJ-Meet/Portfolio-1",
      demo: "https://portfolio-1-mj-meets-projects.vercel.app",
      date: "2023",
      featured: false,
      highlights: [
        "Achieved 98%+ validation accuracy with optimized decision boundaries",
        "Comparative ROC-AUC and confusion matrix visualizations",
        "Modular scikit-learn training pipeline"
      ]
    }
  ],

  skills: [
    // Programming & ML
    { id: "sk_python", name: "Python", category: "Programming", level: "Advanced", percentage: 88, icon: "bi-filetype-py", color: "#3776ab", description: "Core language for ML algorithms, data pipelines, and automation." },
    { id: "sk_ml", name: "Machine Learning", category: "AI & ML", level: "Intermediate", percentage: 80, icon: "bi-cpu", color: "#8b5cf6", description: "Supervised & unsupervised learning with scikit-learn, regression, classification." },
    { id: "sk_genai", name: "Generative AI & LLMs", category: "AI & ML", level: "Exploring", percentage: 70, icon: "bi-stars", color: "#ec4899", description: "Prompt engineering, LLM integration, IBM Watsonx, and autonomous agents." },
    { id: "sk_nlp", name: "Natural Language Processing", category: "AI & ML", level: "Intermediate", percentage: 75, icon: "bi-chat-square-quote", color: "#06b6d4", description: "Text summarization, tokenization, semantic embeddings, and analysis." },

    // Data Science & Analytics
    { id: "sk_pandas", name: "Pandas & Data Wrangling", category: "Data Science", level: "Advanced", percentage: 85, icon: "bi-table", color: "#150458", description: "High-performance data cleaning, aggregation, transformation, and manipulation." },
    { id: "sk_numpy", name: "NumPy", category: "Data Science", level: "Intermediate", percentage: 80, icon: "bi-calculator", color: "#4d77cf", description: "Vectorized numerical computing, matrix mathematics, and array operations." },
    { id: "sk_dataviz", name: "Data Visualization", category: "Data Science", level: "Intermediate", percentage: 78, icon: "bi-bar-chart-line", color: "#f59e0b", description: "Storytelling with data using Matplotlib, Seaborn, and interactive charts." },
    { id: "sk_sql", name: "SQL & Databases", category: "Data Science", level: "Intermediate", percentage: 72, icon: "bi-database", color: "#0284c7", description: "Relational database querying, joins, aggregations, and data retrieval." },

    // Web & Development
    { id: "sk_bootstrap", name: "Bootstrap 5", category: "Web Development", level: "Advanced", percentage: 85, icon: "bi-bootstrap", color: "#7952b3", description: "Rapid, stylish, responsive modern UI styling and component architecture." },
    { id: "sk_js", name: "JavaScript (ES6+)", category: "Web Development", level: "Intermediate", percentage: 75, icon: "bi-filetype-js", color: "#eab308", description: "Interactive client-side web applications, DOM manipulation, async APIs." },
    { id: "sk_html_css", name: "HTML5 & Modern CSS3", category: "Web Development", level: "Advanced", percentage: 88, icon: "bi-filetype-html", color: "#e34f26", description: "Semantic markup, modern flexbox, CSS grid, glassmorphism, responsive UX." },

    // Tools & Engineering
    { id: "sk_git", name: "Git & Version Control", category: "Tools", level: "Intermediate", percentage: 80, icon: "bi-git", color: "#f05032", description: "Branching strategies, collaborative workflows, and code versioning." },
    { id: "sk_github", name: "GitHub", category: "Tools", level: "Intermediate", percentage: 82, icon: "bi-github", color: "#333", description: "Open-source collaboration, repository management, and deployment pipelines." },
    { id: "sk_cloud", name: "Cloud & Watsonx", category: "Tools", level: "Intermediate", percentage: 68, icon: "bi-cloud-check", color: "#0ea5e9", description: "Cloud computing fundamentals and IBM Watsonx cloud infrastructure." },
    { id: "sk_algorithms", name: "Algorithms & Problem Solving", category: "Programming", level: "Intermediate", percentage: 75, icon: "bi-diagram-3", color: "#10b981", description: "Algorithmic thinking, data structures, and computational optimization." }
  ],

  certificates: [
    {
      id: "cert_ibm",
      title: "AI & Cloud Virtual Internship",
      issuer: "IBM × Edunet Foundation",
      date: "2024",
      badge: "Industry Credential",
      category: "Artificial Intelligence",
      description: "Comprehensive virtual internship program focusing on AI fundamentals, IBM Watsonx ecosystem, cloud computing foundations, and practical agent development.",
      image: "assets/certificates/certificate-ibm.jpg",
      verification: "https://www.edunetfoundation.org",
      skills: ["IBM Watsonx", "Agentic AI", "Cloud Computing", "Python"]
    },
    {
      id: "cert_python_ds",
      title: "Python for Data Science & Machine Learning",
      issuer: "Data Science Specialization",
      date: "2024",
      badge: "Data Science",
      category: "Data Science",
      description: "Mastery of Python data stacks including Pandas, NumPy, scikit-learn, exploratory data analysis, data pre-processing, and predictive machine learning models.",
      image: "assets/certificates/certificate-python.jpg",
      verification: "",
      skills: ["Python", "Pandas", "NumPy", "Data Analytics"]
    },
    {
      id: "cert_ml_foundations",
      title: "Machine Learning Foundations & Algorithms",
      issuer: "AI Learning Track",
      date: "2024",
      badge: "Machine Learning",
      category: "Machine Learning",
      description: "Foundational mastery of supervised and unsupervised machine learning algorithms, model evaluation metrics, cross-validation, and decision theory.",
      image: "assets/certificates/certificate-ml.jpg",
      verification: "",
      skills: ["Supervised ML", "Model Evaluation", "scikit-learn"]
    }
  ],

  experience: [
    {
      id: "exp_ibm",
      organization: "IBM × Edunet Foundation",
      role: "AI & Cloud Intern (Virtual)",
      period: "2024",
      badge: "Internship",
      location: "Virtual / Remote",
      description: "Completed an intensive industry-led internship exploring modern Artificial Intelligence and cloud deployments. Developed MechMind, an agentic AI engineering assistant leveraging IBM Watsonx foundation models. Gained real-world insights into building autonomous multi-agent pipelines and cloud solutions.",
      skills: ["IBM Watsonx", "Agentic AI", "Python", "Cloud Architecture"]
    }
  ],

  timeline: [
    {
      year: "2024 - Present",
      title: "Specializing in Generative AI & Agentic Systems",
      subtitle: "Independent Exploration & Research",
      description: "Deepening focus into autonomous AI agents, prompt chaining, large language model integration, and building real-world intelligent assistants.",
      icon: "bi-robot"
    },
    {
      year: "2024",
      title: "AI & Cloud Internship",
      subtitle: "IBM × Edunet Foundation",
      description: "Built the MechMind AI agent on IBM Watsonx, gained practical exposure to enterprise AI tools, cloud architectures, and machine learning pipelines.",
      icon: "bi-briefcase"
    },
    {
      year: "2023 - 2024",
      title: "Machine Learning & Data Analytics",
      subtitle: "Hands-on Project Development",
      description: "Implemented end-to-end data analytics and ML classification systems including Life Pattern Detector and Iris Flower classification benchmark.",
      icon: "bi-graph-up"
    },
    {
      year: "2022 - 2023",
      title: "Computer Science & Python Foundations",
      subtitle: "University Academics",
      description: "Established core engineering fundamentals, object-oriented programming in Python, algorithmic thinking, and web design with HTML, CSS, JavaScript, and Bootstrap.",
      icon: "bi-mortarboard"
    }
  ]
};

// Aliases for compatibility
const DEFAULT_DATA = PORTFOLIO_DATA;
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
  window.DEFAULT_DATA = DEFAULT_DATA;
}
