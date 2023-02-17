/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

export const KiritoLoading: React.FC = (): JSX.Element => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready && (
        <div className={styles.kLoadingContainer}>
          <img
            className={styles.loadingImg}
            src="/media/Alfheim_Loading.gif"
            alt="loading"
          />
        </div>
      )}
    </>
  );
};
