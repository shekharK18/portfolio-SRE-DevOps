import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="availability-banner" data-cursor="disable">
            Open to SRE/DevOps roles · Hyderabad/Remote
          </div>
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SHEKHAR KUMAR
              <br />
              <span>KASHYAP</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>DevOps / Site Reliability</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Engineer</div>
              <div className="landing-h2-2">SRE</div>
            </h2>
            <h2>
              <div className="landing-h2-info">DevOps</div>
              <div className="landing-h2-info-1">Reliability</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
