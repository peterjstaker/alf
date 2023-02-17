/* eslint-disable @next/next/no-img-element */
import * as React from 'react'

import styles from './styles.module.css'

interface CardProps {
    src: string
}

export const Card = ({ src }: CardProps) => (
    <span className={styles.card}>
        <img className={styles.card__blur} src={src} alt="" />
        <img className={styles.card__img} src={src} alt="" />
    </span>
)