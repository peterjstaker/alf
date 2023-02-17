import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Minter.module.scss";
import { BigNumber, ethers, utils } from "ethers";
import { toast } from "react-toastify";
import { NextPage } from "next";
import { MerkleTree } from "merkletreejs";
import { whitelistAddresses, waitListAddresses } from "./wallet-checker";
import { Countdown } from "../components/Shared/Countdown";
import keccak256 from "keccak256";
import { Card, Dock, DockCard } from "../components/Shared/Dock";
import { RingLoader, SkewLoader } from "react-spinners";
const Fade = require("react-reveal/Fade");
const abi = require("../contract-abi.json");

declare let window: any;

const leafNodesWhitelist = whitelistAddresses.map((addr: any) =>
  keccak256(addr)
);

const leafNodesWaitlist = waitListAddresses.map((addr: any) => keccak256(addr));

const Mint: NextPage = () => {
  const whitelistStart = 1976574000000;
  const waitlistStart = 1976583000000;
//   const whitelistStart = 1676476803271;
  const merkleTreeWhitelist = new MerkleTree(leafNodesWhitelist, keccak256, {
    sortPairs: true,
  });
  const merkleTreeWaitlist = new MerkleTree(leafNodesWaitlist, keccak256, {
    sortPairs: true,
  });
  const rootHashWhitelist = merkleTreeWhitelist.getRoot().toString("hex");
//   console.log(rootHashWhitelist);
  const rootHashWaitlist = merkleTreeWaitlist.getRoot().toString("hex");
//   console.log("ai", rootHashWaitlist);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [whitelisted, setWhitelisted] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);
  const [isWhitelistLive, setIsWhitelistLive] = useState(false);
  const [isWaitlistLive, setIsWaitlistLive] = useState(false);
  const [minted, setMinted] = useState(false);
  const [proof, setProof] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [txError, setTxError] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    const now = new Date().getTime();
    if (now >= whitelistStart && now < waitlistStart) {
      setIsWhitelistLive(true);
    } else if (now >= waitlistStart) {
      setIsWaitlistLive(true);
    } else {
        setShowTimer(true);
    }
  }, []);

  const connectAccount = async () => {
    if (window.ethereum) {
      const newAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(newAccounts[0]);
      setConnected(true);
    } else {
      toast(
        "You don't have metamask installed, please install metamask to continue.",
        { type: "error" }
      );
    }
  };

  useEffect(() => {
    if (connected) {
      check();
      checkTotalSupply();
    }
  }, [connected]);

  const check = async () => {
    await connectAccount();
    const newAccounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const claimingAddress = keccak256(newAccounts[0]);
    const hexProofWhitelist = await merkleTreeWhitelist.getHexProof(
      claimingAddress
    );
    const verifyWhitelist = merkleTreeWhitelist.verify(
      hexProofWhitelist,
      claimingAddress,
      rootHashWhitelist
    );
    const hexProofWaitlist = await merkleTreeWaitlist.getHexProof(
      claimingAddress
    );
    const verifyWaitlist = merkleTreeWaitlist.verify(
      hexProofWaitlist,
      claimingAddress,
      rootHashWaitlist
    );

    if (verifyWhitelist) {
      setWhitelisted(true);
      setProof(hexProofWhitelist);
    } else if (verifyWaitlist) {
      setWaitlisted(true);
      setProof(hexProofWaitlist);
    } else {
        toast("This wallet is ineligible for mint", { type: "error" });
    }
  };

  const contractAddress = "0x6ce7103F365122815Ce8c9c0851573a0DfAf1b44";
  const checkTotalSupply = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        const bigSupply = await nftContract.totalSupply();
        setCount(bigSupply.toNumber());
      }
    } catch (error) {
      console.log("Error reading smart contract", error);
      const err = error as Error;
      setTxError(err.message);
    }
  };
  const mint = async () => {
    if (!connected || !address || !proof) {
      return;
    }
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        let nftTx;
        if (isWhitelistLive && whitelisted) {
          nftTx = await nftContract.presaleMint("1", proof, {
            value: ethers.utils.parseEther("0.077"),
            gasLimit: 200000,
          });
          setLoading(true);
        }

        if (isWaitlistLive && waitlisted) {
          nftTx = await nftContract.waitlistMint("1", proof, {
            value: ethers.utils.parseEther("0.088"),
            gasLimit: 200000,
          });
          setLoading(true);
        }

        let tx = await nftTx.wait();
        let event = tx.events[0];
        let value = event.args[2];

        setCount(count + 1);
        setMinted(true);
        setLoading(false);
        toast(
          `Minted successfully! See transaction: https://etherscan.io/tx/${nftTx.hash}`,
          { type: "success" }
        );
      }
    } catch (error) {
      const err = error as Error;
      toast("Oops... transaction failed. Please try again.", { type: "error" });
      setTxError(err.message);
      console.error(err.message);
      if (loading) {
        setLoading(false);
      }
    }
  };

  const publicMint = async () => {
    if (!connected || !address) {
      return;
    }
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        setLoading(true);
        const nftTx = await nftContract.mint("1", {
          value: ethers.utils.parseEther("0.077"),
          gasLimit: 200000,
        });
        let tx = await nftTx.wait();
        let event = tx.events[0];
        let value = event.args[2];

        setCount(count + 1);
        setMinted(true);
        toast(
          `Minted successfully! See transaction: https://etherscan.io/tx/${nftTx.hash}`,
          { type: "success" }
        );
        setLoading(false);
      }
    } catch (error) {
      const err = error as Error;
      toast("Oops... transaction failed. Please try again.", { type: "error" });
      setTxError(err.message);
      console.error(err.message);
      setLoading(false);
    }
  };

  const truncateAdress = (address: string) => {
    return (
      address?.substring(0, 5) + "..." + address?.substring(address?.length - 5)
    );
  };

  const showConnect = isWhitelistLive || isWaitlistLive;

  return (
    <Layout>
      <div className={styles.wrapper}>
        <Fade bottom opposite when={show}>
          <div className={styles.mintContainer}>
            <div className={styles.logoImg}>
              <img src="/media/Alfheim Logo.gif" width="200" />
            </div>
            {connected && isWaitlistLive && waitlisted && !whitelisted && (
              <>
                <p className={styles.wallet}>Minted: {count}/1000</p>
                <p className={styles.wallet}>Waitlist Mint: 0.088 ETH</p>
              </>
            )}
            <div className={`${styles.mintBox}`}>
              <div className={styles.mintBoxContainer}>
                {connected && (
                  <p className={styles.wallet}>{truncateAdress(address)}</p>
                )}
                {!isWhitelistLive && !isWaitlistLive && showTimer && (
                  <Countdown />
                )}
                {showConnect && !connected && (
                  <button onClick={connectAccount} className={styles.mintBtn}>
                    {!loading && "Connect Wallet to Mint"}
                    {loading && <div className={styles.loader}></div>}
                  </button>
                )}
                {connected && !minted && isWhitelistLive && whitelisted && (
                  <button onClick={mint} className={styles.mintBtn}>
                    {!loading && "MINT"}
                    {loading && (
                      <div className={styles.loader}>
                        <div className={styles.skew}>
                          <SkewLoader color="#ff8ae0" />
                        </div>
                        <div className={styles.ring}>
                          <RingLoader color="#00ffd5" />
                        </div>
                      </div>
                    )}
                  </button>
                )}
                {/* {connected &&
                  !minted && (
                    <button onClick={publicMint} className={styles.mintBtn}>
                      {!loading && "MINT"}
                      {loading && (
                        <div className={styles.loader}>
                          <div className={styles.skew}>
                            <SkewLoader color="#ff8ae0" />
                          </div>
                          <div className={styles.ring}>
                            <RingLoader color="#00ffd5" />
                          </div>
                        </div>
                      )}
                    </button>
                  )} */}
                {connected &&
                  !minted &&
                  isWaitlistLive &&
                  waitlisted &&
                  !whitelisted && (
                    <button
                      onClick={loading ? undefined : mint}
                      className={styles.mintBtn}
                    >
                      {!loading && "MINT"}
                      {loading && (
                        <div className={styles.loader}>
                          <div className={styles.ring}>
                            <RingLoader color="rgba(221, 255, 248, 1)" />
                          </div>
                          <div className={styles.skew}>
                            <SkewLoader color="rgba(255, 187, 243, 1)" />
                          </div>
                        </div>
                      )}
                    </button>
                  )}
                {minted && (
                  <p className={styles.wallet}>Minted successfully.</p>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <Fade>
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
              href="https://etherscan.io/address/0x6ce7103f365122815ce8c9c0851573a0dfaf1b44"
              target="_blank"
              rel="noreferrer"
            >
              <Card src="/media/etherscan-logo-light-circle.svg" />
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
      </Fade>
      <div className={styles.dock}></div>
    </Layout>
  );
};

export default Mint;
