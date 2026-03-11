import { useState, useCallback } from "react";
import type { MouseEvent } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type PanelMode = "overview" | "runbook";

const projects = [
  {
    title: "Reliance Foundation Hospital",
    category: "Healthcare Data Platform",
    tools: "Apache NiFi, Kafka, HDFS, Hive, Yarn, Ozone, Spark",
    outcomes: [
      "Improved ingestion reliability with early sensitive-data filtering.",
      "Reduced pipeline bottlenecks through HA tuning and Spark optimizations.",
      "Hardened storage resiliency across HDFS + Ozone clusters.",
    ],
    status: "Stable",
    statusNote: "SLO 99.9%",
    metrics: [
      { label: "Pipeline", value: "HA ingestion" },
      { label: "Data", value: "X-ray + PII filtering" },
      { label: "Compute", value: "Spark processing" },
      { label: "Storage", value: "HDFS + Ozone" },
    ],
    signals: ["Ingestion lag", "Kafka throughput", "Storage health"],
    runbook: [
      "Validate upstream ingestion health and queue depth",
      "Check Kafka lag and broker status",
      "Verify HDFS/Ozone capacity and Spark job health",
      "Trigger replay workflow if data gaps detected",
    ],
  },
  {
    title: "Jio Smart Document Platform",
    category: "Document Intelligence",
    tools: "Azure Form Recognizer, PDF/Image parsing, JSON output",
    outcomes: [
      "Accelerated document processing with automated form extraction.",
      "Improved data quality with structured JSON validation checks.",
      "Stabilized high-volume workloads with tuned pipeline retries.",
    ],
    status: "Stable",
    statusNote: "SLO 99.8%",
    metrics: [
      { label: "Extraction", value: "Form Recognizer" },
      { label: "Throughput", value: "High-volume docs" },
      { label: "Output", value: "Structured JSON" },
      { label: "Quality", value: "Schema validation" },
    ],
    signals: ["Parser latency", "Quota usage", "Schema drift"],
    runbook: [
      "Inspect pipeline latency and OCR queue depth",
      "Validate Form Recognizer quota and retries",
      "Run schema validation for critical fields",
      "Replay failed batches with corrected mappings",
    ],
  },
  {
    title: "Jio Device Heartbeat",
    category: "Large-Scale Monitoring",
    tools: "33M+ devices, ~75B signals/day, proactive signal loss detection",
    outcomes: [
      "Scaled monitoring to 33M+ devices with proactive signal loss detection.",
      "Automated guardrails to protect SLA during regional anomalies.",
      "Improved MTTR with faster alerting and correlation workflows.",
    ],
    status: "Stable",
    statusNote: "Zero downtime focus",
    metrics: [
      { label: "Devices", value: "33M+" },
      { label: "Signals", value: "~75B/day" },
      { label: "Alerting", value: "Proactive" },
      { label: "Automation", value: "Signal loss guardrails" },
    ],
    signals: ["Signal loss", "Pipeline delay", "Regional anomalies"],
    runbook: [
      "Validate device ingestion and partition health",
      "Check end-to-end lag and alert routing",
      "Correlate regional anomalies with infra events",
      "Automate mitigation and notify stakeholders",
    ],
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>("overview");
  const [expandedCases, setExpandedCases] = useState<Record<number, boolean>>(
    {}
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setPanelMode("overview");
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const toggleCaseStudy = (index: number) => {
    setExpandedCases((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handlePanelMove = (event: MouseEvent<HTMLDivElement>) => {
    const panel = event.currentTarget;
    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    panel.style.setProperty("--parallax-x", x.toFixed(2));
    panel.style.setProperty("--parallax-y", y.toFixed(2));
  };

  const resetPanelMove = (event: MouseEvent<HTMLDivElement>) => {
    const panel = event.currentTarget;
    panel.style.setProperty("--parallax-x", "0");
    panel.style.setProperty("--parallax-y", "0");
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="case-study">
                          <button
                            className="case-toggle"
                            onClick={() => toggleCaseStudy(index)}
                            aria-expanded={!!expandedCases[index]}
                            aria-controls={`case-${index}`}
                            data-cursor="disable"
                          >
                            Case Study
                          </button>
                          <div
                            id={`case-${index}`}
                            className={`case-body ${expandedCases[index] ? "case-open" : ""
                              }`}
                          >
                            <ul>
                              {project.outcomes.map((outcome, outcomeIndex) => (
                                <li key={outcomeIndex}>{outcome}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="ops-panel"
                      aria-live="polite"
                      onMouseMove={handlePanelMove}
                      onMouseLeave={resetPanelMove}
                    >
                      <div className="ops-panel-bg" aria-hidden="true"></div>
                      <div className="ops-panel-header">
                        <div>
                          <h5>Ops Console</h5>
                          <p className="ops-subtitle">Live snapshot</p>
                        </div>
                        <div className="ops-tabs">
                          <button
                            className={`ops-tab ${panelMode === "overview" ? "ops-tab-active" : ""}`}
                            onClick={() => setPanelMode("overview")}
                            data-cursor="disable"
                          >
                            Overview
                          </button>
                          <button
                            className={`ops-tab ${panelMode === "runbook" ? "ops-tab-active" : ""}`}
                            onClick={() => setPanelMode("runbook")}
                            data-cursor="disable"
                          >
                            Runbook
                          </button>
                        </div>
                      </div>
                      {panelMode === "overview" ? (
                        <>
                          <div className="ops-status">
                            <span className="status-dot"></span>
                            <span>{project.status}</span>
                            <span className="ops-status-note">
                              {project.statusNote}
                            </span>
                          </div>
                          <div className="ops-metrics">
                            {project.metrics.map((metric, metricIndex) => (
                              <div className="ops-metric" key={metricIndex}>
                                <div className="ops-metric-label">
                                  {metric.label}
                                </div>
                                <div className="ops-metric-value">
                                  {metric.value}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="ops-signals">
                            {project.signals.map((signal, signalIndex) => (
                              <span className="ops-signal" key={signalIndex}>
                                {signal}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <ol className="ops-runbook">
                          {project.runbook.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
          <div className="carousel-progress" aria-hidden="true">
            <div
              className="carousel-progress-fill"
              style={{
                width: `${((currentIndex + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
