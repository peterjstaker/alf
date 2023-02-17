/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "../../../styles/FlipCard.module.css";

export interface FlipCardProps {
    src: string;
    fullText: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({src, fullText}): JSX.Element => {
    const [flipped, setFlipped] = useState(false);
    const flip = () => setFlipped(!flipped);
    return (
        <div
            onClick={flip}
            className={`${styles["card-container"]} ${flipped ? styles["flipped"] : ""}`}
        >
            <div className={styles["front"]}>
                <div className={styles["image-container"]}>
                    <img
                        className={styles["card-image"]}
                        alt="image"
                        src={src}
                    ></img>
                <h1 className={styles.title}>➜</h1>
                </div>
            </div>
            <div className={styles["back"]}>
                <p>
                    {fullText}
                </p>
            </div>
        </div>
    );
};
