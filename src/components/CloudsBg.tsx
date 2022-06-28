import React from 'react';
import CloudSvg from './CloudSvg';
import styles from '../styles/CloudsBg.module.scss';

export default function CloudsBg() {
  const rootClasses = ['bg', styles.main];
  return (
    <div className={rootClasses.join(' ')}>
      {Array(8)
        .fill(null)
        .map((v, i) => (
          <CloudSvg key={i} className={styles.init} />
        ))}
      {Array(12)
        .fill(null)
        .map((v, i) => (
          <CloudSvg key={i} className={styles.off_page} />
        ))}
    </div>
  );
}
