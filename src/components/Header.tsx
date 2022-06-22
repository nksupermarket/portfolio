import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [y, setY] = useState(window.scrollY);

  const circleAnimeRef = useSpringRef();

  const textAnimeRef = useSpringRef();
  const underlineAnimeRef = useSpringRef();

  useChain([circleAnimeRef, textAnimeRef, underlineAnimeRef], [0, 0.2]);

  const divsToSlideLeft = useRef<HTMLDivElement[]>([]);
  const divsToSlideRight = useRef<HTMLDivElement[]>([]);

  const handleScroll = useCallback(() => {
    if (!divsToSlideLeft.current) return;

    function transformEl(dir: 'left' | 'right') {
      return (el: HTMLElement) => {
        const style = window.getComputedStyle(el);

        const matrix = new WebKitCSSMatrix(style.transform);
        const prevX = matrix.m41;

        el.style.transform =
          dir === 'left'
            ? `translateX(${prevX + y - scrollY}px)`
            : `translateX(${scrollY - y + prevX}px)`;
      };
    }

    divsToSlideLeft.current.forEach(transformEl('left'));
    divsToSlideRight.current.forEach(transformEl('right'));

    // setScrollOffset(
    //   document.documentElement.scrollTop || document.body.scrollTop
    // );
    setY(window.scrollY);
  }, [y]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // useEffect(() => {
  //   if (!finishedAnimation) return;

  //   textAnimeRef.set({
  //     transform: 'translateX(100%)'
  //   });
  //   textAnimeRef.start();

  //   console.log('finished');
  // }, [finishedAnimation]);

  return (
    <div className={styles.main}>
      <Scale
        className={styles.circle}
        animationRef={circleAnimeRef}
      ></Scale>

      <div className={`${styles.text_block} ${styles.top}`}>
        <div className={styles.ctn}>
          <Slide
            elRef={(el) => {
              if (!el || divsToSlideRight.current.includes(el)) return;

              divsToSlideRight.current.push(el);
            }}
            animationRef={textAnimeRef}
            dir="left"
            config={slideConfig}
            tag="h2"
          >
            Alex Liang
          </Slide>
          <Slide
            elRef={(el) => {
              if (!el || divsToSlideLeft.current.includes(el)) return;

              divsToSlideLeft.current.push(el);
            }}
            dir="left"
            animationRef={underlineAnimeRef}
            className={styles.underline}
            config={{
              mass: 50,
              tension: 2000,
              friction: 300
            }}
          />
        </div>
      </div>

      <div className={`${styles.text_block} ${styles.bottom}`}>
        <div className={styles.ctn}>
          <Slide
            elRef={(el) => {
              if (!el || divsToSlideLeft.current.includes(el)) return;

              divsToSlideLeft.current.push(el);
            }}
            animationRef={textAnimeRef}
            dir="right"
            config={slideConfig}
            tag="h2"
          >
            web developer
          </Slide>
          <Slide
            elRef={(el) => {
              if (!el || divsToSlideRight.current.includes(el)) return;

              divsToSlideRight.current.push(el);
            }}
            dir="right"
            animationRef={underlineAnimeRef}
            className={styles.underline}
            config={{
              mass: 50,
              tension: 3000,
              friction: 400
            }}
          />
        </div>
      </div>
    </div>
  );
}
