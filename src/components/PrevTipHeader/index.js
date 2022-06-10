import React from 'react'
import styles from './styles.module.css'


function PrevTipsHeader({ title, desc}) {
    return (
        <div className={styles.divtext}>
            <h1 className={styles.tipeh1}>{title}</h1>
            <p>{desc}</p>
        </div>
    )
}

export default PrevTipsHeader