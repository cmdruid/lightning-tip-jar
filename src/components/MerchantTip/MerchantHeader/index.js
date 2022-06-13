import React from 'react'
import styles from './styles.module.css'


function MerchantHeader({title, desc}) {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{desc}</p>
        </div>
    )
}

export default MerchantHeader