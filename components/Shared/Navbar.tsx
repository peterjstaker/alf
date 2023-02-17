/* eslint-disable @next/next/no-img-element */
import { NextComponentType } from "next";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { toast } from 'react-toastify';
import { MobileNavbar } from "./MobileNavbar";
// require('dotenv').config()

declare let window: any;

const contractAdress = "0x582b874af6a8d0ec283febe1988fb4a67c06e050";
const serverUrl = "https://cx2p2sxvgs0e.usemoralis.com:2053/server";
const appId = "rT1oOTExozPtVFgzxanBhoNBqlruDWChahGHI3FL";
const masterKey = "D2SURZgvVwljy1e4JqhdMWbZP2nzuEaN3CqUJ6cf";

const Navbar: NextComponentType = () => {
  const [width, setWidth] = useState(0);

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

  const showMobileNav = width <= 720;

  const router = useRouter();

  return (
    <header>
      <nav className={styles.navbar}>
        {!showMobileNav ? (
          <div className={styles.navbarContainer}>
            <div
              className={`${styles.navItem} ${
                router.pathname == "/" ? styles.activeNav : ""
              }`}
            >
              <Link href="/">Home</Link>
            </div>
            <div
              className={`${styles.navItem} ${
                router.pathname == "/map" ? styles.activeNav : ""
              }`}
            >
              <Link href="/map">The Map</Link>
            </div>
            <div
              className={`${styles.navItem} ${
                router.pathname == "/team" ? styles.activeNav : ""
              }`}
            >
              <Link href="/team">Team</Link>
            </div>

            <div className={`${styles.navItem} ${styles.navbarLogo}`}>
              <img src="/media/logo.webp" alt="logo" />
            </div>

            <div
              className={`${styles.navItem} ${
                router.pathname == "/lore" ? styles.activeNav : ""
              }`}
            >
              <Link href="/lore">The Lore</Link>
            </div>
            <div
              className={`${styles.navItem} ${
                router.pathname == "/faq" ? styles.activeNav : ""
              }`}
            >
              <Link href="/faq">FAQ</Link>
            </div>
            <div
              className={`${styles.navItem} ${
                router.pathname == "/gallery" ? styles.activeNav : ""
              }`}
            >
              <Link href="/gallery">Gallery</Link>
            </div>
          </div>
        ) : (
          <>
            <MobileNavbar />
            <div className={styles.navbarContainer}>
              <div className={`${styles.navItem} ${styles.navbarLogo}`}>
                <img src="/media/logo.webp" alt="logo" />
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
