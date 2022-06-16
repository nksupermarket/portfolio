import React from 'react';
import styles from '../styles/SectionHeader.module.scss';

interface SectionHeaderProps {
  title: string;
  number: number;
}

export default function SectionHeader({
  title,
  number
}: SectionHeaderProps) {
  return (
    <header className={styles.main}>
      <div className={styles.title}>
        {title.split(' ').map((word, i) => {
          if (i === 0) return <h4 key={i}>{word}</h4>;

          return <h3 key={i}>{word.toUpperCase()}</h3>;
        })}
      </div>

      <h2>{`0${number}`}</h2>
    </header>
  );
}
