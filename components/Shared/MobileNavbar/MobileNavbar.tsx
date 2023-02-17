import React from "react";
import { slide as Menu } from "react-burger-menu";
import styles from "../../../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const burgerStyles = {
    bmBurgerButton: {
        position: "fixed",
        width: "24px",
        height: "24px",
        left: "28px",
        top: "20px",
    },
    bmBurgerBars: {
        background: "#fff",
    },
    bmBurgerBarsHover: {
        background: "#a90000",
    },
    bmCrossButton: {
        height: "48px",
        width: "48px",
    },
    bmCross: {
        background: "#bdc3c7",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
    },
    bmMenu: {
        background: "#373a4790",
        padding: "2.5em 1.5em 0",
        fontSize: "1.15em",
    },
    bmMorphShape: {
        fill: "#fff",
    },
    bmItemList: {
        color: "#fff",
        padding: "3em",
    },
    bmItem: {
        height: "36px",
        display: "block",
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.8)",
    },
};

export const MobileNavbar = () => {
    const router = useRouter();
    return (
        <div className={styles.mobile}>
            <Menu styles={burgerStyles} width={"100%"}>
                <div
                    className={`${styles.navItemMobile} ${router.pathname == "/" ? styles.activeNavMobile : ""
                        }`}
                >
                    <Link href="/">Home</Link>
                </div>
                <div
                    className={`${styles.navItemMobile} ${router.pathname == "/gallery" ? styles.activeNavMobile : ""
                        }`}
                >
                    <Link href="/gallery">Gallery</Link>
                </div>
                <div
                    className={`${styles.navItemMobile} ${router.pathname == "/team" ? styles.activeNavMobile : ""
                        }`}
                >
                    <Link href="/team">Team</Link>
                </div>
                <div
                    className={`${styles.navItemMobile} ${router.pathname == "/lore" ? styles.activeNavMobile : ""
                        }`}
                >
                    <Link href="/lore">The Lore</Link>
                </div>
                <div
                    className={`${styles.navItemMobile} ${router.pathname == "/faq" ? styles.activeNavMobile : ""
                        }`}
                >
                    <Link href="/faq">FAQ</Link>
                </div>
                <div
                    className={`${styles.navItemMobile} ${router.pathname == "/map" ? styles.activeNavMobile : ""
                        }`}
                >
                    <Link href="/map">Map</Link>
                </div>
            </Menu>
        </div>
    );
};
