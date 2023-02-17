import type { NextPage } from "next";
import Header from "../components/Homepage/Header";
import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { KiritoLoading } from "../components/Loading";
import { useAppContext } from "../context/AppContext";

const Home: NextPage = () => {
  const { initialLoad, loaded } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [wait, setWait] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, []);

  useEffect(() => {
    const onPageLoad = () => {
      setIsDone(false);
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
    if (!(isLoading && !isDone && wait)) {
      loaded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isDone, wait]);

  return initialLoad && isLoading && !isDone && wait ? (
    <KiritoLoading />
  ) : (
    <Layout>
      <Header />
    </Layout>
  );
};

export default Home;
