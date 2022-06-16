import React from 'react';
import styles from '../styles/Header.module.scss';

export default function Header() {
  return (
    <div className={styles.main}>
      <div className={styles.square}>
        <div className={`${styles.text_block} ${styles.top}`}>
          <div className={styles.ctn}>
            <h2>Alex Liang</h2>
            <div className={styles.underline}></div>
          </div>
        </div>
        <div className={`${styles.text_block} ${styles.bottom}`}>
          <div className={styles.ctn}>
            <h2>web developer</h2>
            <div className={styles.underline}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
