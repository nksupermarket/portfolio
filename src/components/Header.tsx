import React from 'react';
import styles from '../styles/Header.module.scss';
import { useChain, useSpringRef } from 'react-spring';

import Slide from './Animations/Slide';
import Scale from './Animations/Scale';

const slideConfig = {
  mass: 30,
  tension: 300,
  friction: 63,
  clamp: false,
  precision: 0.01,
  velocity: 0,
  damping: 0.5,
  frequency: 0.7,
  bounce: 0.45
};

export default function Header() {
  const circleAnimeRef = useSpringRef();

  const textAnimeRef = useSpringRef();
  const underlineAnimeRef = useSpringRef();

  useChain([circleAnimeRef, textAnimeRef, underlineAnimeRef], [0, 0.2]);

  return (
    <div className={styles.main}>
      <Scale
        className={styles.circle}
        animationRef={circleAnimeRef}
      ></Scale>
      <Slide animationRef={textAnimeRef} dir="left" config={slideConfig}>
        <div className={`${styles.text_block} ${styles.top}`}>
          <div className={styles.ctn}>
            <h2>Alex Liang</h2>
            <Slide
              dir="left"
              animationRef={underlineAnimeRef}
              className={styles.underline}
              config={{
                mass: 50,
                tension: 2000,
                friction: 300
              }}
            ></Slide>
          </div>
        </div>
      </Slide>

      <Slide animationRef={textAnimeRef} dir="right" config={slideConfig}>
        <div className={`${styles.text_block} ${styles.bottom}`}>
          <div className={styles.ctn}>
            <h2>web developer</h2>
            <Slide
              dir="right"
              animationRef={underlineAnimeRef}
              className={styles.underline}
              config={{
                mass: 50,
                tension: 3000,
                friction: 400
              }}
            ></Slide>
          </div>
        </div>
      </Slide>
    </div>
  );
}
