import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Homepage/Header'
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
} from "firebase/firestore";
import Layout from '../components/Layout/Layout'
import styles from '../styles/Marketplace.module.css'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { db } from '../context/firestore';

const ordersRef = collection(db, "offers");
const Marketplace: NextPage = () => {
    const [offers, setOffers] = useState<any[]>([]);
    const types = [
        'WL',
        'NFT',
        'Other'
    ]
    const [chosenTypes, setChosenTypes] = useState<any[]>(types);
    const [lastKey, setLastKey] = useState<any>();
    useEffect(() => {
        getTotalOrders()
     }, [])
    const getTotalOrders = async () => {
        const q = query(ordersRef,
            orderBy("date", "desc"),
           limit(25)
        );
        const querySnapshot = await getDocs(q)
        const queryList = await querySnapshot.docs.map(doc => {
           return {...doc.data(), id: doc.id}
        });
        setLastKey(querySnapshot.docs[querySnapshot.docs.length -1])
        console.log(queryList)
        setOffers(queryList)
    }
    const loadMore = async() =>{
        const q = query(ordersRef,
            orderBy("date", "desc"),
            startAfter(lastKey),
            limit(25)
        );
        const querySnapshot = await getDocs(q)
        const queryList = await querySnapshot.docs.map(doc => {
           return {...doc.data(), id: doc.id}
        })
        setLastKey(querySnapshot.docs[querySnapshot.docs.length -1])
    }
    const filter = (type: string) => {
        let newTypes = [...chosenTypes]
        if(chosenTypes.includes(type)) {
            const index = newTypes.indexOf(type)
            delete newTypes[index];
            setChosenTypes(newTypes)
        } else {
            newTypes = [...chosenTypes, type]
            setChosenTypes(newTypes)
        }
    }
  return (
    <Layout>
        <div className={styles.container}>
        <h1>Marketplace</h1>

        <div className={styles.marketplaceGrid}>
            <div className={styles.categories}>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    Categories
                </p>
                {types.map((value, index) => { return (
                <div key={index} onClick={() => filter(value)} className={styles.categoriyBox}>
                    <div className={styles.boxCheck}>
                        {chosenTypes.includes(value) &&  <p className="text-md -mt-1">✓</p>}
                    </div>
                    <p className={styles.boxText}>{value} (2)</p>
                </div>
                )})}
            </div>
            <button className={styles.btnFilter}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                <p>Filter</p>
            </button>
            <div className={styles.offers}>
                <div className={styles.offersContainer}>
                {offers.map((value, index) => { return (
                chosenTypes.includes(value.type) && <motion.div key={index} className={styles.cardItem} initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        duration: 2,
                         delay: (index + 2) * 0.1
                    }}>
                    <div className={styles.cardWrapper}>
                        <div className={styles.cardImg}>
                            <div className={styles.imgWrapper}><img alt="#" src={value.image}/></div>
                        </div>

                        <div className={styles.cardContent}>
                            <h3>{value.name} <span>( {value.type} )</span></h3>
                            <p>{value.quantity} available</p>
                            <div className={styles.cardInfo}>
                            <h4 className={styles.cardTitle}>{value.price} <span>$TOKEN</span></h4>
                            <button className={styles.cardBtn}>Claim</button>
                            </div>
                            <div className={styles.cardInfo}>
                            </div>
                        </div>
                    </div>
                </motion.div>
                )})}
                </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Marketplace