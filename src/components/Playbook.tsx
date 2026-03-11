import "./styles/Playbook.css";

const playbookCards = [
  {
    title: "Incident Response",
    subtitle: "On-call, triage, mitigation",
    points: [
      "Rapid detection with alert routing and clear severity levels.",
      "Immediate mitigation steps and rollback playbooks.",
      "Stakeholder updates with clear timelines and impact.",
    ],
  },
  {
    title: "Postmortem & RCA",
    subtitle: "Learning-driven recovery",
    points: [
      "Blameless post-incident reviews with clear timelines.",
      "Root cause analysis with actionable follow-ups.",
      "Preventative tasks tracked through completion.",
    ],
  },
  {
    title: "SLOs & Reliability",
    subtitle: "Guardrails for scale",
    points: [
      "Define SLIs/SLOs aligned to user experience.",
      "Error budget policies to guide release cadence.",
      "Continuous reliability improvements through automation.",
    ],
  },
];

const Playbook = () => {
  return (
    <div className="playbook-section section-container">
      <div className="playbook-header">
        <h2>Incident Playbook</h2>
        <p>
          A focused, repeatable process for stable production systems and faster
          recovery when issues occur.
        </p>
      </div>
      <div className="playbook-grid">
        {playbookCards.map((card) => (
          <div className="playbook-card" key={card.title}>
            <div className="playbook-card-header">
              <h4>{card.title}</h4>
              <span>{card.subtitle}</span>
            </div>
            <ul>
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playbook;
