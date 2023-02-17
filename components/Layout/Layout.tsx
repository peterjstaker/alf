import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextComponentType } from "next";
import Navbar from "../Shared/Navbar";
import styles from "./styles.module.scss";

const Layout: React.FC<any> = (props: any) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Alfheim</title>
        <meta name="description" content=""/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {props.children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
