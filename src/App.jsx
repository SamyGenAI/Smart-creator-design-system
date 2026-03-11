import ClaudeCoworkInfographic from '../design/ClaudeCoworkInfographic.jsx'

const demoData = {
  title: "Claude Cowork Setup Guide",
  highlightWord: "Cowork",
  subtitle: "Set up your AI workspace in 30 minutes",
  sections: {
    overview: "What is Cowork?",
    s1: "Create Context Files",
    s2: "Set Up Instructions",
    s3: "Ask Before Starting",
    s4: "Install Plugins",
    s5: "Connect Your Tools",
    s6: "Schedule Tasks",
    s7: "Go Cross-App",
    quickStart: "First 30 Minutes",
  },
  footer: {
    avatarSrc: "/assets/avatar/avatar-profile.png",
    name: "Samy Chouaf",
  },
}

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px', background: '#e5e7eb', minHeight: '100vh' }}>
      <ClaudeCoworkInfographic data={demoData} />
    </div>
  )
}
