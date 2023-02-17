import React, { useRef } from "react";
import { useSpring, animated, useSprings, config } from "react-spring";
import { Card } from "./Card";
import styles from "./styles.module.css";

const springConfig = {
  tension: 350,
  friction: 60,
  precision: 0.001,
  velocity: 0.001,
  clamp: true,
};

  const CARDS = [
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
        'Seuss/Soos, also known as Alex, is based in Ontario, Canada is the Head of Staff for Alfheim. He helps oversee the general flow of day to day operations and assists Kirito with anything he needs a hand with. Seuss can be considered "the voice of the elves," as he currently runs the majority of AMAs and handles public speaking duties for Alfheim.',
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
        "SatoshiSadboi is a web3 founder, artist, and engineer committed to creating unique experiences, building strong communities, and encouraging creativity. He was responsible for developing the website and graphical user interface of the tracking tool.",
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
  ];

const POSITION_MULTIPLIER_CONFIG = {
  active: 1.8,
  before: {
    extreme: 0.1,
    rest: 0.3,
  },
  after: {
    extreme: 1.2,
    rest: 1.8,
  },
};

const CARD_STACK_MARGIN = 30;
const DURATION = 300;
const CARD_HEIGHT = 256;
const BASE_Z_INDEX = 9;

const from = (i: number) => ({
  y: -500,
  scale: 1,
  x: 0,
  rotateZ: 0,
  transformOrigin: "center",
  zIndex: i + BASE_Z_INDEX,
});

const getWrapperHeight = () => {
  let height = 0;
  if (CARDS.length > 1) {
    height = CARD_HEIGHT + CARD_STACK_MARGIN * (CARDS.length - 1);
  } else if (CARDS.length === 1) {
    height = CARD_HEIGHT;
  }
  return height;
};

export const CardDeck = () => {
  const order = useRef(CARDS.map((_, index) => index));
  const [wrapperSpring, setWrapperSpring] = useSpring(() => ({
    height: `${getWrapperHeight()}px`,
  }));
  const [billCardSprings, setBillCardSprings] = useSprings(
    CARDS.length,
    (index) => {
      const idx = order.current.indexOf(index);
      return {
        from: { ...from(idx), y: getWrapperHeight() / 2 - CARD_HEIGHT / 2 },
        to: async (animate) => {
          await animate({
            y: idx * CARD_STACK_MARGIN,
            rotateZ: idx === CARDS.length - 1 ? -3 : idx % 2 ? -1 : 1,
            zIndex: idx + BASE_Z_INDEX,
            immediate: (key: string) => key === "zIndex",
            delay: DURATION * 0.7,
            config: { ...config.gentle },
          });
          await animate({
            y: idx * CARD_STACK_MARGIN,
            rotateZ: 0,
            zIndex: idx + BASE_Z_INDEX,
            immediate: (key: string) => key === "zIndex",
            config: { duration: DURATION * 0.1 },
          });
        },
        immediate: (key: string) => key === "zIndex",
        config: {
          duration: DURATION * 0.1,
        },
      };
    }
  );

  const resizeWrapper = () => {
    setWrapperSpring.stop();
    setWrapperSpring.start({
      from: {
        height: `${getWrapperHeight()}px`,
      },
      to: async (animate) => {
        await animate({
          height: `${getWrapperHeight() + CARD_STACK_MARGIN * 1.2}px`,
        });
        await animate({
          height: `${getWrapperHeight()}px`,
        });
      },
      config: {
        ...springConfig,
        duration: DURATION,
      },
    });
  };

  const handleOrder = (index: number) => {
    const oldOrder = [...order.current];
    const newOrder = [...order.current];
    newOrder.splice(index, 1);
    newOrder.push(order.current[index]);
    order.current = newOrder;
    return {
      oldOrder,
      newOrder,
      getOldOrderIndex: function (index: number) {
        return this.oldOrder.indexOf(index);
      },
      getNewOrderIndex: function (index: number) {
        return this.newOrder.indexOf(index);
      },
    };
  };

  const handleClick = (cardIndex: number) => {
    // click animation logic
    const index = order.current.indexOf(cardIndex);
    if (index < CARDS.length - 1) {
      const orderDetails = handleOrder(index);
      resizeWrapper();
      setBillCardSprings.stop();
      setBillCardSprings.start((itemIndex) => {
        const newIndex = orderDetails.getNewOrderIndex(itemIndex);
        const oldIndex = orderDetails.getOldOrderIndex(itemIndex);

        // clicked card
        if (oldIndex === index) {
          return {
            from: {
              y: oldIndex * CARD_STACK_MARGIN,
              rotateZ: 0,
              zIndex: oldIndex + BASE_Z_INDEX,
              config: { duration: DURATION * 0.1 },
            },
            to: async (animate: any) => {
              await animate({
                y:
                  oldIndex * CARD_STACK_MARGIN -
                  CARD_STACK_MARGIN *
                    (oldIndex === 0 ? 1 : POSITION_MULTIPLIER_CONFIG.active),
                rotateZ: 10,
                zIndex: oldIndex + BASE_Z_INDEX,
                immediate: (key: string) => key === "zIndex",
              });
              await animate({
                y: newIndex * CARD_STACK_MARGIN,
                rotateZ: 0,
                zIndex: 8 + BASE_Z_INDEX,
                config: springConfig,
                immediate: (key: string) => key === "zIndex",
              });
            },
            config: { duration: DURATION * 0.8 },
          };
        } else if (oldIndex < index) {
          return {
            from: {
              y: oldIndex * CARD_STACK_MARGIN,
              rotateZ: 0,
              zIndex: oldIndex + BASE_Z_INDEX,
            },
            to: async (animate: any) => {
              await animate({
                y:
                  oldIndex > 0
                    ? oldIndex * CARD_STACK_MARGIN + CARD_STACK_MARGIN * 0.3
                    : oldIndex * CARD_STACK_MARGIN + CARD_STACK_MARGIN * 0.1,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key: string) => key === "zIndex",
              });
              await animate({
                y: newIndex * CARD_STACK_MARGIN,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key: string) => key === "zIndex",
                config: springConfig,
              });
            },
            config: { duration: DURATION * 0.8 },
          };
        } else {
          let details = {
            from: {
              y: oldIndex * CARD_STACK_MARGIN,
              rotateZ: 0,
              zIndex: oldIndex + BASE_Z_INDEX,
            },
            to: async (animate: any) => {
              await animate({
                y:
                  oldIndex * CARD_STACK_MARGIN +
                  CARD_STACK_MARGIN * POSITION_MULTIPLIER_CONFIG.after.rest,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key: string) => key === "zIndex",
              });
              await animate({
                y: newIndex * CARD_STACK_MARGIN,
                rotateZ: 0,
                zIndex: newIndex + BASE_Z_INDEX,
                immediate: (key: string) => key === "zIndex",
                config: springConfig,
              });
            },
            config: {
              duration: DURATION * 0.8,
            },
          };

          // last card in old stack
          if (oldIndex === CARDS.length - 1) {
            details = {
              from: {
                ...details.from,
              },
              to: async (animate) => {
                await animate({
                  y:
                    oldIndex * CARD_STACK_MARGIN +
                    CARD_STACK_MARGIN *
                      POSITION_MULTIPLIER_CONFIG.after.extreme,
                  rotateZ: 0,
                  zIndex: oldIndex + BASE_Z_INDEX,
                  immediate: (key: string) => key === "zIndex",
                });
                await animate({
                  y: newIndex * CARD_STACK_MARGIN,
                  rotateZ: 0,
                  zIndex: newIndex + BASE_Z_INDEX,
                  immediate: (key: string) => key === "zIndex",
                  config: springConfig,
                });
              },
              config: { duration: DURATION * 0.8 },
            };
          }
          return { ...details };
        }
      });
    }
  };

  return (
    <div className={styles["cardDeck"]}>
      <div className={styles["phoneContainer"]}>
        <animated.div style={wrapperSpring} className={styles["wrapper"]}>
          {billCardSprings.map((styles, index) => (
            <animated.div
              style={{
                ...styles,
                position: "absolute",
                width: "100%",
              }}
              onClick={() => handleClick(index)}
              key={"card-" + index}
            >
              <Card card={CARDS[index]} />
            </animated.div>
          ))}
        </animated.div>
      </div>
    </div>
  );
}
