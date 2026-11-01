import {
  Code2,
  BrainCircuit,
  Bot,
  Server,
  ChartNoAxesCombined,
  Database,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TODO before publishing: replace these with your real details.
// Every link and the email address on the site read from here.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "Arin Sharma",
  email: "arinsharma.research@gmail.com",
  github: "https://github.com/curious-arin",
  linkedin: "https://www.linkedin.com/in/curious-arin/",
  // Put your resume PDF in client/public/resume.pdf (or change this path / use a full URL).
  resume: "/resume.pdf",
};

export const skillGroups = [
  {
    title: "Programming and data",
    status: "Learned",
    icon: Code2,
    items: ["Python", "NumPy", "pandas", "SQL", "Git and GitHub"],
    goal: "Writing clean code, working with data in pandas and SQL, and keeping work organised with Git.",
  },
  {
    title: "Machine learning and deep learning",
    status: "Applied in a project",
    icon: BrainCircuit,
    items: ["Traditional ML", "PyTorch", "LSTM", "Time-series forecasting"],
    goal: "Building and evaluating models, starting with my LSTM stock forecasting project.",
  },
  {
    title: "AI application development",
    status: "Learned",
    icon: Bot,
    items: ["Generative AI", "RAG", "Vector databases", "AI agents"],
    goal: "Building applications around LLMs: retrieving the right context, connecting tools, and checking the answers.",
  },
  {
    title: "Backend and deployment",
    status: "Learned",
    icon: Server,
    items: ["APIs", "FastAPI", "Docker", "Deployment"],
    goal: "Turning models and AI workflows into reliable services that other people can use.",
  },
];

export const projects = [
  {
    number: "01",
    type: "Machine learning",
    status: "Project",
    title: "Stock Price Forecasting",
    description:
      "A time-series forecasting project using an LSTM model to explore historical stock data and generate predictions.",
    stack: ["Python", "PyTorch", "LSTM", "Time series"],
    icon: ChartNoAxesCombined,
    art: "forecast",
    link: site.github, // TODO: link to the repository
    label: "View repository",
  },
  {
    number: "02",
    type: "AI application",
    status: "Concept",
    title: "Retrieval-Augmented Generation",
    description:
      "An AI assistant concept that retrieves relevant information from a knowledge base before generating a response.",
    stack: ["Generative AI", "RAG", "Vector databases"],
    icon: Database,
    art: "rag",
    link: site.github, // TODO: link to the repository
    label: "View repository",
  },
  {
    number: "03",
    type: "Backend and deployment",
    status: "Concept",
    title: "Model API Service",
    description:
      "A backend service concept for exposing a trained model through an API so other applications can use it.",
    stack: ["Python", "FastAPI", "Docker"],
    icon: Bot,
    art: "api",
    link: site.github, // TODO: link to the repository
    label: "View repository",
  },
  {
    number: "04",
    type: "AI application",
    status: "Concept",
    title: "AI Agent Assistant",
    description:
      "An agent concept that plans a task, calls the right tools, and checks its own answer before replying.",
    stack: ["AI agents", "Generative AI", "APIs"],
    icon: Bot,
    art: "agent",
    link: site.github, // TODO: replace with your real project
    label: "View repository",
  },
  {
    number: "05",
    type: "Data analytics",
    status: "Concept",
    title: "Data Analysis Dashboard",
    description:
      "An exploratory analysis concept that cleans a dataset with pandas and SQL and presents the findings as clear charts.",
    stack: ["Python", "pandas", "SQL", "Matplotlib"],
    icon: ChartNoAxesCombined,
    art: "dashboard",
    link: site.github, // TODO: replace with your real project
    label: "View repository",
  },
  {
    number: "06",
    type: "Machine learning",
    status: "Concept",
    title: "Predictive Classifier",
    description:
      "A traditional machine learning concept that compares models on a tabular dataset and evaluates them honestly.",
    stack: ["scikit-learn", "Feature engineering", "Python"],
    icon: BrainCircuit,
    art: "classifier",
    link: site.github, // TODO: replace with your real project
    label: "View repository",
  },
];
