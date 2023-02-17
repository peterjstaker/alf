import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Faq.module.css";
import { FaqDropdown } from "../components/FaqDropdown";
import { Card, Dock, DockCard } from "../components/Shared/Dock";
const Bounce = require("react-reveal/Bounce");
const Fade = require("react-reveal/Fade");

const Map: NextPage = () => {
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

  const questions = [
    {
      question: "What is Alfheim?",
      answer:
        "Alfheim is a collection of 1000 hand-drawn anime style NFTs on the ethereum blockchain. Alfheim seeks to bring holders unrivaled utility. Welcome to the world of forgotten realms.",
    },
    {
      question: "What is the mint price?",
      answer:
        "The mint price is 0.077Ξ for individuals on the whitelist and 0.088Ξ for those on the waitlist.",
    },
    {
      question: "What is the supply?",
      answer:
        "The Alfheim collection features 1000 NFTs, of which 800 will be allocated for whitelist, and 200 will be allocated for the wait list.",
    },
    {
      question: "What Blockchain and marketplace will it be accessible on?",
      answer:
        "The collection will be minting on the Ethereum blockchain and the collection will be available on OpenSea.",
    },
    {
      question: "What is the plan after mint?",
      answer:
        "The first phase of our roadmap will go live within a few weeks of reveal. Check out the map for more details about our first three phases. After completion of the first three phases, we will utilize feedback and suggestions from the community to enhance the tracking tool and token and continue to add features and additional functionality.",
    },
  ];
  return (
    <Layout>
      {isDone && (
        <div className={styles.yeet}>
          <section className={styles.faq} id="faq">
            <div className={styles.wrapper}>
              <h1 className={styles.title}>
                <Bounce right cascade>
                  {" "}
                  FAQ
                </Bounce>
              </h1>
              <div className={styles.faqWrapper}>
                {questions.map((qa, index) => (
                  <React.Fragment key={`qa=${index}`}>
                    <Fade bottom cascade>
                      <FaqDropdown question={qa.question} answer={qa.answer} />
                    </Fade>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
          <Bounce bottom>
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
          </Bounce>
        </div>
      )}
    </Layout>
  );
};

export default Map;
