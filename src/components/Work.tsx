import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type PanelMode = "overview" | "runbook";

const projects = [
  {
    title: "Reliance Foundation Hospital",
    category: "Healthcare Data Platform",
    tools: "Apache NiFi, Kafka, HDFS, Hive, Yarn, Ozone, Spark",
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
                      </div>
                    </div>
                    <div className="ops-panel" aria-live="polite">
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
        </div>
      </div>
    </div>
  );
};

export default Work;
