import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>Experience</h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Site Reliability Engineer (SRE)</h4>
                <h5>Jio Platforms Limited</h5>
              </div>
              <h3>Dec 2023 - Present</h3>
            </div>
            <p>
              Managing Azure, AWS, and on-prem infrastructure for production data
              platforms. Leading incident response, RCA, and reliability
              improvements. Building observability with Prometheus, Grafana, and
              cloud monitoring, and supporting CI/CD with Jenkins, Git, and
              Terraform-based IaC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
