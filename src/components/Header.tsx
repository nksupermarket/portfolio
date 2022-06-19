import React from 'react';
import styles from '../styles/Header.module.scss';
import { useChain, useSpringRef } from 'react-spring';

import Slide from './Animations/Slide';
import Scale from './Animations/Scale';

export default function Header() {
  const circleAnimeRef = useSpringRef();

  const textAnimeRef = useSpringRef();
  const underlineAnimeRef = useSpringRef();

  useChain([circleAnimeRef, textAnimeRef, underlineAnimeRef]);

  return (
    <div className={styles.main}>
      <Scale className={styles.circle} ref={circleAnimeRef}></Scale>
      <Slide ref={textAnimeRef} dir="left">
        <div className={`${styles.text_block} ${styles.top}`}>
          <div className={styles.ctn}>
            <h2>Alex Liang</h2>
            <Slide
              dir="left"
              ref={underlineAnimeRef}
              className={styles.underline}
            ></Slide>
          </div>
        </div>
      </Slide>

      <Slide ref={textAnimeRef} dir="right">
        <div className={`${styles.text_block} ${styles.bottom}`}>
          <div className={styles.ctn}>
            <h2>web developer</h2>
            <Slide
              dir="right"
              ref={underlineAnimeRef}
              className={styles.underline}
            ></Slide>
          </div>
        </div>
      </Slide>
    </div>
  );
}
