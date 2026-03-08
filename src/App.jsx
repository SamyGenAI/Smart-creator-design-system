import ComparisonInfographic from '../templates/ComparisonInfographic.jsx'

const demoData = {
  title: "AI Tools VS AI Systems",
  highlightWord: "AI Systems",
  col1Header: "AI Tool",
  col2Header: "AI System",
  rows: [
    {
      label: "Scope",
      col1: "Handles one predefined task at a time",
      col2: "Coordinates multiple tools toward a shared goal",
    },
    {
      label: "Autonomy",
      col1: "Requires humans to manually chain each step",
      col2: "Plans, delegates, and acts end-to-end on its own",
    },
    {
      label: "Memory",
      col1: "Stateless — resets after every single call",
      col2: "Persists context and state across the full workflow",
    },
    {
      label: "Integration",
      col1: "Plugs into one API or service at a time",
      col2: "Orchestrates 10+ tools and data sources at once",
    },
    {
      label: "Output",
      col1: "Returns a single answer or artifact per run",
      col2: "Ships compound, multi-step deliverables end-to-end",
    },
    {
      label: "Adaptability",
      col1: "Breaks when inputs or context unexpectedly changes",
      col2: "Self-corrects, reroutes, and retries on failure",
    },
    {
      label: "Cost at Scale",
      col1: "Manual effort grows linearly with volume",
      col2: "Scales workflows without adding headcount",
    },
    {
      label: "Failure Mode",
      col1: "Needs a human to debug and restart",
      col2: "Detects errors autonomously and retries",
    },
  ],
  footer: {
    avatarSrc: "/assets/avatar/avatar-profile.png",
    name: "Samy Chouaf",
  },
}

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px', background: '#e5e7eb', minHeight: '100vh' }}>
      <ComparisonInfographic data={demoData} />
    </div>
  )
}
