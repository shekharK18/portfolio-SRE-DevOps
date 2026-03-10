import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent < 100) return;
    let loadedTimer: ReturnType<typeof setTimeout> | undefined;
    let isLoadedTimer: ReturnType<typeof setTimeout> | undefined;

    loadedTimer = setTimeout(() => {
      setLoaded(true);
      isLoadedTimer = setTimeout(() => {
        setIsLoaded(true);
      }, 250);
    }, 150);

    return () => {
      if (loadedTimer !== undefined) clearTimeout(loadedTimer);
      if (isLoadedTimer !== undefined) clearTimeout(isLoadedTimer);
    };
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    import("./utils/initialFX").then((module) => {
      setClicked(true);
      hideTimer = setTimeout(() => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      }, 200);
    });
    return () => {
      if (hideTimer !== undefined) clearTimeout(hideTimer);
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          SK
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> DevOps Engineer</span> <span>Site Reliability Engineer</span>
            <span> DevOps Engineer</span> <span>Site Reliability Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval: ReturnType<typeof setInterval> | undefined;

  const stopInterval = () => {
    if (interval !== undefined) {
      clearInterval(interval);
      interval = undefined;
    }
  };

  const startStage = (
    max: number,
    minStep: number,
    maxStep: number,
    delay: number,
    next?: () => void
  ) => {
    stopInterval();
    interval = setInterval(() => {
      const step = minStep + Math.round(Math.random() * (maxStep - minStep));
      percent = Math.min(max, percent + step);
      setLoading(percent);
      if (percent >= max) {
        stopInterval();
        if (next) next();
      }
    }, delay);
  };

  // Faster fake progress so the loader doesn't linger too long.
  startStage(60, 4, 8, 60, () => {
    startStage(90, 2, 4, 120, () => {
      startStage(96, 1, 1, 200);
    });
  });

  function clear() {
    stopInterval();
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      stopInterval();
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
