import React from 'react';
import styles from '../styles/Section.module.scss';

interface SectionProps {
  title: string;
  number: number;
}

export default function Section({ title, number }: SectionProps) {
  return (
    <header className={styles.main}>
      <div className={styles.title}>
        {title.split(' ').map((word, i) => {
          if (i === 0) return <h5 key={i}>{word}</h5>;

          return <h3 key={i}>{word.toUpperCase()}</h3>;
        })}
      </div>

      <h2>{`0${number}`}</h2>
    </header>
  );
}
