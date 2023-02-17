import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Minter.module.scss";
import { BigNumber, ethers, utils } from "ethers";
import { toast } from "react-toastify";
import { NextPage } from "next";
import { MerkleTree } from "merkletreejs";
import { whitelistAddresses, waitListAddresses } from "./wallet-checker";
import keccak256 from "keccak256";
import { Card, Dock, DockCard } from "../components/Shared/Dock";

declare let window: any;

const leafNodesWhitelist = whitelistAddresses.map((addr: any) =>
  keccak256(addr)
);

const leafNodesWaitlist = waitListAddresses.map((addr: any) => keccak256(addr));

const Claim: NextPage = () => {
  const whitelistStart = 1676574000000;
  const waitlistStart = 1676583000000;
  const merkleTreeWhitelist = new MerkleTree(leafNodesWhitelist, keccak256, {
    sortPairs: true,
  });
  const merkleTreeWaitlist = new MerkleTree(leafNodesWaitlist, keccak256, {
    sortPairs: true,
  });
  const rootHashWhitelist = merkleTreeWhitelist.getRoot().toString("hex");
  const rootHashWaitlist = merkleTreeWaitlist.getRoot().toString("hex");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [balance, setBalance] = useState(0);
  const [isHolder, setIsHolder] = useState(false);
  const [claimAmount, setClaimAmount] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [canClaim, setCanClaim] = useState(false);

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
      checkTokens();
    }
  }, [connected]);

  const checkTokens = async () => {
    //todo check tokens and set claimable amount
    setBalance(120);
    setIsHolder(true);
    setClaimAmount(30);
    setCanClaim(true);
    //   toast("This wallet isn't holding and elves.", { type: "error" });
  };

  const claim = async () => {
    if (!connected || !address || !isHolder) {
      return;
    }

    //todo - contract address and ABi
    // const options = {
    //     contractAddress: ContractAddress,
    //     functionName: "whitelistMint",
    //     abi: Abi,
    //     msgValue: ethers.utils
    //       .parseEther((isWhitelistLive ? 0.077 : 0.088).toString())
    //       .toString(),
    //     params: {
    //       _mintAmount: 1,
    //       _merkleProof: proof,
    //     },
    //   };

    //const transaction = await Moralis.executeFunction(options);
    //};

    //todo - initialize balance and claimable amount on page load
    setClaimed(true);
    setBalance(balance + claimAmount);
    setClaimed(true);
    toast(`Successfully claimed ${claimAmount} $Lembas.`, { type: "success" });
  };

  const truncateAdress = (address: string) => {
    return (
      address?.substring(0, 5) + "..." + address?.substring(address?.length - 5)
    );
  };
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.mintContainer}>
          <div className={styles.logoImg}>
            <img src="/media/Alfheim Logo.gif" width="200" />
          </div>
          {connected && isHolder && (
            <>
              <p className={styles.wallet}>Balance: {balance} $Lembas</p>
            </>
          )}
          <div className={`${styles.mintBox}`}>
            <div className={styles.mintBoxContainer}>
              {connected && (
                <p className={styles.wallet}>{truncateAdress(address)}</p>
              )}
              {!connected && (
                <button onClick={connectAccount} className={styles.mintBtn}>
                  {!loading && "Connect Wallet"}
                  {loading && <div className={styles.loader}></div>}
                </button>
              )}
              {connected && isHolder && canClaim && !claimed && (
                <button onClick={claim} className={styles.mintBtn}>
                  {!loading && `Claim ${claimAmount} $Lembas`}
                  {loading && <div className={styles.loader}></div>}
                </button>
              )}
              {claimed && <p className={styles.wallet}>Success!</p>}
            </div>
          </div>
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
                <Card src="https://www.isekaimeta.com/assets/white-opensea.svg" />
              </DockCard>
            </Dock>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Claim;
