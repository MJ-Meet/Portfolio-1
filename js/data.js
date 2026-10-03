/**
 * data.js — Default Sample Portfolio Data
 * Meet Jethawa (MJ) — Personal Portfolio Management System
 *
 * This file contains the default sample data loaded when
 * localStorage has no existing portfolio data.
 * All content is editable via the Admin Dashboard.
 */

const DEFAULT_DATA = {

  profile: {
    name: "Meet Jethawa",
    shortName: "MJ",
    headline: "Computer Science Student | AI/ML | Data Analytics",
    bio: "I'm a Computer Science student with a strong passion for Artificial Intelligence, Machine Learning, and Data Analytics. I enjoy building intelligent solutions and exploring how data can drive meaningful decisions. Currently focused on expanding my knowledge in Generative AI, LLMs, and AI Agents.",
    email: "meet.jethawa@example.com",
    phone: "+91 00000 00000",
    location: "India",
    github: "https://github.com/meetjethawa",
    linkedin: "https://linkedin.com/in/meetjethawa",
    resume: "resume/resume.pdf",
    heroTagline: "Building the Future with AI & Data",
    aboutText: "I am a Computer Science student with deep interests in Artificial Intelligence, Machine Learning, Data Analytics, and Python development. My learning journey has taken me from core programming fundamentals to exploring cutting-edge topics like Generative AI and Large Language Models (LLMs). I am passionate about applying technology to solve real-world problems and am constantly seeking opportunities to learn, build, and grow.",
    education: "Bachelor of Science in Computer Science (Ongoing)",
    careerObjective: "To contribute to impactful AI/ML projects, apply data-driven thinking to real-world challenges, and grow as a professional in the field of Artificial Intelligence and Data Science.",
    currentFocus: "Generative AI, LLMs, and AI Agents",
    profileImage: "",
    typingPhrases: [
      "AI/ML Enthusiast",
      "Data Analytics Enthusiast",
      "Python Developer",
      "Computer Science Student",
      "Future AI/ML Engineer"
    ]
  },

  projects: [
    {
      id: "proj_001",
      title: "MechMind",
      category: "AI/ML",
      shortDescription: "An AI-powered agentic system built on IBM's ecosystem, designed to assist with mechanical engineering queries using intelligent AI agents.",
      fullDescription: "MechMind is an agentic AI system built using IBM's Watsonx ecosystem. It leverages the power of large language models and AI agents to assist users with mechanical engineering concepts, queries, and problem-solving. The system demonstrates agentic AI capabilities where autonomous agents collaborate to provide accurate and context-aware responses. This project was developed as part of an AI internship exploration.",
      technologies: ["Python", "IBM Watsonx", "Agentic AI", "LLMs", "Web"],
      image: "",
      github: "https://github.com/meetjethawa",
      demo: "",
      date: "2024",
      featured: true,
      order: 1
    },
    {
      id: "proj_002",
      title: "Life Pattern Detector",
      category: "Data",
      shortDescription: "A data analytics project that identifies patterns in daily lifestyle data to provide insights about health and productivity habits.",
      fullDescription: "Life Pattern Detector is a data analytics project that processes lifestyle and behavioral data to detect patterns related to health, productivity, and daily habits. Using Python and data visualization libraries, the system provides meaningful insights that can help users understand their daily patterns and make informed lifestyle decisions.",
      technologies: ["Python", "Data Analytics", "Pandas", "Matplotlib", "Data Visualization"],
      image: "",
      github: "https://github.com/meetjethawa",
      demo: "",
      date: "2024",
      featured: true,
      order: 2
    },
    {
      id: "proj_003",
      title: "Campus Go",
      category: "Web",
      shortDescription: "A campus navigation and information web application designed to help students find locations, events, and resources on campus.",
      fullDescription: "Campus Go is a web application built to assist college students in navigating campus facilities, discovering events, and finding important resources. The application features an interactive interface with location information, event listings, and a campus directory. Built using HTML, CSS, JavaScript and Bootstrap 5.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap 5"],
      image: "",
      github: "https://github.com/meetjethawa",
      demo: "",
      date: "2024",
      featured: false,
      order: 3
    },
    {
      id: "proj_004",
      title: "AI Note Summarizer",
      category: "AI/ML",
      shortDescription: "An AI-powered tool that automatically summarizes lengthy notes and documents into concise, structured summaries using NLP.",
      fullDescription: "AI Note Summarizer is a Python-based tool that uses Natural Language Processing (NLP) techniques to automatically generate concise summaries from lengthy notes, articles, or documents. The tool applies text summarization algorithms to extract the most relevant information and present it in a structured, readable format.",
      technologies: ["Python", "NLP", "AI", "Text Summarization"],
      image: "",
      github: "https://github.com/meetjethawa",
      demo: "",
      date: "2024",
      featured: false,
      order: 4
    },
    {
      id: "proj_005",
      title: "Iris Flower Classification",
      category: "AI/ML",
      shortDescription: "A classic machine learning project implementing multiple classification algorithms to classify iris flower species with high accuracy.",
      fullDescription: "Iris Flower Classification is a foundational machine learning project that implements and compares multiple classification algorithms including Logistic Regression, K-Nearest Neighbors, Decision Tree, and Support Vector Machine on the classic Iris dataset. The project includes data exploration, preprocessing, model training, evaluation, and visualization of results using Python, scikit-learn, pandas, and matplotlib.",
      technologies: ["Python", "Machine Learning", "scikit-learn", "Pandas", "Matplotlib"],
      image: "",
      github: "https://github.com/meetjethawa",
      demo: "",
      date: "2023",
      featured: false,
      order: 5
    }
  ],

  skills: [
    { id: "sk_001", name: "Python", category: "Programming", level: "Intermediate", percentage: 80, icon: "🐍", description: "Primary programming language for data analysis, ML, and scripting." },
    { id: "sk_002", name: "Machine Learning", category: "Machine Learning", level: "Intermediate", percentage: 70, icon: "🤖", description: "Supervised and unsupervised learning using scikit-learn and related tools." },
    { id: "sk_003", name: "Data Analytics", category: "Data", level: "Intermediate", percentage: 75, icon: "📊", description: "Exploratory data analysis, visualization, and insight generation." },
    { id: "sk_004", name: "Generative AI", category: "AI", level: "Learning", percentage: 60, icon: "✨", description: "Working with large language models and generative AI tools." },
    { id: "sk_005", name: "HTML5", category: "Web Development", level: "Intermediate", percentage: 80, icon: "🌐", description: "Semantic HTML for building web page structures." },
    { id: "sk_006", name: "CSS3", category: "Web Development", level: "Intermediate", percentage: 75, icon: "🎨", description: "Styling, layouts, and responsive design." },
    { id: "sk_007", name: "JavaScript", category: "Web Development", level: "Intermediate", percentage: 70, icon: "⚡", description: "Vanilla JavaScript for dynamic and interactive web applications." },
    { id: "sk_008", name: "Bootstrap 5", category: "Web Development", level: "Intermediate", percentage: 75, icon: "🅱️", description: "Rapid responsive UI development using Bootstrap 5." },
    { id: "sk_009", name: "SQL", category: "Database", level: "Beginner", percentage: 55, icon: "🗄️", description: "Structured Query Language for database interaction." },
    { id: "sk_010", name: "Git", category: "Tools", level: "Intermediate", percentage: 70, icon: "📦", description: "Version control and collaborative development using Git." },
    { id: "sk_011", name: "GitHub", category: "Tools", level: "Intermediate", percentage: 72, icon: "🐙", description: "Remote repository hosting, collaboration, and project management." },
    { id: "sk_012", name: "Pandas", category: "Data", level: "Intermediate", percentage: 72, icon: "🐼", description: "Data manipulation and analysis library for Python." },
    { id: "sk_013", name: "NumPy", category: "Data", level: "Intermediate", percentage: 68, icon: "🔢", description: "Numerical computing library for Python." },
    { id: "sk_014", name: "Matplotlib", category: "Data", level: "Intermediate", percentage: 65, icon: "📈", description: "Data visualization library for Python." },
    { id: "sk_015", name: "LLMs", category: "AI", level: "Learning", percentage: 55, icon: "🧠", description: "Exploring large language models and their applications." }
  ],

  certificates: [
    {
      id: "cert_001",
      title: "AI & Cloud Internship Certificate",
      issuer: "IBM × Edunet Foundation",
      date: "2024",
      category: "AI",
      image: "",
      verification: ""
    },
    {
      id: "cert_002",
      title: "Python for Data Science",
      issuer: "Sample — Editable",
      date: "2024",
      category: "Programming",
      image: "",
      verification: ""
    },
    {
      id: "cert_003",
      title: "Introduction to Machine Learning",
      issuer: "Sample — Editable",
      date: "2024",
      category: "AI",
      image: "",
      verification: ""
    }
  ],

  experience: [
    {
      id: "exp_001",
      organization: "IBM × Edunet Foundation",
      role: "AI & Cloud Intern (Virtual)",
      description: "Participated in a virtual internship program focused on Artificial Intelligence and Cloud technologies within the IBM ecosystem. Explored IBM Watsonx, agentic AI systems, and cloud computing fundamentals. Developed the MechMind project as part of the internship deliverable.",
      startDate: "2024",
      endDate: "2024",
      location: "Remote",
      skills: ["Python", "IBM Watsonx", "Agentic AI", "Cloud Computing"],
      certificateUrl: ""
    }
  ],

  timeline: [
    { id: "tl_001", title: "Computer Science Foundations", description: "Started my journey with core computer science concepts, programming logic, and algorithmic thinking.", date: "2022", icon: "💻" },
    { id: "tl_002", title: "Python Programming", description: "Learned Python as my primary programming language, covering syntax, data structures, and object-oriented programming.", date: "2022", icon: "🐍" },
    { id: "tl_003", title: "Web Development", description: "Explored web development with HTML, CSS, JavaScript, and Bootstrap to build responsive and interactive web applications.", date: "2023", icon: "🌐" },
    { id: "tl_004", title: "Data Analytics", description: "Dived into data analytics using Pandas, NumPy, and Matplotlib for data exploration, analysis, and visualization.", date: "2023", icon: "📊" },
    { id: "tl_005", title: "Machine Learning", description: "Started learning machine learning concepts, algorithms, and model implementation using scikit-learn and Python.", date: "2024", icon: "🤖" },
    { id: "tl_006", title: "Generative AI", description: "Began exploring Generative AI, prompt engineering, and working with language model APIs.", date: "2024", icon: "✨" },
    { id: "tl_007", title: "LLMs & AI Agents", description: "Currently exploring Large Language Models (LLMs) and Agentic AI systems for intelligent, autonomous applications.", date: "2024-Present", icon: "🧠" }
  ],

  learning: [
    { id: "lrn_001", topic: "Python", progress: 80, description: "Continuously improving Python skills for AI/ML, scripting, and automation." },
    { id: "lrn_002", topic: "Machine Learning", progress: 70, description: "Deepening knowledge of ML algorithms, model evaluation, and deployment." },
    { id: "lrn_003", topic: "Generative AI", progress: 60, description: "Learning generative AI concepts, prompt engineering, and AI tools." },
    { id: "lrn_004", topic: "LLMs", progress: 55, description: "Exploring large language models, fine-tuning, and LLM-based applications." },
    { id: "lrn_005", topic: "Data Analytics", progress: 75, description: "Strengthening data analysis, EDA, and visualization skills." },
    { id: "lrn_006", topic: "AI Agents", progress: 50, description: "Beginning to explore agentic AI systems and multi-agent frameworks." }
  ],

  messages: [],

  settings: {
    theme: "light",
    adminUsername: "admin",
    adminPassword: "admin123",
    siteTitle: "Meet Jethawa — Portfolio",
    metaDescription: "Personal portfolio of Meet Jethawa — Computer Science Student | AI/ML | Data Analytics"
  }

};
