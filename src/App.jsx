import AIAutonomyInfographic from '../design/AIAutonomyInfographic.jsx'

const demoData = {
  title: "AI Autonomy",
  highlightWord: "Autonomy",
  subtitle: "The 5 levels every business must know",
  sections: {
    intro: "What is AI Autonomy?",
    level1: "Assist the Human",
    level2: "Augment Decisions",
    pyramidTitle: "The 5 Levels",
    level3: "Automate Tasks",
    level4: "Act Autonomously",
    level5: "Self-Evolve",
    cta: "Start Your AI Journey",
  },
  pyramid: {
    tiers: [
      { value: "Level 5", label: "Self-Evolving AI", body: "AI improves its own models and processes without human input." },
      { value: "Level 3-4", label: "Automated & Autonomous", body: "AI executes full workflows. Humans monitor outcomes, not steps." },
      { value: "Level 1-2", label: "Assisted & Augmented", body: "Humans lead. AI suggests, drafts, and accelerates decisions." },
    ],
  },
  illustrationTitle: "The Growth Path",
  footer: {
    avatarSrc: "/assets/avatar/avatar-profile.png",
    name: "Samy Chouaf",
  },
}

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px', background: '#e5e7eb', minHeight: '100vh' }}>
      <AIAutonomyInfographic data={demoData} />
    </div>
  )
}
