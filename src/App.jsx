import Infographic from '../templates/Infographic.jsx'

const demoData = {
  title: "The Claude Cowork Setup Guide",
  highlightWord: "Cowork",
  subtitle: "Set up your AI workspace in 30 minutes",
  row1: {
    card1: {
      title: "What is Cowork?",
      iconSrc: null,
      checklist: {
        title: null,
        items: [
          "Task delegation, not chat",
          "Desktop app only (Mac/Win)",
          "Plans, subtasks, sub-agents",
        ],
      },
    },
    card2: {
      title: "① Context Files",
      iconSrc: null,
      imageSrc: "/assets/illustrations/oc-taking-note.svg",
      iconBullet: {
        items: [
          { iconSrc: null, iconAlt: "", text: "about-me.md — role & goals" },
          { iconSrc: null, iconAlt: "", text: "brand-voice.md — tone & samples" },
          { iconSrc: null, iconAlt: "", text: "working-preferences.md — rules" },
          { iconSrc: null, iconAlt: "", text: "Update after every bad output" },
        ],
      },
    },
  },
  row2: {
    title: "② Instructions & Prompting",
    iconSrc: null,
    iconBullet: {
      items: [
        { iconSrc: null, iconAlt: "", text: "Global Instructions → every session" },
        { iconSrc: null, iconAlt: "", text: "Folder Instructions → per project" },
        { iconSrc: null, iconAlt: "", text: "No cross-session memory — use files" },
        { iconSrc: null, iconAlt: "", text: "\"Ask clarifying Qs before starting\"" },
      ],
    },
    table: {
      headers: ["Step", "Action", "Time"],
      rows: [
        ["Install", "Desktop app + paid plan", "5 min"],
        ["Context", "Write 3 .md files", "10 min"],
        ["Verify", "\"Tell me what you know\"", "5 min"],
      ],
    },
    imageSrc: "/assets/illustrations/oc-on-the-laptop.svg",
  },
  row3: {
    card1: {
      title: "③ Plugins",
      iconSrc: null,
      sectionTitle: "Pre-built specialist packs",
      numberBullet: {
        items: [
          "Install via Customize",
          "Type / for commands",
          "Edit or build your own",
        ],
      },
    },
    card2: {
      title: "④ Connectors",
      iconSrc: null,
      sectionTitle: "50+ live MCP integrations",
      logos: [
        { src: "/assets/logos/app/notion.com.png", alt: "Notion" },
        { src: "/assets/logos/app/figma.com.png", alt: "Figma" },
        { src: "/assets/logos/app/hubspot.com.png", alt: "HubSpot" },
        { src: "/assets/logos/app/atlassian.com.png", alt: "Atlassian" },
        { src: "/assets/logos/app/drive.google.com.png", alt: "Google Drive" },
        { src: "/assets/logos/app/calendar.google.com.png", alt: "Calendar" },
        { src: "/assets/logos/app/mail.google.com.png", alt: "Gmail" },
        { src: "/assets/logos/app/google.com.png", alt: "Google" },
      ],
    },
    card3: {
      title: "⑤ Watch Out",
      iconSrc: null,
      sectionTitle: "Known limitations",
      highlightText: "Desktop only",
      colorBoxColor: "var(--components\\/card-title\\/orange,#ffa066)",
    },
  },
  row4: {
    title: "The Mindset Shift",
    iconSrc: null,
    sectionTitle: "Stop writing better prompts.",
    pastelCard: {
      text: "ChatGPT trained you to prompt. Cowork trains you to give context. One depreciates. The other compounds.",
    },
    checklist1: {
      title: "Do this",
      items: [
        "Give context in .md files",
        "Let Claude ask Qs first",
      ],
    },
    checklist2: {
      items: [
        "Schedule recurring tasks",
        "Connect tools via MCP",
      ],
    },
  },
  footer: {
    avatarSrc: "/assets/avatar/avatar-profile.png",
    name: "Samy Chouaf",
  },
}

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px', background: '#e5e7eb', minHeight: '100vh' }}>
      <Infographic data={demoData} />
    </div>
  )
}
