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
            <ul className="career-bullets">
              <li>
                Operate large-scale cloud and on-prem infrastructure supporting
                high-availability production systems.
              </li>
              <li>
                Build and maintain CI/CD pipelines with Jenkins, Git, and Azure
                DevOps for reliable deployments.
              </li>
              <li>
                Automate operations with Python and shell scripts to reduce
                manual effort and improve efficiency.
              </li>
              <li>
                Implement Infrastructure as Code using Terraform and Ansible for
                provisioning and configuration management.
              </li>
              <li>
                Support containerized workloads on Docker and Kubernetes,
                including troubleshooting and performance monitoring.
              </li>
              <li>
                Drive observability and incident response with Prometheus,
                Grafana, alerting, RCA, and SLO/SLA metrics.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
