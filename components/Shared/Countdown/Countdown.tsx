import * as React from "react";
import styles from "./styles.module.scss";


export const Countdown = (): JSX.Element => {
  const whitelistStart = 4077241200000;
  const calculateTimeLeft = () => {
    const difference = whitelistStart - new Date().getTime();
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    console.log(difference);
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.clockRow}>
        <div className={styles.timeColumn}>
          {/* <span className={styles.timeNum}>{timeLeft.hours}</span> */}
          <span className={styles.timeNum}>24</span>
          <span className={styles.timeLabel}>HOURS</span>
        </div>
        <div className={styles.timeColumn}>
          <span className={styles.timeNum}>{timeLeft.minutes}</span>
          <span className={styles.timeLabel}>MINUTES</span>
        </div>
        <div className={styles.timeColumn}>
          <span className={styles.timeNum}>{timeLeft.seconds}</span>
          <span className={styles.timeLabel}>SECONDS</span>
        </div>
      </div>
    </>
  );
};
