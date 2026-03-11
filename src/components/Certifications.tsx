import "./styles/Certifications.css";

const certifications = [
  "Microsoft Certified: Azure Fundamentals (AZ-900)",
  "ITIL 4 Foundation",
  "Apache Airflow Fundamentals (Astronomer)",
  "DevOps Foundations (LinkedIn Learning)",
  "Databricks Fundamentals (Databricks Academy)",
  "Docker Fundamentals (LearnKartS)",
];

const Certifications = () => {
  return (
    <div className="certifications-section section-container" id="certifications">
      <div className="certifications-header">
        <h2>Certifications</h2>
        <p>Validated training across cloud, data, and DevOps foundations.</p>
      </div>
      <div className="certifications-grid">
        {certifications.map((cert) => (
          <div className="certification-card" key={cert}>
            <div className="certification-badge">Certified</div>
            <h4>{cert}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
