import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";

export const MobileMap = () => {
  const [current, setCurrent] = useState(0);

  const TOTAL_SLIDES = 2; // n-1 in Array
  const ref = useRef<HTMLDivElement>(null);

  const next = () => {
    if (current >= TOTAL_SLIDES) return;
    else setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 0) return;
    else setCurrent(current - 1);
  };

  const desired = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (event.target && event.target) {
      const target = event.target as HTMLDivElement;
      setCurrent(Number(target.id));
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transition = "all 0.2s ease-in-out";
      ref.current.style.transform = `translateX(-${current}00%)`;
    }
  }, [current]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.frame}>
        <div className={styles["button-2-container"]}>
          {["Phase 1.0", "Phase 2.0", "Phase 3.0"].map((num, index) => (
            <div
              className={styles["button-2"]}
              onClick={desired}
              id={index.toString()}
              key={index}
            >
              {num}
            </div>
          ))}
        </div>
        <div className={styles["box-container"]} ref={ref}>
          <div className={styles.box}>
            <div className={styles.phase}>
              <p>
                We&apos;re introducing a stake-less experience for elves to earn{" "}
                <span>$Lembas</span> easier. Simply holding an Elf results in
                passively generated <span>$Lembas</span>, which holders can then
                claim through a dashboard. Our collection has eight{" "}
                <span>legendaries</span> which all have special utilities.{" "}
                <br></br>
                <br></br>Each <span></span>Elf held generates{" "}
                <span>15 $Lembas</span> per day.
                <br></br>
                <br></br>Each Legendary Elf held generates{" "}
                <span>25 $Lembas</span> per day.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.phaseTwo}>
              <p>
                After finishing up Phase 1.0, we will introduce our
                <span> marketplace </span> within the span of a week. As many
                will know, whitelists, collaborations and partnerships
                aren&apos;t always fun to win through raffles and Twitter
                giveaways, so we’ve chosen to allow holders to use their earned{" "}
                <span> $Lembas </span>
                instead.
                <span></span>
                <br></br>
                <br></br>
                Using <span> $Lembas</span>, holders can purchase:
                <br></br>
                &nbsp; ➺ WL spots
                <span></span>
                <br></br>
                &nbsp; ➺ Free mints
                <span></span>
                <br></br>
                &nbsp; ➺ Trait re-rolls
                <span></span>
                <br></br>
                &nbsp; ➺ Tool subscriptions
                <span></span>
                <br></br>
                &nbsp; ➺ Gift hampers, merch, and much more!
                <br></br>
                <br></br>
                After The launch of the marketplace, we will introduce{" "}
                <span>“Alfheim Track Bot,“</span> a tool for <span></span>
                holders to be able to track the metrics of{" "}
                <span>alpha groups </span>
                and <span>blue-chip</span> communities. The <span></span>
                primary purpose of this tool is to help <span></span>
                individuals identify the quality of the <span>alpha </span>
                <span></span>within specific NFT communities, as well as
                <span></span> identify <span>alpha</span> based on the
                portfolios of these communities.
                <br></br>
                <br></br>Features Include: <span></span>
                <br></br>
                &nbsp;&nbsp;» Track Collections <span></span>
                <br></br>
                &nbsp;&nbsp;» Track Holders<span></span>
                <br></br>
                &nbsp;&nbsp;» Track Holders Real Time Activity
                <br></br>
                <span></span>
                &nbsp;&nbsp;» Check Holding and ROI of your wallet
                <span></span>
                <br></br>
                &nbsp;&nbsp;» &amp; much more!
                <br></br>
                <br></br>
                <span></span>Read all of the features&nbsp;
                <a
                  className={styles.mobileLink}
                  href="https://alfheimnft.gitbook.io/alfheimpaper/roadmap/phase-2.0"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.phase}>
              <p>
                Three weeks after mint, 1000 Baby elves with traits and
                utilities entirely different from the adult Elves will be
                <span> airdropped</span> to holders for <span>free</span>.
                <br></br>
                <br></br>
                Baby Elf Utility:<span></span>
                <br></br>
                &nbsp;&nbsp;➺ Holding a normal Elf and a baby Elf will boost the
                amount of <span>$Lembas</span> earned.<span></span>
                &nbsp;&nbsp;<br></br>➺ Babies will provide Elves access to
                private channels in discord and <span>exclusive</span>{" "}
                privileges. <span></span>
                &nbsp;&nbsp;<br></br>➺ Babies will play a big part as an{" "}
                <span>extra advantage</span> in our <span>tool</span> and
                special access will be allowed to people who hold at least one
                Baby Elf.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
