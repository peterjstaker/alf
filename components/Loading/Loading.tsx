import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
const Fade = require("react-reveal/Fade");

export interface LoadingProps {
  endpoint?: string;
}

export const Loading: React.FC<LoadingProps> = ({ endpoint }): JSX.Element => {
  const [completed, setCompleted] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  let percentComplete = 0;
  const myPercent = () => {
    if (percentComplete <= 99) {
      setPercentCompleted((percentComplete += 4));
    } else {
      setPercentCompleted(100);
    }
  };

  useEffect(() => {
    const myInterval = setInterval(myPercent, 100);
    setTimeout(() => {
      clearInterval(myInterval);
      setPercentCompleted(100);
      setCompleted(true);
    }, 4000);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.center}>
        <Fade big opposite when={loading}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </Fade>
        <div className={styles.progressBarContainer}>
          <Fade big opposite when={loading}>
            <div className={completed ? styles.complete : styles.progress}>
              <div className={completed ? styles.done : styles.color}></div>
            </div>
            <div className={styles.progressLabel}>
              <span id="progress">{`${percentCompleted}%`}</span>
              <div>
                <span>HTTPS://ALFHEIMNFT.COM</span>
                {endpoint && <span>{endpoint}</span>}
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};
