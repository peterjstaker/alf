import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Application.module.css";
import { initializeApp } from "firebase/app";
import { motion } from "framer-motion";

import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { ethers } from "ethers";
import { db } from "../context/firestore";
import { truncateAdress } from "../context/utils";
import { toast } from "react-toastify";

declare let window: any;
const applicationsRef = collection(db, "applications");

const Applcation: NextPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState()
  const [discord, setDiscord] = useState('')
  const [twitter, setTwitter] = useState('')
  const [qst1, setQst1] = useState('')
  const [qst2, setQst2] = useState('')
  const [qst3, setQst3] = useState('')
  const [qst4, setQst4] = useState('')
  const [qst5, setQst5] = useState('')

  const connectAccount = async (evt: any) => {
    evt.preventDefault();
    if (window.ethereum) {
      const newAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const q = query(applicationsRef,
        where('wallet', '==', newAccounts[0]),
        limit(1)
     );
     const querySnapshot = await getDocs(q)
     const queryList = await querySnapshot.docs.map(doc => {
        return {...doc.data(), id: doc.id}
     });
     if (queryList.length == 0) {
      setAccount(newAccounts[0])
     } else {
      toast(
        "You already submitted an application with this wallet!",
        { type: "error" }
      );
     }
    } else {
      toast(
        "You don't have metamask installed, please install metamask to continue.",
        { type: "error" }
      );
    }
  };
  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    if (window.ethereum && !loading) {
      setLoading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const data = {
          wallet: account,
          discord,
          twitter,
          qst1,
          qst2,
          qst3,
          qst4,
          qst5,
          state: 'Pending',
          date: new Date()
        };
        const res = await addDoc(collection(db, "applications"), data);
        setLoading(false)
        setStep(3);
      } catch (err: any) {
        toast(
          "An error happened, please try again!",
          { type: "error" }
        );
      }
    }
  };

  const nextStep = async (evt: any) => {
    evt.preventDefault();
    setStep(2)
  }
  const firstCheck = () => {
    if(account && twitter != '' && discord != '') {
      return false
    } else {
      return true
    }
  }
  const secondCheck = () => {
    if(qst1 !== '' && qst2 != '' && qst3 != '' && qst4 != '' && qst5 != '') {
      return false
    } else {
      return true
    }
  }
  return (
    <Layout>
      <div className={styles.application}>
        <h1>Application</h1>

        <motion.form className={styles.form} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2}} onSubmit={handleSubmit} >
          <div className={styles.steps}>
              <span className={step == 1 ? styles.activeStep : ''}>Account</span>
              <div className={styles.line}></div>
              <span className={step == 2 ? styles.activeStep : ''}>About You</span>
              <div className={styles.line}></div>
              <span className={step == 3 ? styles.activeStep : ''}>Confirmation</span>
          </div>
          {step === 1 && (
          <>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.1}} >
              <label>Wallet*</label>
              <button onClick={connectAccount}>
                {account ? truncateAdress(account) : 'Connect Wallet'}
              </button>
          </motion.div>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.2}} >
              <label>Discord*</label>
              <input value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder="Alfheim#5432" />
          </motion.div>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.3}} >
              <label>Twitter*</label>
              <input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="@Alfheim" />
          </motion.div>
          <motion.div className={styles.navBtns} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.4}}>
              <button className={styles.nextBtn} onClick={nextStep} disabled={firstCheck()}>Next</button>
          </motion.div>
          </>
          )}

          {step === 2 && (
          <>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.1}}>
            <label>Short Bio*</label>
            <textarea rows={4} value={qst1} onChange={(e) => setQst1(e.target.value)}/>
          </motion.div>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.2}}>
            <label>What would you bring to Alfheim?*</label>
            <textarea rows={4} value={qst2} onChange={(e) => setQst2(e.target.value)}/>
          </motion.div>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.3}}>
            <label>Which web3 communities are you a part of?*</label>
            <textarea rows={4} value={qst3} onChange={(e) => setQst3(e.target.value)}/>
          </motion.div>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.4}}>
            <label>What progress have you made in web3?*</label>
            <textarea rows={4} value={qst4} onChange={(e) => setQst4(e.target.value)}/>
          </motion.div>
          <motion.div className={styles.formSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.5}}>
            <label>What do you hope to get out of Alfheim?*</label>
            <textarea rows={4} value={qst5} onChange={(e) => setQst5(e.target.value)}/>
          </motion.div>
          <motion.div className={styles.navBtns} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: 2, delay: 0.8}}>
            <button onClick={() => setStep(1)} className={styles.prevBtn}>Previous</button>
            <button type='submit' className={styles.nextBtn} disabled={secondCheck()}>Next</button>
          </motion.div>
          </>
          )}
          {step === 3 && (
              <motion.div className={styles.success}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 2,}}
            >
              <div className={styles.upperSide}>
                <svg className={styles.checkmark} viewBox="0 0 1024 1024" version="1.1" xmlns="https://www.w3.org/2000/svg"><path d="M506.3 950.6C264.4 950.6 67.6 753.8 67.6 512S264.4 73.4 506.3 73.4c144.5 0 279.7 71.2 361.6 190.4 8.1 11.7 5.1 27.8-6.6 35.9-11.7 8.1-27.8 5.1-35.9-6.6C753 187.8 633.7 125 506.3 125c-213.4 0-387 173.6-387 387s173.6 387 387 387 387-173.6 387-387c0-35.9-4.9-71.4-14.6-105.6-3.9-13.7 4.1-28 17.8-31.8 13.7-3.9 28 4.1 31.8 17.8 11 38.7 16.5 79 16.5 119.6 0.1 241.8-196.7 438.6-438.5 438.6z" /><path d="M462.7 741.1c-6.9 0-13.7-2.7-18.8-8.1L266.4 545c-9.8-10.4-9.3-26.7 1-36.5s26.7-9.3 36.5 1L464 679.1l449.1-410.3c10.5-9.6 26.8-8.9 36.5 1.6 9.6 10.5 8.9 26.8-1.6 36.5L480.1 734.3c-5 4.6-11.2 6.8-17.4 6.8z" /></svg>
                <h3 className={styles.status}>Completed</h3>
              </div>
              <div className={styles.lowerSide}>
                <p className={styles.message}>Congratulations, your application has been submitted.</p>
                <p className={styles.message}>We will now carefully review your application and will get back to you as soon as we have reviewed it. The results will be sumbitted in <a href="https://twitter.com/AlfheimList" target="_blank" rel="noreferrer">@AlfheimList</a></p>
              </div>
            </motion.div>
          )}
        </motion.form>
      </div>
    </Layout>
  );
};

export default Applcation;
