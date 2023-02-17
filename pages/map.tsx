/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import { Card, Dock, DockCard } from "../components/Shared/Dock";
import { MobileMap } from "../components/MobileMap";
import { Loading } from "../components/Loading";
import styles from "../styles/Map.module.css";
const Flip = require("react-reveal/Flip");

const Map: NextPage = () => {
  const [expandFirst, setExpandFirst] = useState(false);
  const [expandSecond, setExpandSecond] = useState(false);
  const [expandThird, setExpandThird] = useState(false);
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showThirdMessage, setShowThirdMessage] = useState(false);
  const [width, setWidth] = useState(0);
  const [isDone, setIsDone] = useState(false);
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

  const showMobile = width <= 1060;

  const styleOne = expandFirst
    ? {
        width: "300%",
        filter: "none",
        zIndex: "100",
      }
    : {
        width: "95%",
        zIndex: "1",
      };
  const styleTwo = expandSecond
    ? {
        width: "300%",
        left: "-100%",
        filter: "none",
        zIndex: "100",
        rightSword: "28%",
        maxWidth: "1080px",
        transform: "rotate(180deg)",
      }
    : {
        width: "95%",
        left: "0",
        zIndex: "1",
        rightSword: "-25%",
        maxWidth: "1080px",
        transform: "none",
      };
  const styleThree = expandThird
    ? {
        width: "300%",
        left: "-200%",
        filter: "none",
        zIndex: "100",
        transform: "translate(-80px)"
      }
    : {
        width: "95%",
        left: "0",
        zIndex: "1",
        transform: "translate(-35px)"
      };
  useEffect(() => {
    if (!expandFirst) {
      setShowFirstMessage(false);
    }
    setTimeout(() => {
      if (expandFirst) {
        setShowFirstMessage(true);
      }
    }, 500);
  }, [expandFirst]);

  useEffect(() => {
    if (!expandSecond) {
      setShowSecondMessage(false);
    }
    setTimeout(() => {
      if (expandSecond) {
        setShowSecondMessage(true);
      }
    }, 500);
  }, [expandSecond]);

  useEffect(() => {
    if (!expandThird) {
      setShowThirdMessage(false);
    }
    setTimeout(() => {
      if (expandThird) {
        setShowThirdMessage(true);
      }
    }, 500);
  }, [expandThird]);


  return (
    <Layout>
      {isDone && (
        <>
          {!showMobile ? (
            <div className={styles.container}>
              <div className={styles.maps}>
                <div className={styles.itemContainer}>
                  <div
                    className={styles.mapItem}
                    onClick={() => setExpandFirst(!expandFirst)}
                    style={{
                      width: styleOne.width,
                      filter: styleOne.filter,
                      zIndex: styleOne.zIndex,
                      height: "100%",
                    }}
                  >
                    <div className={styles.mapImgOne}>
                      <img src="/media/Alfheim Logo.gif" alt="logo" />
                    </div>
                    <h2>First Phase</h2>
                    {expandFirst && (
                      <div className={styles.phase}>
                        <Flip
                          className={styles.phase}
                          top
                          opposite
                          cascade
                          when={showFirstMessage}
                        >
                          Alfheim is introducing a stake-less experience for
                          elves to earn
                          <span></span>$Lembas easier. Simply holding an Elf
                          results in passively <span></span>generated $Lembas,
                          which holders can then claim through a <span></span>
                          dashboard. Our collection has Eight legendaries which
                          all have
                          <span></span>special utilities. <br></br>Each Elf held
                          generates 15 $Lembas per day.
                          <br></br>Each Legendary Elf held generates 25 $Lembas
                          per day.
                        </Flip>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.itemContainer}>
                  <div
                    className={styles.mapItem}
                    onClick={() => setExpandSecond(!expandSecond)}
                    style={{
                      width: styleTwo.width,
                      filter: styleTwo.filter,
                      zIndex: styleTwo.zIndex,
                      height: "100%",
                      left: styleTwo.left,
                    }}
                  >
                    <div
                      className={styles.mapImgTwo}
                      style={{
                        right: styleTwo.rightSword,
                        transform: styleTwo.transform,
                      }}
                    >
                      <img src="/media/Alfheim sword.gif" alt="sword" />
                    </div>
                    <h2>Second Phase</h2>
                    {expandSecond && (
                      <div className={styles.phaseTwo}>
                        <div className={styles.leftCol}>
                          <Flip top opposite cascade when={showSecondMessage}>
                            After finishing up Phase 1.0, we will be
                            <span></span>introducing our marketplace within the
                            <span></span>span of a week. As many will know,
                            <span></span>whitelists, collaborations and
                            partnerships
                            <span></span>aren&apos;t always fun to win through
                            raffles
                            <span></span>and Twitter giveaways, so we’ve chosen
                            <span></span>to allow holders to use their earned
                            <span></span>$Lembas instead.
                            <br></br>
                            <span></span>
                            Using $Lembas, holders can purchase:
                            <span></span>
                            &nbsp; ➺ WL spots
                            <span></span>
                            &nbsp; ➺ Free mints
                            <span></span>
                            &nbsp; ➺ Trait re-rolls
                            <span></span>
                            &nbsp; ➺ Tool subscriptions
                            <span></span>
                            &nbsp; ➺ Gift hampers, merch, and much more!
                          </Flip>
                        </div>
                        <div className={styles.rightCol}>
                          <Flip top opposite cascade when={showSecondMessage}>
                            After The launch of the marketplace, we
                            <span></span>
                            will introduce "Alfheim Track Bot," a tool
                            <span></span>
                            for holders to be able to track the metrics
                            <span></span>
                            of alpha groups and blue-chip communities.
                            <span></span>
                            The primary purpose of this tool is to help
                            <span></span>
                            individuals identify the quality of the alpha
                            <span></span>within specific NFT communities, as
                            well as
                            <span></span>identify alpha based on the portfolios
                            of
                            <span></span>these communities.
                            <br></br>
                            <span></span>Features Include: <span></span>
                            &nbsp;&nbsp;» Track Collections <span></span>
                            &nbsp;&nbsp;» Track Holders<span></span>
                            &nbsp;&nbsp;» Track Holders Real Time Activity
                            <span></span>
                            &nbsp;&nbsp;» Check Holding and ROI of your wallet
                            <span></span>
                            &nbsp;&nbsp;» &amp; much more!
                            <span></span>Read all of the features here:
                            <a
                              className={styles.mapLink}
                              href="https://alfheimnft.gitbook.io/alfheimpaper/roadmap/phase-2.0"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <u>alfheimnft.gitbook.io/alfheimpaper/roadmap</u>
                            </a>
                          </Flip>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.itemContainer}>
                  <div
                    className={styles.mapItem}
                    onClick={() => setExpandThird(!expandThird)}
                    style={{
                      width: styleThree.width,
                      filter: styleThree.filter,
                      zIndex: styleThree.zIndex,
                      height: "100%",
                      left: styleThree.left,
                    }}
                  >
                    <div
                      className={styles.mapImgThree}
                      style={{ transform: styleThree.transform }}
                    >
                      <img src="/media/Flag.gif" alt="flag" />
                    </div>
                    <h2>Third Phase</h2>
                    {expandThird && (
                      <div className={styles.phaseThree}>
                        <div>
                          <Flip top opposite cascade when={showThirdMessage}>
                            Three weeks after mint, 1000 Baby elves with traits
                            and utilities entirely different to the adult Elves
                            will be airdropped to holders for free.
                            <br></br>
                          </Flip>
                        </div>
                        <div style={{ marginLeft: "120px" }}>
                          <Flip top opposite cascade when={showThirdMessage}>
                            Baby Elf Utility:<span></span>
                            &nbsp;&nbsp;➺ Holding a normal Elf and a baby Elf
                            will boost the amount
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; of
                            $Lembas earned.<span></span>
                            &nbsp;&nbsp;➺ Babies will provide Elves access to
                            private channels in <span></span>
                            &nbsp;&nbsp;&nbsp;&nbsp; discord and exclusive
                            privileges. <span></span>
                            &nbsp;&nbsp;➺ Babies will play a big part as an
                            extra advantage in our tool&nbsp;&nbsp;&nbsp;&nbsp;
                            and special access will be allowed to people who
                            hold at <span></span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;least one Baby Elf.
                          </Flip>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.dock} style={{ zIndex: "101" }}>
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
                        <Card src="https://www.isekaimeta.com/assets/white-opensea.svg" />
                      </DockCard>
                    </Dock>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.mobileMapContainer}>
              <MobileMap />
              <div className={styles.dock} style={{ zIndex: "101" }}>
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
          )}
        </>
      )}
    </Layout>
  );
};

export default Map;
