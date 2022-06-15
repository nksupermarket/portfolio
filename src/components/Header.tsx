import React from 'react';
import styles from '../styles/Header.module.scss';

export default function Header() {
  return (
    <div className={styles.main}>
      <div className={styles.circle}>
        <div className={styles.text_block}>
          <p>Alex Liang</p>
          <div className="underline"></div>
        </div>
        <div className={styles.text_block}>
          <p>web developer</p>
          <div className="underline"></div>
        </div>
      </div>
    </div>
  );
}
