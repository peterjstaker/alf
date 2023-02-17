/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { CardDeck } from "../components/CardDeck";
import { Card as Stacker } from "../components/CardDeck/Card";
import { Card, Dock, DockCard } from "../components/Shared/Dock";
import styles from "../styles/Team.module.css";
const Zoom = require("react-reveal/Zoom");
const Fade = require("react-reveal/Fade");
const Bounce = require("react-reveal/Bounce");

const Team: NextPage = () => {
  const [width, setWidth] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [showContent, setShowContent] = useState(false);
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
    setTimeout(() => {
      setShowContent(true);
    }, 300);
    setTimeout(() => {
      setShow(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (isBrowser()) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const showMobile = width <= 864;

  const teamMembers = [
    { name: "Kirito", img: "/media/kirito.webp", title: "Founder" },
    { name: "ak♛", img: "/media/ak.webp", title: "Advisor" },
    { name: "Seuss", img: "/media/papisuess.webp", title: "Head of Staff" },
    { name: "Adcel", img: "/media/picklerick.webp", title: "Main Artist" },
    {
      name: "Algernon",
      img: "/media/algernonregla.webp",
      title: "Animation Artist",
    },
    { name: "SatoshiSadboi", img: "/media/elf-2.webp", title: "Developer" },
    { name: "0xAgony", img: "/media/agony.webp", title: "Developer" },
    { name: "Tokhi", img: "/media/tokhi.webp", title: "Developer" },
  ];

  const CARDS = [
    {
      name: "Kirito",
      title: "Founder",
      qr: "/media/qr-kirito.webp",
      twitter: "https://twitter.com/Kirit0lol",
      discord: "Kirito. #3229",
      description:
        "Kirito, also known as Santos from Nepal, is a cyber security student with a passion for art and web design. Over the past 9 months, he has worked tirelessly to build a strong team, community, and project.",
      descriptionTwo:
        "Thanks to his passion for Alfheim and love for the community, Kirito has turned what started as an art based project into one that is rich with utility and committed to providing holders a tremendous amount of long-term value. Through unrelenting efforts, he has established multiple partnerships with proven leaders in the space and has built a next level tracking tool, staking platform, and marketplace in order to bring the community as much value as possible.",
      img: "/media/kirito.webp",
    },
    {
      name: "ak♛",
      title: "Advisor",
      qr: "/media/ak-qr.webp",
      twitter: "https://twitter.com/xlordak",
      discord: "Kirito. #3229",
      description:
        "Ak is the founder of ColiseumNFT. He is a proven and respected leader in the space and has been an advisor for Alfheim since day one. From the very beginning, Ak has worked alongside Kirito to ensure the success of the project.",
      descriptionTwo:
        "Ak's guidance and his work behind the scenes has been instrumental to the growth of Alfheim. He is a highly valued member of the team and has been a tremendous asset. He helped conceptualize and enhance the vision and roadmap in order to maximize utility and value for the community.",
      img: "/media/ak.webp",
    },
    {
      name: "Seuss",
      title: "Head of Staff",
      qr: "/media/qr-seuss.webp",
      twitter: "https://twitter.com/StonkManSeuss",
      discord: "Kirito. #3229",
      description:
        'Seuss/Soos, also known as Alex, is based in Ontario, Canada and is the Head of Staff for Alfheim. He helps oversee the general flow of day to day operations and assists Kirito with anything he needs a hand with. Seuss can be considered "the voice of the elves," as he currently runs the majority of AMAs and handles public speaking duties for Alfheim.',
      descriptionTwo:
        "Seuss is an experienced and respected crypto caller. After brief stints working at Genesis Mob as one of the crypto heads, and World of Pepe calling coins and shit coins, Suess joined Blockchain Bandits as a mod before eventually becoming a part of the core team. He has since resumed his role as a crypto caller & shitcoin guru.",
      img: "/media/papisuess.webp",
    },
    {
      name: "Adcel",
      title: "Main Artist",
      qr: "/media/qr-picklerick.webp",
      twitter: "https://twitter.com/1Wr4th",
      discord: "pickle rick#2401",
      description:
        "Adcel is an incredibly talented digital artist from the Philippines and the main artist for Alfheim. He is currently studying architecture, art, and animation and was responsible for creating a collection of 1,000 hand drawn anime-style elves.",
      descriptionTwo:
        "Before joining Alfheim, Adcel worked with numerous well-known and respected NFT projects. A few notable collections featuring his art are Coliseum, Angry Cats, Cyborg Ape Gang, and PegaxyOfficial.",
      img: "/media/picklerick.webp",
    },
    {
      name: "Algernon",
      title: "Animation Artist",
      qr: "/media/qr-algernon.webp",
      twitter: "https://twitter.com/KafaDosha",
      discord: "Kirito. #3229",
      description:
        "Meet Algernon, a talented freelance motion artist and the animation artist for Alfheim, based in the United States. Starting off his career by creating animations for musicians, Algernon has since grown to work with some of the biggest names in the industry, including Microsoft, Sony, and Spotify.",
      descriptionTwo:
        "His unique blend of creativity and technical skill allows him to bring even the most complex ideas to life through motion and animation. Now looking to expand his work in the field of web3, he is eager to explore the new possibilities and creative challenges that this area of technology presents.",
      img: "/media/algernonregla.webp",
    },
    {
      name: "SatoshiSadboi",
      title: "Developer",
      qr: "/media/qr-satoshi.webp",
      twitter: "https://twitter.com/SatoshiSadboi",
      discord: "Kirito. #3229",
      description:
        "SatoshiSadboi is a software engineer, technologist, and philosopher based in Seattle, Washington. In web2, he leads new product initiatives for an online healthcare marketplace with 100 million+ global users. He is responsible for bringing digital products from concept to market.",
      descriptionTwo:
        "SatoshiSadboi is a Web3 founder, artist, and engineer committed to creating unique experiences, building strong communities, and encouraging creativity. He was responsible for developing the website and graphical user interface of the tracking tool.",
      img: "/media/satoshi.webp",
    },
    {
      name: "0xAgony",
      title: "Developer",
      qr: "/media/qr-agony.webp",
      twitter: "https://twitter.com/iAgonyii",
      discord: "Kirito. #3229",
      description:
        "0xAgony, also known as Roy, is an experienced software engineer from the Netherlands. At Alfheim, he works as a backend developer and was responsible for building the internal api for the Alfheim tracking tool.",
      descriptionTwo:
        "0xAgony has over 5 years of cybersecurity and software engineering experience working for government organizations and major international companies, as well as almost 2 years of experience in web3 as a developer and trader. He is the founder of competitive gaming communities and has built software with 1M+ users.",
      img: "/media/agony.webp",
    },
    {
      name: "Tokhi",
      title: "Developer",
      qr: "/media/qr-ali.webp",
      twitter: "https://twitter.com/tokhiverse",
      discord: "Kirito. #3229",
      description:
        "Tokhi, otherwise known as Ali, is a full stack developer based out of Morocco that also lives partially in France. For Alfheim, he is responsible for auditing smart contracts as well as the design and development of both the frontend and backend of the marketplace.",
      descriptionTwo:
        "Formerly a web2 dev, Tokhi's passion for new technologies pushed him to discover web3. He has since been able to collaborate with and contribute to numerous NFT projects, such as KaijuKongz, Amai NFT, and Owls of Bushido.",
      img: "/media/tokhi.webp",
    },
  ];

  return (
    <Layout>
      {isDone && (
        <div className={styles.yeet}>
        {showContent && (
          <div className={styles.container}>
            {showMobile ? (
              <>
                <div className={styles.teamTitle}>
                  <h1>Team Members</h1>
                </div>
                <div className={styles.mobileCardDeck}>
                  <CardDeck />
                </div>
              </>
            ) : (
              <div className={styles.team}>
                <Zoom left cascade>
                  <div className={styles.teamMembers}>
                    <div className={styles.teamTitle}>
                      <h1>Team Members</h1>
                    </div>
                    {teamMembers.map((value, index) => {
                      return (
                        <div className={styles.member} key={index}>
                          <div
                            className={styles.cardContainer}
                            onClick={() => setSelectedIdx(index)}
                          >
                            <div className={styles.memberImg}>
                              <img className={styles.img} alt="Team Member Image" src={value.img} />
                            </div>
                          </div>
                          <h2>{value.name}</h2>
                          <p>{value.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </Zoom>
                <Fade right when={show}>
                  <div className={styles.teamArt}>
                    <Stacker card={CARDS[selectedIdx]} />
                  </div>
                </Fade>
              </div>
            )}
          </div>

        )}
        <Bounce bottom when={show}>
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
                  rel="noreferrer">
                  <Card src="https://www.isekaimeta.com/assets/white-opensea.svg" />
                </a>
              </DockCard>
            </Dock>
          </div>
        </Bounce>
        </div>
      )}
    </Layout>
  );
};

export default Team;
