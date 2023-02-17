import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./styles.module.css";
const Fade = require("react-reveal/Fade");
import { useRouter } from "next/router";
import Link from "next/link";
export interface FaqDropdownContentProps {
  answer: string;
}

export interface FaqDropdownProps {
  question: string;
  answer: string;
}

export const FaqDropdown: React.FC<FaqDropdownProps> = ({ question, answer }): JSX.Element => {
  const [isToggled, setToggle] = useState(false);
  const menubg = useSpring({ background: isToggled ? "#6ce2ff" : "#ebebeb" });
  const { y } = useSpring({
    y: isToggled ? 180 : 0,
  });
  const menuAppear = useSpring({
    transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
    opacity: isToggled ? 1 : 0,
  });
const router = useRouter();
  return (
    <Fade right>
      <div
        className={styles.dropdownWrapper}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <animated.button
          style={menubg}
          className={styles.dropdown}
          onClick={() => setToggle(!isToggled)}
        >
          <div className="buttonText">
            <span className={styles.text}>{question} </span>
            <animated.span
              style={{
                transform: y.interpolate((y) => `rotateX(${y}deg)`),
              }}
            >
              ▼
            </animated.span>
          </div>
        </animated.button>
        <animated.div style={menuAppear}>
          {isToggled ? (
            <div className={styles.faqDropdownContent}>
              <p>
                <Fade bottom>
                  {question !== "What is the plan after mint?" ? (
                    answer
                  ) : (
                    <>
                      <span>
                        The first phase of our roadmap will go live within a few
                        weeks of reveal. Check out{" "}
                      </span>
                      <Link href="/map">
                        <u>the map</u>
                      </Link>
                      <span>
                        {" "}
                        for more details about our first three phases. After
                        completion of the first three phases, we will utilize
                        feedback and suggestions from the community to enhance
                        the tracking tool and token and continue to add features
                        and additional functionality.
                      </span>
                    </>
                  )}
                </Fade>
              </p>
            </div>
          ) : null}
        </animated.div>
      </div>
    </Fade>
  );
};
