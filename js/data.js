/**
 * data.js — Personal Portfolio Data for Meet Jethawa (MJ)
 * Computer Science Student | AI/ML | Data Analytics
 * Updated with exact details from MJ_Resume.pdf
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Meet Jethawa",
    shortName: "MJ",
    title: "Meet Jethawa — Generative AI & Data Analytics Portfolio",
    headline: "Computer Science Undergraduate | Generative AI | Data Analytics | Cloud Infrastructure",
    heroBadge: "✨ Oracle & SAP Certified | Generative AI & Cloud",
    bio: "Motivated Computer Science undergraduate at Indus University with hands-on expertise in Data Analytics, Generative AI, RAG Architectures, and Cloud Infrastructure. Certified by Oracle, SAP, and Tata in AI-powered analytics and enterprise cloud platforms.",
    aboutText: "I am a Computer Science student at Indus University with deep practical focus on Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and Business Intelligence. I have earned industry credentials from Oracle, SAP, and Tata, and developed enterprise-grade prototypes spanning RAG chatbots on Oracle Cloud Infrastructure (OCI) and automated data storytelling with SAP Analytics Cloud.",
    careerObjective: "Seeking a software engineering or data-focused internship role at leading technology organizations to build intelligent systems, scale generative AI architectures, and apply analytical problem-solving at scale.",
    education: "B.Tech in Computer Science and Engineering — Indus University (2024 – 2028)",
    location: "Ahmedabad, Gujarat, India",
    email: "meetjethava07@gmail.com",
    phone: "+91 83208 40035",
    github: "https://github.com/MJ-Meet",
    linkedin: "https://linkedin.com/in/meet-jethawa",
    resume: "assets/resume/MJ_Resume.pdf",
    profileImage: "assets/images/meet.png",
    currentFocus: "RAG Architecture, OCI Generative AI, SAP Analytics Cloud & Agentic Systems",
    heroTagline: "Engineering the Future with Generative AI, Cloud Infrastructure & Data Analytics",
    typingPhrases: [
      "Generative AI & LLMs Developer",
      "Oracle Certified OCI GenAI Professional",
      "SAP Certified Data Analyst",
      "RAG Architecture & Prompt Engineer",
      "Computer Science Student @ Indus University"
    ],
    stats: {
      projectsCount: 5,
      skillsCount: 16,
      certificatesCount: 5,
      experienceCount: 1
    }
  },

  projects: [
    {
      id: "proj_rag_chatbot",
      title: "RAG-Based Intelligent Chatbot",
      category: "AI/ML",
      badge: "Oracle OCI GenAI",
      shortDescription: "Enterprise Retrieval-Augmented Generation (RAG) chatbot built on Oracle Cloud Infrastructure Generative AI Service with vector database retrieval.",
      fullDescription: "Architected and deployed an enterprise Retrieval-Augmented Generation (RAG) chatbot using the Oracle Cloud Infrastructure (OCI) Generative AI Service. Integrated high-dimensional vector databases for sub-second semantic retrieval across technical documents, optimized prompt chaining to reduce hallucinations by 40%, and built a scalable architecture supporting 100+ concurrent queries.",
      technologies: ["Python", "Oracle Cloud (OCI)", "OCI GenAI Service", "LLMs", "RAG", "Vector Databases", "Prompt Engineering"],
      image: "assets/projects/project-placeholder.svg",
      github: "https://github.com/MJ-Meet",
      demo: "",
      date: "2025",
      featured: true,
      highlights: [
        "Deployed on Oracle Cloud Infrastructure (OCI) Generative AI Service",
        "Integrated vector databases for semantic document search",
        "Reduced hallucinations by 40% with advanced prompt engineering",
        "Sub-2-second response times under 100+ concurrent user loads"
      ]
    },
    {
      id: "proj_genai_analytics",
      title: "GenAI-Powered Data Analytics Platform",
      category: "Data Analytics",
      badge: "SAP Analytics Cloud",
      shortDescription: "An AI-driven analytics solution combining Python and SAP Analytics Cloud for automated insights generation and strategic forecasting.",
      fullDescription: "Developed an AI-driven analytics platform leveraging generative AI for automated data storytelling, KPI correlation, and natural language summary generation. Integrated with SAP Analytics Cloud (SAC) to produce interactive visual dashboards, predictive models, and planning workflows, reducing manual analysis time by 60%.",
      technologies: ["Python", "SAP Analytics Cloud", "Generative AI", "Predictive Analytics", "Data Storytelling"],
      image: "assets/projects/project-placeholder.svg",
      github: "https://github.com/MJ-Meet",
      demo: "",
      date: "2025",
      featured: true,
      highlights: [
        "Reduced manual reporting time by 60% with automated AI storytelling",
        "Constructed predictive models and planning workflows in SAP Analytics Cloud",
        "Designed executive KPI monitoring dashboards for strategic decision-making"
      ]
    },
    {
      id: "proj_sac_dashboard",
      title: "Enterprise Data Analytics Dashboard",
      category: "Data Analytics",
      badge: "Business Intelligence",
      shortDescription: "Interactive multi-dimensional data dashboards with drill-down capabilities for business KPI monitoring using SAP Analytics Cloud.",
      fullDescription: "Designed and built interactive data dashboards with comprehensive drill-down capabilities for monitoring mission-critical business KPIs. Applied advanced data modeling, story-creation techniques, and dimension hierarchy structures to transform raw enterprise datasets into actionable visual insights.",
      technologies: ["SAP Analytics Cloud", "Data Modeling", "Business Intelligence", "KPI Monitoring", "Data Visualization"],
      image: "assets/projects/project-placeholder.svg",
      github: "https://github.com/MJ-Meet",
      demo: "",
      date: "2026",
      featured: true,
      highlights: [
        "Interactive drill-down analytics for real-time KPI observation",
        "Engineered robust data models and multidimensional stories",
        "Empowered stakeholders with instant executive summaries"
      ]
    },
    {
      id: "proj_mechmind",
      title: "MechMind — Agentic AI Assistant",
      category: "AI/ML",
      badge: "Agentic AI",
      shortDescription: "An intelligent autonomous agent system engineered to assist engineers with rapid technical solutions and automated reasoning.",
      fullDescription: "MechMind is an agentic AI solution leveraging foundation models and autonomous multi-agent pipelines to assist users with technical problem-solving, engineering formula lookups, and literature queries.",
      technologies: ["Python", "Agentic AI", "LLMs", "LangChain", "NLP"],
      image: "assets/projects/project-placeholder.svg",
      github: "https://github.com/MJ-Meet",
      demo: "",
      date: "2024",
      featured: false,
      highlights: [
        "Autonomous multi-agent architecture for context-aware support",
        "Sub-second lookup for domain-specific engineering workflows"
      ]
    },
    {
      id: "proj_iris_benchmark",
      title: "Machine Learning Benchmarking Suite",
      category: "Machine Learning",
      badge: "ML Suite",
      shortDescription: "Comparative machine learning implementation evaluating Decision Trees, SVM, KNN, and Logistic Regression with cross-validation.",
      fullDescription: "Benchmarking machine learning algorithms across classification metrics including precision, recall, F1-score, and confusion matrices using scikit-learn, Pandas, and Matplotlib.",
      technologies: ["Python", "scikit-learn", "Machine Learning", "Pandas", "Matplotlib"],
      image: "assets/projects/project-placeholder.svg",
      github: "https://github.com/MJ-Meet",
      demo: "",
      date: "2024",
      featured: false,
      highlights: [
        "Cross-validated classification models with 98%+ accuracy",
        "Generated ROC-AUC curves and comparative evaluation matrices"
      ]
    }
  ],

  skills: [
    // Programming Languages
    { id: "sk_python", name: "Python", category: "Programming", level: "Advanced", percentage: 88, icon: "bi-filetype-py", color: "#3776ab", description: "Primary language for GenAI, ML algorithms, data pipelines, and automation." },
    { id: "sk_cpp", name: "C / C++", category: "Programming", level: "Advanced", percentage: 85, icon: "bi-filetype-raw", color: "#00599c", description: "Strong foundation in data structures, algorithms, and computational efficiency." },
    { id: "sk_java", name: "Java", category: "Programming", level: "Intermediate", percentage: 75, icon: "bi-filetype-java", color: "#e76f00", description: "Object-oriented software development and enterprise fundamentals." },
    { id: "sk_sql", name: "SQL", category: "Programming", level: "Intermediate", percentage: 80, icon: "bi-database", color: "#0284c7", description: "Relational queries, database management, schema design, and data retrieval." },
    { id: "sk_js", name: "JavaScript", category: "Web Development", level: "Intermediate", percentage: 75, icon: "bi-filetype-js", color: "#eab308", description: "Modern ES6+ development, DOM manipulation, asynchronous APIs." },

    // AI & Generative AI
    { id: "sk_genai", name: "Generative AI & LLMs", category: "AI & ML", level: "Advanced", percentage: 88, icon: "bi-stars", color: "#ec4899", description: "Large Language Models, OCI GenAI Service, prompt engineering, and token optimization." },
    { id: "sk_rag", name: "RAG Architecture", category: "AI & ML", level: "Advanced", percentage: 85, icon: "bi-diagram-3", color: "#8b5cf6", description: "Retrieval-Augmented Generation, vector databases, and semantic search pipelines." },
    { id: "sk_prompting", name: "Prompt Engineering", category: "AI & ML", level: "Advanced", percentage: 90, icon: "bi-chat-left-quote", color: "#06b6d4", description: "Chain-of-thought, few-shot prompting, and hallucination reduction techniques." },
    { id: "sk_ml", name: "Machine Learning", category: "AI & ML", level: "Intermediate", percentage: 80, icon: "bi-cpu", color: "#6366f1", description: "Supervised and unsupervised learning, model benchmarking, and scikit-learn." },

    // Cloud Platforms
    { id: "sk_oci", name: "Oracle Cloud (OCI)", category: "Cloud & Tools", level: "Certified", percentage: 85, icon: "bi-cloud-check", color: "#f80000", description: "OCI Generative AI Service, cloud compute, architecture deployment, and AI services." },

    // Analytics & BI Tools
    { id: "sk_sac", name: "SAP Analytics Cloud (SAC)", category: "Data Science", level: "Certified", percentage: 88, icon: "bi-bar-chart-steps", color: "#008fd3", description: "Data modeling, story creation, predictive analytics, planning, and forecasting." },
    { id: "sk_dataviz", name: "Data Visualization", category: "Data Science", level: "Intermediate", percentage: 82, icon: "bi-graph-up", color: "#f59e0b", description: "Transforming raw numbers into executive visual stories and interactive charts." },
    { id: "sk_pandas", name: "Pandas & NumPy", category: "Data Science", level: "Intermediate", percentage: 80, icon: "bi-table", color: "#150458", description: "Exploratory data analysis (EDA), data cleaning, and vectorized computation." },

    // Developer Tools
    { id: "sk_git", name: "Git & GitHub", category: "Cloud & Tools", level: "Intermediate", percentage: 82, icon: "bi-github", color: "#333", description: "Version control, collaborative workflows, and repository management." },
    { id: "sk_rest", name: "REST APIs", category: "Cloud & Tools", level: "Intermediate", percentage: 78, icon: "bi-arrow-left-right", color: "#10b981", description: "API consumption, integration with cloud foundation models, and web services." },
    { id: "sk_dsa", name: "Data Structures & Algorithms", category: "Programming", level: "Advanced", percentage: 84, icon: "bi-code-square", color: "#4f46e5", description: "Algorithmic problem-solving, complexity analysis, and efficient data processing." }
  ],

  certificates: [
    {
      id: "cert_oracle_oci",
      title: "Oracle Cloud Infrastructure 2025 Generative AI Professional",
      issuer: "Oracle",
      date: "2025",
      badge: "Oracle Certified Professional",
      category: "Generative AI",
      description: "Validated professional expertise in deploying and managing generative AI solutions on Oracle Cloud Infrastructure (OCI), including large language models, AI services, and cloud-native architectures.",
      image: "assets/certificates/certificate-placeholder.svg",
      verification: "https://www.oracle.com",
      skills: ["Oracle Cloud Infrastructure", "OCI Generative AI Service", "LLMs", "RAG"]
    },
    {
      id: "cert_sap_sac",
      title: "SAP Certified — Data Analyst, SAP Analytics Cloud",
      issuer: "SAP",
      date: "2026",
      badge: "Industry Certified",
      category: "Data Analytics",
      description: "Industry-recognized certification validating mastery in data modeling, story creation, predictive analytics, planning, and executive dashboard design within SAP Analytics Cloud.",
      image: "assets/certificates/certificate-placeholder.svg",
      verification: "https://www.sap.com",
      skills: ["SAP Analytics Cloud", "Data Modeling", "Predictive Analytics", "Planning & Forecasting"]
    },
    {
      id: "cert_tata_genai",
      title: "Tata GenAI Powered Data Analytics Job Simulation",
      issuer: "Tata / Forage",
      date: "2025",
      badge: "Job Simulation",
      category: "Data Science",
      description: "Completed real-world simulation involving AI-assisted data analysis, business insight generation, and presenting data-driven recommendations to enterprise stakeholders.",
      image: "assets/certificates/certificate-placeholder.svg",
      verification: "https://www.theforage.com",
      skills: ["Generative AI", "Business Intelligence", "Data Analytics", "Executive Storytelling"]
    },
    {
      id: "cert_sap_fundamentals",
      title: "Data Fundamentals",
      issuer: "SAP",
      date: "2026",
      badge: "Core Data",
      category: "Data Science",
      description: "Covered foundational concepts in modern data management, data warehousing architectures, and automated analytics pipelines.",
      image: "assets/certificates/certificate-placeholder.svg",
      verification: "https://www.sap.com",
      skills: ["Data Management", "Data Warehousing", "Analytics Pipelines"]
    },
    {
      id: "cert_sap_planning",
      title: "Performing Manual Planning with SAP Analytics Cloud",
      issuer: "SAP",
      date: "2026",
      badge: "Advanced Planning",
      category: "Data Analytics",
      description: "Hands-on professional training in building and managing multi-version planning models, version management, and data entry workflows in SAP Analytics Cloud.",
      image: "assets/certificates/certificate-placeholder.svg",
      verification: "https://www.sap.com",
      skills: ["Planning Models", "Version Management", "SAP Analytics Cloud"]
    }
  ],

  experience: [
    {
      id: "exp_student_innovator",
      organization: "Indus University",
      role: "Student Technology Innovator",
      period: "June 2024 – Present",
      badge: "Leadership & Innovation",
      location: "Ahmedabad, Gujarat, India",
      description: "Leading university initiatives to integrate AI and cloud technologies into academic projects and research. Mentoring peers on generative AI applications and cloud computing best practices, and collaborating with faculty on research exploring real-world applications of LLMs.",
      skills: ["Generative AI", "Cloud Computing", "Peer Mentorship", "LLM Research", "Leadership"]
    }
  ],

  timeline: [
    {
      year: "2026",
      title: "SAP Certified Data Analyst & Advanced Planning",
      subtitle: "SAP Professional Accreditations",
      description: "Earned certification in SAP Analytics Cloud covering data modeling, predictive analytics, executive dashboards, and multi-version planning models.",
      icon: "bi-patch-check-fill"
    },
    {
      year: "2025",
      title: "Oracle Certified OCI Generative AI Professional",
      subtitle: "Oracle Cloud Infrastructure",
      description: "Achieved professional certification in deploying generative AI, large language models, and RAG architectures on Oracle Cloud Infrastructure.",
      icon: "bi-cloud-check-fill"
    },
    {
      year: "2025",
      title: "RAG Chatbot & Tata GenAI Analytics",
      subtitle: "Enterprise Simulations & Deployments",
      description: "Built the RAG Intelligent Chatbot on OCI Generative AI service and completed the Tata GenAI Powered Data Analytics simulation on Forage.",
      icon: "bi-robot"
    },
    {
      year: "2024 - Present",
      title: "B.Tech in Computer Science & Technology Innovator",
      subtitle: "Indus University, Ahmedabad",
      description: "Commenced undergraduate studies in Computer Science & Engineering. Leading student initiatives as Technology Innovator.",
      icon: "bi-mortarboard-fill"
    }
  ]
};

// Global Exposure
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
  window.DEFAULT_DATA = PORTFOLIO_DATA;
}
