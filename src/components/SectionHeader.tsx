import React from 'react';
import styles from '../styles/SectionHeader.module.scss';

interface SectionHeaderProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  number: number;
}

export default function SectionHeader({
  title,
  number
}: SectionHeaderProps) {
  return (
    <header className={styles.main}>
      <div className={styles.title}>
        <h4>{title.firstRow}</h4>
        <h3>{title.secondRow.toUpperCase()}</h3>
      </div>

      <h2>{`0${number}`}</h2>
    </header>
  );
}
