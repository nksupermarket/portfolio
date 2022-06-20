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
  visible?: boolean;
  setHeaderAnimeFinished?: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function SectionHeader({
  title,
  number,
  animationRef,
  visible,
  setHeaderAnimeFinished
}: SectionHeaderProps) {
  return (
    <header className={styles.main}>
      <Slide
        dir="right"
        animationRef={animationRef}
        condition={visible}
        onRest={() =>
          setHeaderAnimeFinished &&
          setHeaderAnimeFinished((prev) => {
            const copy = [...prev];
            copy[0] = true;
            return copy;
          })
        }
      >
        <div className={styles.title}>
          <h4>{title.firstRow}</h4>
          <h3>{title.secondRow.toUpperCase()}</h3>
        </div>
      </Slide>
      <Slide
        dir="left"
        animationRef={animationRef}
        condition={visible}
        onRest={() =>
          setHeaderAnimeFinished &&
          setHeaderAnimeFinished((prev) => {
            const copy = [...prev];
            copy[1] = true;
            return copy;
          })
        }
        config={{
          mass: 60,
          tension: 350,
          friction: 63,
          clamp: false,
          precision: 0.01,
          velocity: 0,
          damping: 0.5,
          frequency: 0.5,
          bounce: 0.6
        }}
      >
        <h2>{`0${number}`}</h2>
      </Slide>
    </header>
  );
}
