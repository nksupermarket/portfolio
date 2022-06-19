import React from 'react';
import styles from '../styles/SectionHeader.module.scss';
import Slide from './Animations/Slide';
import { SpringRef } from 'react-spring';

interface SectionHeaderProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  number: number;
  animationRef?: SpringRef;
}

export default function SectionHeader({
  title,
  number,
  animationRef
}: SectionHeaderProps) {
  return (
    <header className={styles.main}>
      <Slide dir="right" animationRef={animationRef}>
        <div className={styles.title}>
          <h4>{title.firstRow}</h4>
          <h3>{title.secondRow.toUpperCase()}</h3>
        </div>
      </Slide>
      <Slide dir="left" animationRef={animationRef}>
        <h2>{`0${number}`}</h2>
      </Slide>
    </header>
  );
}
