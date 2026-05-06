export const PURPLE = "#9966FF";
export const CYAN = "#00FFEE";
export const DARK = "#060608";

export const socials = {
  linkedin: "https://www.linkedin.com/in/sai-sujit-86965420a/",
  github: "https://github.com/Sujit224",
};

export const techStack = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "Scikit-Learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "SQLAlchemy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg" },
  { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
  { name: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invert: true },
  { name: "Pinecone", symbol: "🌲", color: "#22c55e" },
  { name: "ChromaDB", symbol: "💠", color: "#3b82f6" },
  { name: "Ollama", symbol: "🦙", color: "#ffffff" },
  { name: "LangChain", symbol: "🔗", color: "#1C9955" },
  { name: "LangGraph", symbol: "⬡", color: PURPLE },
  { name: "Hugging Face", symbol: "🤗", color: "#FFD21E" },
  { name: "YOLOv8", symbol: "👁", color: CYAN },
  { name: "Groq LLM", symbol: "⚡", color: "#F55036" },
];

export const projects = [
  {
    id: "aria", title: "ARIA", subtitle: "AI-Powered Hotel Emergency Response System",
    desc: "Hybrid AI detection pipeline combining Qwen3-32B + YOLOv8 for real-time threat identification. Features a React + Three.js immersive 3D dashboard with zero-latency Firebase sync for instant emergency alerts across hotel floors.",
    tech: ["Python", "FastAPI", "LangGraph", "YOLOv8", "React", "Three.js", "Firebase"],
    accent: PURPLE, icon: "🛡️",
    bgGrad: `radial-gradient(ellipse at top left, ${PURPLE}22 0%, transparent 60%), radial-gradient(ellipse at bottom right, ${CYAN}12 0%, transparent 60%)`,
    github: "https://github.com/Sujit224/aria-respons",
  },
  {
    id: "securebank", title: "Secure Bank", subtitle: "AI-Powered Banking Application",
    desc: "Full-stack financial platform with an LLM-powered assistant leveraging tool-calling for deep contextual queries. Delivers real-time insights across accounts, transactions, and market data with enterprise-grade security.",
    tech: ["React", "FastAPI", "SQLAlchemy", "MySQL", "LangChain", "Groq LLM"],
    accent: CYAN, icon: "🏦",
    bgGrad: `radial-gradient(ellipse at top right, ${CYAN}22 0%, transparent 60%), radial-gradient(ellipse at bottom left, ${PURPLE}12 0%, transparent 60%)`,
    github: "https://github.com/Sujit224/SecureBank",
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
  { title: "Generative AI", subtitle: "Multimodal Creation", icon: "✨", color: "#FF3366" },
  { title: "Prompt Engineering", subtitle: "Context & CoT Design", icon: "📝", color: "#00FFEE" },
  { title: "AI Agents", subtitle: "Semantic Workflows", icon: "🤖", color: "#9966FF" },
  { title: "Machine Learning", subtitle: "Algorithms & Theory", icon: "⚙️", color: "#FFB700" },
  { title: "Neural Networks", subtitle: "Deep Architectures", icon: "🧠", color: "#4285F4" },
  { title: "Transformers", subtitle: "Attention & BERT", icon: "⚡", color: "#EA4335" },
  { title: "LLM Tuning", subtitle: "Fine-tuning & RLHF", icon: "🎯", color: "#34A853" },
  { title: "NLP", subtitle: "Text & Linguistics", icon: "💬", color: "#FBBC05" },
  { title: "RAG", subtitle: "Retrieval Augmented Generation", icon: "🔍", color: "#9966FF" },
];

export const glass = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(20px)",
  borderRadius: 20,
};
