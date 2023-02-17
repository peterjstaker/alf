/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Card, Dock, DockCard } from "../components/Shared/Dock";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Lore.module.css";
import { FlipCard } from "../components/Shared/FlipCard";
const Bounce = require("react-reveal/Bounce");

const Lore: NextPage = () => {
  const [width, setWidth] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const isBrowser = () => typeof window !== "undefined";

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (isBrowser()) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const showMobile = width <= 652;

  useEffect(() => {
    const onPageLoad = () => {
      setIsDone(true);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <Layout>
      {isDone && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.loreContainer}>
              <h1 className={styles.loreHeader}>
                <Bounce bottom cascade>
                  The Lore
                </Bounce>
              </h1>
              {!showMobile ? (
                <>
                  <Bounce bottom>
                    <div className={styles.gridOverview}>
                      <div className={`${styles.boxImg} ${styles.boxImg1}`}>
                        <div className={styles.frame}>
                          <div className={styles.loreImgContainer}>
                            <img src="/media/lore 1.webp" alt="" />
                          </div>
                          <div className={styles.frameContainer} />
                        </div>
                        <div className={`${styles.boxText} ${styles.boxText1}`}>
                          The Alfheim is the dwelling of the Elves, where all
                          kinds of Elves reside; from the elegant light elves,
                          right through to the dregs of the dark elves.
                        </div>
                        <div
                          className={`${styles.boxText} ${styles.boxText1p2}`}
                        >
                          Four light elves from the highest echelon of nobility,
                          protect the Alfheim Realm itself, allowing the Elves
                          to live in harmony under the Light of Alfheim, the
                          sole provider of the energy the realm survives on.
                        </div>
                      </div>
                      <div>
                        <div className={`${styles.boxImg} ${styles.boxImg2}`}>
                          <div className={styles.frame}>
                            <div className={styles.loreImgContainer}>
                              <img src="/media/lore 2.webp" alt="" />
                            </div>
                            <div className={styles.frameContainer} />
                          </div>
                          <div
                            className={`${styles.boxText} ${styles.boxText2}`}
                          >
                            The Light of Alfheim is the realm&apos;s main energy
                            source, providing Elves with their powers and mana.
                            However, even more than that, the Light of Alfheim
                            grants the power of inter-realm traversing to the
                            populace.
                          </div>
                        </div>
                      </div>
                    </div>
                  </Bounce>

                  <Bounce bottom>
                    <div className={`${styles.boxImg} ${styles.boxImgCenter}`}>
                      <div className={styles.frame}>
                        <div className={styles.loreImgContainer}>
                          <img src="/media/lore 3.webp" alt="" />
                        </div>
                        <div className={styles.frameContainer} />
                      </div>
                      <div className={`${styles.boxText} ${styles.boxText3}`}>
                        A spy commissioned by the nobles has noticed suspicious
                        movements within the castle of the dark elves finding
                        sufficient evidence that they are plotting something
                        malicious, but to understand this in further detail, we
                        must take a trip back to the past, into Alfheim’s
                        history
                      </div>
                    </div>
                  </Bounce>

                  <Bounce bottom>
                    <div className={styles.gridOverview2}>
                      <div className={`${styles.boxImg} ${styles.boxImg4}`}>
                        <div className={styles.frame}>
                          <div className={styles.loreImgContainer}>
                            <img src="/media/lore 4.webp" alt="" />
                          </div>
                          <div className={styles.frameContainer} />
                        </div>
                        <div className={`${styles.boxText} ${styles.boxText4}`}>
                          The Light Elves and Dark Elves have been fighting for
                          over a thousand years to gain control over the Light
                          of Alfheim.
                        </div>
                        <div
                          className={`${styles.boxText} ${styles.boxText4p2}`}
                        >
                          Ownership of the Light of Alfheim gives the holder the
                          right to rule Alfheim, but even more than that, there
                          is a power it gives that not many know, a power that
                          the Dark Elves have sought more over anything: The
                          ability and uncontestable power to wage war on other
                          realms.
                        </div>
                      </div>
                      <div className={`${styles.boxImg} ${styles.boxImg5}`}>
                        <div className={styles.frame}>
                          <div className={styles.loreImgContainer}>
                            <img src="/media/lore 5.webp" alt="" />
                          </div>
                          <div className={styles.frameContainer} />
                        </div>
                        <div className={`${styles.boxText} ${styles.boxText5}`}>
                          The Light Elves have prevailed time and time again
                          over the Dark Elves, preventing them from taking
                          control of the light of Alfheim.
                        </div>
                        <div
                          className={`${styles.boxText} ${styles.boxText5p2}`}
                        >
                          With the inner conflicts between the Dark Elves and
                          their constant power shifts due to leadership changing
                          from time to time, The dark elves have yet to succeed
                          in the war… for now...
                        </div>
                      </div>
                    </div>
                  </Bounce>

                  <Bounce bottom>
                    <div className={`${styles.boxImg} ${styles.boxImgCenter2}`}>
                      <div className={styles.frame}>
                        <div className={styles.loreImgContainer}>
                          <img src="/media/lore 6.webp" alt="" />
                        </div>
                        <div className={styles.frameContainer} />
                      </div>
                      <div className={`${styles.boxText} ${styles.boxText6}`}>
                        That all changed during this new era , a new leader has
                        risen above all candidates, a figure with
                        characteristics never seen before in Dark Elf
                        leadership. He has led the charge with an army of Dark
                        Elves, alongside his hand-picked generals towards the
                        battlefield to have one last final battle with the Light
                        Elves
                      </div>
                    </div>
                  </Bounce>

                  <Bounce bottom>
                    <div className={styles.gridOverview3}>
                      <div className={`${styles.boxImg} ${styles.boxImg7}`}>
                        <div className={styles.frame}>
                          <div className={styles.loreImgContainer}>
                            <img src="/media/lore 7.webp" alt="" />
                          </div>
                          <div className={styles.frameContainer} />
                        </div>
                        <div className={`${styles.boxText} ${styles.boxText7}`}>
                          The spy has informed the Light Elves about his
                          findings and the Dark Elf army marching towards the
                          Light Elves’ domain, prompting the Four High Elves to
                          prepare to head to the battlefield once more.
                        </div>
                        <div
                          className={`${styles.boxText} ${styles.boxText7p2}`}
                        >
                          The Fire Elves, Water Elves, Earth Elves and Air
                          Elves, historically neutral in standing, have all come
                          together to protect the inhabitants of the land and
                          Light of Alfheim.
                        </div>
                      </div>
                      <div className={`${styles.boxImg} ${styles.boxImg8}`}>
                        <div className={styles.frame}>
                          <div className={styles.loreImgContainer}>
                            <img src="/media/lore 8.webp" alt="" />
                          </div>
                          <div className={styles.frameContainer} />
                        </div>
                        <div className={`${styles.boxText} ${styles.boxText8}`}>
                          The Four High Elves ready their gear, refurnished and
                          reinforced from the last Elven war and prepare their
                          army to march onto the battlefield.
                        </div>
                        <div
                          className={`${styles.boxText} ${styles.boxText8p2}`}
                        >
                          This may be the last and final war to decide which
                          side takes control of the Light of Alfheim. The future
                          of Alfheim is at stake, as the Dark Elves have never
                          been as bold as now, whether the Light Elves prevail
                          or the dark elves come out on top.
                        </div>
                      </div>
                    </div>
                  </Bounce>

                  <Bounce bottom>
                    <div className={`${styles.boxImg} ${styles.boxImgCenter3}`}>
                      <div className={styles.frame}>
                        <div className={styles.loreImgContainer}>
                          <img src="/media/lore 9.webp" alt="" />
                        </div>
                        <div className={styles.frameContainer} />
                      </div>
                      <div className={`${styles.boxText} ${styles.boxText9}`}>
                        The Great War has begun. Who will win and change the
                        course of history? Only time will tell. TO BE
                        CONTINUED...
                      </div>
                    </div>
                  </Bounce>
                </>
              ) : (
                <div className={styles.mobileContainer}>
                  <Bounce left>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "24px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 1.webp"}
                        fullText={
                          "The Alfheim is the dwelling of the Elves, where all kinds of Elves reside; from the elegant light elves, right through to the dregs of the dark elves. Four light elves from the highest echelon of nobility, protect the Alfheim Realm itself, allowing the Elves to live in harmony under the Light of Alfheim, the sole provider of the energy the realm survives on."
                        }
                      />
                    </div>
                  </Bounce>
                  <Bounce right>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "24px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 2.webp"}
                        fullText={
                          "The Light of Alfheim is the realm's main energy source, providing Elves with their powers and mana. However, even more than that, the Light of Alfheim grants the power of inter-realm traversing to the populace."
                        }
                      />
                    </div>
                  </Bounce>
                  <Bounce left>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "24px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 3.webp"}
                        fullText={
                          "A spy, commissioned by the nobles has noticed suspicious movements within the castle of the dark elves, finding sufficient evidence that they are plotting something malicious, but to understand this in further detail, we must take a trip back to the past, into Alfheim’s history"
                        }
                      />
                    </div>
                  </Bounce>
                  <Bounce right>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "24px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 4.webp"}
                        fullText={
                          "The Light Elves and Dark Elves have been fighting for over a thousand years to gain control over the Light of Alfheim. Ownership of the Light of Alfheim gives the holder the right to rule Alfheim, but even more than that, there is a power it gives that not many know, a power that the Dark Elves have sought more over anything: The ability and uncontestable power to wage war on other realms."
                        }
                      />
                    </div>
                  </Bounce>
                  <div
                    style={{
                      display: "block",
                      height: "500px",
                      marginBottom: "24px",
                    }}
                  >
                    <FlipCard
                      src={"/media/lore 5.webp"}
                      fullText={
                        "The Light Elves have prevailed time and time again over the Dark Elves, preventing them from taking control of the light of Alfheim. With the inner conflicts between the Dark Elves and their constant power shifts due to leadership changing from time to time, The dark elves have yet to succeed in the war… for now..."
                      }
                    />
                  </div>
                  <Bounce left>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "24px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 6.webp"}
                        fullText={
                          "That all changed during this new era , a new leader has risen above all candidates, a figure with characteristics never seen before in Dark Elf leadership. He has led the charge with an army of Dark Elves, alongside his hand-picked generals towards the battlefield to have one last final battle with the Light Elves"
                        }
                      />
                    </div>
                  </Bounce>
                  <Bounce right>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "24px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 7.webp"}
                        fullText={
                          "The spy has informed the Light Elves about his findings and the Dark Elf army marching towards the Light Elves’ domain, prompting the Four High Elves to prepare to head to the battlefield once more. The Fire Elves, Water Elves, Earth Elves and Air Elves, historically neutral in standing, have all come together to protect the inhabitants of the land and Light of Alfheim."
                        }
                      />
                    </div>
                  </Bounce>
                  <Bounce left>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "24px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 8.webp"}
                        fullText={
                          "The Four High Elves ready their gear, refurnished and reinforced from the last Elven war and prepare their army to march onto the battlefield. This may be the last and final war to decide which side takes control of the Light of Alfheim. The future of Alfheim is at stake, as the Dark Elves have never been as bold as now, whether the Light Elves prevail or the dark elves come out on top."
                        }
                      />
                    </div>
                  </Bounce>
                  <Bounce right>
                    <div
                      style={{
                        display: "block",
                        height: "500px",
                        marginBottom: "124px",
                      }}
                    >
                      <FlipCard
                        src={"/media/lore 9.webp"}
                        fullText={
                          "The Great War has begun. Who will win and change the course of history? Only time will tell. TO BE CONTINUED..."
                        }
                      />
                    </div>
                  </Bounce>
                </div>
              )}
            </div>
            <div className={styles.dock}>
              <Dock>
                <DockCard>
                  <a
                    href="https://twitter.com/AlfheimNFT"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Card src="https://www.isekaimeta.com/assets/white-twitter.svg" />
                  </a>
                </DockCard>
                <DockCard>
                  <a
                    href="https://discord.gg/alfheimnft"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Card src="https://www.isekaimeta.com/assets/white-discord.svg" />
                  </a>
                </DockCard>
                <DockCard>
                  <a
                    href="https://opensea.io/collection/alfheimnft"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Card src="https://www.isekaimeta.com/assets/white-opensea.svg" />
                  </a>
                </DockCard>
              </Dock>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Lore;
