export const PURPLE = "#9966FF";
export const CYAN = "#00FFEE";
export const DARK = "#060608";

import { Trees, Component, Ghost, Link, Network, Smile, Eye, Zap, Shield, Landmark, Sparkles, FileText, Bot, Settings, Brain, Target, MessageSquare, Search } from "lucide-react";

export const socials = {
  linkedin: "https://www.linkedin.com/in/sai-sujit-86965420a/",
  github: "https://github.com/Sujit224",
};

export const techStack = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", desc: "My primary language for AI/ML development and backend automation." },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", desc: "Leveraged for high-performance computing and algorithmic problem-solving." },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", desc: "Building high-performance, asynchronous APIs with type safety." },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", desc: "Designing and training complex deep learning architectures." },
  { name: "Keras", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg", desc: "High-level neural networks API for fast experimentation and deep learning." },
  { name: "Scikit-Learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", desc: "Standard toolkit for classical machine learning and data preprocessing." },
  { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg", desc: "Real-time computer vision processing and image analysis." },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", desc: "Real-time database and backend-as-a-service for rapid development." },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", desc: "Relational database management for structured data and banking apps." },
  { name: "SQLAlchemy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg", desc: "The Python SQL Toolkit and Object Relational Mapper for database abstraction." },
  { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg", desc: "Fundamental package for scientific computing and matrix operations." },
  { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", desc: "Powerful data manipulation and analysis library for Python." },
  { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg", desc: "Static, animated, and interactive visualizations in Python." },
  { name: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg", desc: "Interactive environment for data exploration and model prototyping." },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", desc: "Distributed version control for efficient codebase management." },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invert: true, desc: "Hosting platform for open-source collaboration and CI/CD workflows." },
  { name: "Pinecone", logo: "https://api.iconify.design/logos/pinecone.svg", invert: true, desc: "Vector database for high-performance retrieval in RAG systems." },
  { name: "ChromaDB", logo: "https://api.iconify.design/logos/chroma.svg", desc: "Open-source embedding database for AI applications." },
  { name: "Ollama", logo: "https://cdn.simpleicons.org/ollama/white", desc: "Local LLM runner for testing and deploying models on the edge." },
  { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C9955", desc: "Framework for developing applications powered by large language models." },
  { name: "LangGraph", logo: "https://cdn.simpleicons.org/langchain/9966FF", desc: "Building stateful, multi-agent workflows with cyclic graphs." },
  { name: "Hugging Face", logo: "https://api.iconify.design/logos/hugging-face-icon.svg", desc: "The hub for open-source AI models, datasets, and ML tools." },
  { name: "YOLOv8", logo: "https://cdn.simpleicons.org/ultralytics/00FFEE", desc: "State-of-the-art real-time object detection and segmentation." },
  { name: "Groq LLM", logo: "https://cdn.simpleicons.org/lightning/F55036", desc: "LPU-powered LLM inference for extremely fast token generation." },
];

export const projects = [
  {
    id: "aria", title: "ARIA", subtitle: "AI-Powered Hotel Emergency Response System",
    desc: "Hybrid AI detection pipeline combining Qwen3-32B + YOLOv8 for real-time threat identification. Features a React + Three.js immersive 3D dashboard with zero-latency Firebase sync for instant emergency alerts across hotel floors.",
    tech: ["Python", "FastAPI", "LangGraph", "YOLOv8", "React", "Three.js", "Firebase"],
    accent: PURPLE, icon: <Shield size="1em" />,
    bgGrad: `radial-gradient(ellipse at top left, ${PURPLE}22 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${CYAN}12 0%, transparent 60%)`,
    github: "https://github.com/Sujit224/aria-response",
    image: "/aria-preview.png",
  },
  {
    id: "securebank", title: "Secure Bank", subtitle: "AI-Powered Banking Application",
    desc: "Full-stack financial platform with an LLM-powered assistant leveraging tool-calling for deep contextual queries. Delivers real-time insights across accounts, transactions, and market data with enterprise-grade security.",
    tech: ["React", "FastAPI", "SQLAlchemy", "MySQL", "LangChain", "Groq LLM"],
    accent: CYAN, icon: <Landmark size="1em" />,
    bgGrad: `radial-gradient(ellipse at top right, ${CYAN}22 0%, transparent 60%), radial-gradient(ellipse at bottom left, ${PURPLE}12 0%, transparent 60%)`,
    github: "https://github.com/Sujit224/SecureBank",
  },
  {
    id: "alumniconnect", title: "AlumniConnect", subtitle: "AI-Powered Alumni Platform",
    desc: "Intelligent platform connecting students with alumni, utilizing an AI Agent equipped with Text-to-SQL to dynamically query the database and deliver insightful statistics. Features an automated resume data extraction pipeline.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "MySQL", "LangChain", "LangGraph", "Groq LLM"],
    accent: PURPLE, icon: <Network size="1em" />,
    bgGrad: `radial-gradient(ellipse at top left, ${PURPLE}22 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${CYAN}12 0%, transparent 60%)`,
    github: "https://github.com/Sujit224/AlumniConnect",
  },
];

export const skillData = {
  "AI & Machine Learning": [
    { name: "Machine Learning" },
    { name: "Neural Networks" },
    { name: "Natural Language Processing" },
    { name: "Transformers" },
    { name: "RAG" },
    { name: "LLM Tuning" },
  ],
  "Agentic Frameworks & Systems": [
    { name: "AI Agents" },
    { name: "Langchain" },
    { name: "Langgraph" },
    { name: "FastAPI" },
    { name: "MCP Server" },
  ],
  "Core Fundamentals": [
    { name: "Data Structures" },
    { name: "OOPs" },
  ],
};

export const skillCarouselData = [
  { title: "Generative AI", subtitle: "Multimodal Creation", icon: <Sparkles size="1em" />, color: "#FF3366" },
  { title: "Prompt Engineering", subtitle: "Context & CoT Design", icon: <FileText size="1em" />, color: "#00FFEE" },
  { title: "AI Agents", subtitle: "Semantic Workflows", icon: <Bot size="1em" />, color: "#9966FF" },
  { title: "Machine Learning", subtitle: "Algorithms & Theory", icon: <Settings size="1em" />, color: "#FFB700" },
  { title: "Neural Networks", subtitle: "Deep Architectures", icon: <Brain size="1em" />, color: "#4285F4" },
  { title: "Transformers", subtitle: "Attention & BERT", icon: <Zap size="1em" />, color: "#EA4335" },
  { title: "LLM Tuning", subtitle: "Fine-tuning & RLHF", icon: <Target size="1em" />, color: "#34A853" },
  { title: "NLP", subtitle: "Text & Linguistics", icon: <MessageSquare size="1em" />, color: "#FBBC05" },
  { title: "RAG", subtitle: "Retrieval Augmented Generation", icon: <Search size="1em" />, color: "#9966FF" },
];

export const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(20px)",
  borderRadius: 20,
};
