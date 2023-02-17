/* eslint-disable @next/next/no-img-element */
import { NextComponentType } from "next";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Loading, KiritoLoading } from "../Loading";
import styles from "../../styles/Home.module.scss";
import { toast } from "react-toastify";
import ModalVideo from "react-modal-video";
import { Countdown } from "../Shared/Countdown";
import { useRouter } from "next/router";
const Fade = require("react-reveal/Fade");

const About: NextComponentType = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [wait, setWait] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [mintIsLive, setMintIsLive] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [show, setShow] = useState(true);
  const isBrowser = () => typeof window !== "undefined";
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const whitelistStart = 4077241200000;
  // const whitelistStart = 1676476803271;
  const router = useRouter();


  useEffect(() => {
    setShow(true);
    const now = new Date().getTime();
    if (now >= whitelistStart) {
      setMintIsLive(true);
    } else {
      setShowTimer(true);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, []);

  useEffect(()=> {
    if (mintIsLive) {
      toast(
        <>
          <span>Mint is live! </span>
          <Link href="/mint">
            <u>alfheimnft.com/mint</u>
          </Link>
        </>,
        { type: "info" }
      );
    }
  }, [mintIsLive]);

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

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setWait(false);
      }, 500);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isBrowser()) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const mobileVid = width <= 432;
  const logo = useRef(null);
  const youTubeClassNames = {
    modalVideoEffect: styles["modal-video-effect"],
    modalVideo: styles["modal-video"],
    modalVideoClose: styles["modal-video-close"],
    modalVideoBody: styles["modal-video-body"],
    modalVideoInner: styles["modal-video-inner"],
    modalVideoIframeWrap: styles["modal-video-movie-wrap"],
    modalVideoCloseBtn: styles["modal-video-close-btn"],
  };

  const youTubeProps = {
    autoplay: 1,
    muted: 0,
  }

  const route = "/mint";
  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShow(false);
    setTimeout(()=> {
      router.push(route);
    }, 1000);
  }
  
  return (
    <div className={styles.container}>
      {showTimer && (
        <Fade bottom when={isDone && show}>
          <div>
            <Link href="/mint" onClick={handleClick}>
              <div className={styles.mintContainer}>
                <Countdown />
              </div>
            </Link>
          </div>
        </Fade>
      )}
      <ModalVideo
        classNames={youTubeClassNames}
        channel="youtube"
        isOpen={isOpen}
        videoId="WcVMXcuqPUg"
        onClose={() => setOpen(false)}
        {...youTubeProps}
      />
      <Fade left when={isDone && show}>
        <div className={styles.headerSocials}>
          <div className={styles.socialsWrapper}>
            <a
              href="https://twitter.com/AlfheimNFT"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <img
                src="https://www.isekaimeta.com/assets/white-twitter.svg"
                alt="Twitter Icon"
                className="external-icon white"
              />
            </a>
            <a
              href="https://discord.gg/alfheimnft"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <img
                src="https://www.isekaimeta.com/assets/white-discord.svg"
                alt="Discord Icon"
                className="external-icon white"
              />
            </a>
            <a
              href="https://opensea.io/collection/alfheimnft"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <img
                src="https://www.isekaimeta.com/assets/white-opensea.svg"
                alt="OpenSea Icon"
                className="external-icon white"
              />
            </a>
          </div>
        </div>
      </Fade>
      <Fade bottom opposite when={isDone && show}>
        <div className={styles.videoContainer}>
          <video className={styles.video} muted autoPlay loop playsInline>
            <source src="/media/tracker.mp4" type="video/mp4" />
          </video>
          <div className={styles.playButton}>
            <img
              className={styles.play}
              src="/media/play.webp"
              alt="play"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </Fade>
      {!mintIsLive ? (
        <Fade right when={isDone && show}>
          <div className={styles.banner}>
            <img src="/media/Alfheim Logo.gif" alt="logo" />
            <div className={styles.bannerText}>
              <p>Alfheim NFT</p>
              <h3>Discover our Gallery</h3>
            </div>
            <Link className={styles.bannerBtnLink} href="/gallery">
              <div className={styles.bannerBtn}>
                <span className="hidden lg:block">view</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </Fade>
      ) : (
        <Fade right when={isDone && show}>
          <div className={styles.banner}>
            <img src="/media/Alfheim Logo.gif" alt="logo" />
            <div className={styles.bannerText}>
              <p>Alfheim NFT</p>
              <h3>MINT IS LIVE</h3>
            </div>
            <Link className={styles.bannerBtnLink} href="/mint">
              <div className={styles.bannerBtn}>
                <span className="hidden lg:block">MINT</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default About;
