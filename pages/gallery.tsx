/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Gallery.module.css";
import { Card, Dock, DockCard } from "../components/Shared/Dock";
const Fade = require("react-reveal/Fade");
const LightSpeed = require("react-reveal/LightSpeed");
const Bounce = require("react-reveal/Bounce");
const Zoom = require("react-reveal/Zoom");
const Roll = require("react-reveal/Roll");

const Gallery: NextPage = () => {
  const [imgSrc, setImgSrc] = useState("/media/Logo White.gif");
  const [lockScroll, setLockScroll] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPositionAbs, setScrollPositionAbs] = useState(0);
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLockScroll(false);
      setImgSrc("/media/gallery-replacement.png");
    }, 3600);
  }, []);

  useEffect(() => {
    if (!lockScroll) {
      let parent = document.querySelectorAll<HTMLElement>(".animateText");
      let leftParent =
        document.querySelectorAll<HTMLElement>(".animateTextLeft");
      parent.forEach((elem) => {
        elem["style"].width = elem.children[0].clientWidth + "px";
      });
      leftParent.forEach((elem) => {
        elem["style"].width = elem.children[0].clientWidth + "px";
      });
    }
  }, [lockScroll]);

  const parallax = useRef<IParallax>(null!);

  const PAGES = 8;

  useEffect(() => {
    const container = parallax.current.container.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: Event) => {
    const height = parallax.current.space;
    const scrollablePages = PAGES - 1; // because you can't scroll past the last page
    const scrollHeight = height * scrollablePages;
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const percentScrolled = scrollTop / scrollHeight;
    const currentPage = Math.floor(percentScrolled * scrollablePages);
    const currentPageScrollTop = scrollTop - height * currentPage;
    const currentPagePercent = currentPageScrollTop / height;
    setScrollPosition(currentPagePercent);
    setScrollPositionAbs(currentPage + currentPagePercent);
  };

  const pLaxStyle = !lockScroll ? "pLax" : "lockedPLax";
  return (
    <Layout
      style={{
        backgroundImage: `linear-gradient(${
          scrollPosition * 360
        }deg, #ffd34e, #ffa3ff, #0bd1ff)`,
      }}
    >
      <Parallax ref={parallax} pages={7} className={styles[pLaxStyle]}>
        <ParallaxLayer
          sticky={{ start: 0, end: 7 }}
          offset={0}
          speed={-1}
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "space-between",
          }}
        >
          <Fade left big when={!lockScroll}>
            <img src="/media/gallery-left-border.webp" alt="logo" style={{}} />
          </Fade>
          <Fade right big when={!lockScroll}>
            <img src="/media/gallery-right-border.webp" alt="logo" style={{}} />
          </Fade>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundImage: imgSrc }}>
          <img
            src="Alfheim Logo.gif"
            alt=""
            style={{ display: "block", width: "26%", marginLeft: "55%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={7}
          style={{
            backgroundImage: `linear-gradient(${
              scrollPosition * 360
            }deg, #ffd34e, #ffa3ff, #0bd1ff)`,
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>
        {/* logo layer */}
        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Fade right big opposite when={lockScroll}>
            <img src={imgSrc} alt="logo" className={styles.loadingLogo} />
          </Fade>
          <div
            className={styles.logoContainer}
            style={{ position: "absolute", top: 0 }}
          >
            <Fade right big when={!lockScroll}>
              <div className={styles.bgTextContainer}>
                <div className={styles.animateText}>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                </div>
                <div className={styles.animateTextleft}>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                </div>
                <div className={styles.animateText}>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                </div>
                <div className={styles.animateTextleft}>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                  <span className={styles.gallerySpan}>
                    ALFHEIM GALLERY&nbsp;
                  </span>
                </div>
              </div>
              <img
                src={"/media/gallery-replacement.png"}
                alt="logo"
                className={styles.replacementImage}
                style={{ transform: "rotate(90deg)" }}
              />
            </Fade>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.9}
          speed={0.4}
          style={{ pointerEvents: "none", opacity: 0.6 }}
        >
          {!lockScroll && (
            <img
              src={"/media/Alfheim Gallery White.gif"}
              alt="alfheim gallery"
              className={styles.galleryAnimation}
              style={{
                transform: `rotate3d(1, 0, 0, ${
                  (scrollPosition * 360) / 8
                }deg)`,
              }}
            />
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={0.8}
          style={{ opacity: 1, zIndex: 10 }}
          onClick={() => parallax.current.scrollTo(5)}
        >
          {!lockScroll && (
            <div style={{ display: "block", width: "80%", marginLeft: "23%" }}>
              <img src={"/media/Flag.gif"} alt="flag" className={styles.flag} />
            </div>
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.8}
          speed={0.2}
          style={{ opacity: 1, zIndex: 13 }}
        >
          {!lockScroll && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <Zoom
                left
                when={
                  !lockScroll &&
                  scrollPositionAbs > 2.23 &&
                  scrollPositionAbs <= 3.23
                }
              >
                <img
                  src={"/media/gallery-image-3.webp"}
                  alt="gallery image"
                  className={styles.galImg3}
                />
              </Zoom>
              <Zoom
                right
                when={
                  !lockScroll &&
                  scrollPositionAbs > 2.53 &&
                  scrollPositionAbs <= 3.63
                }
              >
                <img
                  src={"/media/gallery-image-2.webp"}
                  alt="flag"
                  className={styles.galImg2}
                />
              </Zoom>
            </div>
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={4.9}
          speed={-0.1}
          style={{ opacity: 1, zIndex: 1 }}
        >
          {!lockScroll && (
            <img
              src={"/media/Alfheim sword.gif"}
              alt="sword"
              className={styles.sword}
            />
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={4.1}
          speed={-0.5}
          style={{ opacity: 0.6, zIndex: 0 }}
        >
          {" "}
          {!lockScroll && (
            <img
              alt="gallery white"
              src={"/media/Alfheim Gallery White.gif"}
              className={styles.galleryBg}
            />
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.8}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 101,
          }}
        >
          {!lockScroll && (
            <LightSpeed
              left
              when={
                !lockScroll &&
                scrollPositionAbs >= 0.8 &&
                scrollPositionAbs <= 1.423
              }
            >
              <div className={styles.card__front}>
                <div className={styles.card}>
                  <div className={styles.card__shine} />
                  <div className={styles.card__glare} />
                  <img
                    src="/media/gallery-image-1.webp"
                    className={styles.galImg1}
                    alt="img"
                  />
                </div>
              </div>
            </LightSpeed>
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.2}
          speed={-0.1}
          onClick={() => parallax.current.scrollTo(3)}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          {!lockScroll && (
            <LightSpeed
              right
              when={
                !lockScroll &&
                scrollPositionAbs >= 0.8 &&
                scrollPositionAbs <= 1.63
              }
            >
              <div className={styles.card__front}>
                <div className={styles.card}>
                  <div className={styles.card__shine} />
                  <div className={styles.card__glare} />
                  <img
                    src="/media/gallery-image-5.webp"
                    className={styles.galImg5}
                    alt="img"
                  />
                </div>
              </div>
            </LightSpeed>
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={-0}
          style={{ pointerEvents: "none", zIndex: 10, opacity: 0.9 }}
        >
          {" "}
          {!lockScroll && (
            <img
              src={"/media/Alfheim Logo.gif"}
              alt="logo"
              className={styles.logoGif}
            />
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          onClick={() => parallax.current.scrollTo(3)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 101,
          }}
        >
          {!lockScroll && (
            <Bounce
              bottom
              when={
                !lockScroll &&
                scrollPositionAbs >= 1.67 &&
                scrollPositionAbs <= 2.19
              }
            >
              <div className={styles.card__front}>
                <div className={styles.card}>
                  <div className={styles.card__shine} />
                  <div className={styles.card__glare} />
                  <img
                    src="/media/gallery-image-4.webp"
                    className={styles.galImg4}
                    alt="img"
                  />
                </div>
              </div>
            </Bounce>
          )}
        </ParallaxLayer>

        <ParallaxLayer
          offset={4.2}
          speed={-0.1}
          onClick={() => parallax.current.scrollTo(5)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          {" "}
          {!lockScroll && (
            <>
              <Roll
                left
                when={
                  !lockScroll &&
                  scrollPositionAbs >= 3.67 &&
                  scrollPositionAbs <= 4.93
                }
              >
                <div className={styles.card__front}>
                  <div className={styles.card}>
                    <div className={styles.card__shine} />
                    <div className={styles.card__glare} />
                    <img
                      src="/media/elf-3.webp"
                      className={styles.galImg7}
                      alt="img"
                    />
                  </div>
                </div>
              </Roll>
              <Roll
                right
                when={
                  !lockScroll &&
                  scrollPositionAbs >= 3.97 &&
                  scrollPositionAbs <= 5.3
                }
              >
                <div className={styles.card__front}>
                  <div className={styles.card}>
                    <div className={styles.card__shine} />
                    <div className={styles.card__glare} />
                    <img
                      src="/media/elf-4.webp"
                      className={styles.galImg6}
                      alt="img"
                    />
                  </div>
                </div>
              </Roll>
            </>
          )}
        </ParallaxLayer>
        <ParallaxLayer
          offset={6}
          speed={-0}
          onClick={() => parallax.current.scrollTo(0)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          {!lockScroll && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <img
                src="/media/right-elf.webp"
                alt="img"
                className={styles.rightElf}
              />
              <img
                src="/media/left-elf.webp"
                alt="img"
                className={styles.leftElf}
              />
              <div className={styles.card__front}>
                <div className={styles.card}>
                  <div className={styles.card__shine} />
                  <div className={styles.card__glare} />
                  <img
                    src="/media/logo.webp"
                    alt="img"
                    style={{
                      display: "block",
                      width: "30%",
                      borderRadius: "100px",
                      margin: "0 auto",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </ParallaxLayer>
      </Parallax>
      {!lockScroll && (
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
      )}
    </Layout>
  );
};

export default Gallery;
