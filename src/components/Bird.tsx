import React from 'react';
import styles from '../styles/Bird.module.scss';

export default function Bird() {
  return (
    <div className={styles.ctn}>
      <div className={styles.rotate_wrapper}>
        <div className={styles.main}>
          <div className={styles.body} />
          <div className={styles.tail_feather} />
          <div className={styles.eye}>
            <div className={styles.eyeball} />
          </div>
          <div className={styles.beak} />
          <div className={styles.wing}>
            <div className={styles.wing_feathers} />
          </div>
        </div>
      </div>
    </div>
  );
}
