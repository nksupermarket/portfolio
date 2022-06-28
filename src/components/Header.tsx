import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../styles/Header.module.scss';
import { useChain, useSpringRef } from 'react-spring';

import Slide from './Animations/Slide';
import Scale from './Animations/Scale';
import CloudsBg from './CloudsBg';
import StarsBg from './StarsBg';
import Bird from './Bird';

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

interface HeaderProps {
  theme: 'light' | 'dark';
}

export default function Header({ theme }: HeaderProps) {
  const [y, setY] = useState(window.scrollY);

  const circleAnimeRef = useSpringRef();

  const textAnimeRef = useSpringRef();
  const underlineAnimeRef = useSpringRef();

  useChain([circleAnimeRef, textAnimeRef, underlineAnimeRef], [0, 0.2]);

  const divToSlideLeft = useRef<HTMLDivElement>(null);
  const divToSlideRight = useRef<HTMLDivElement>(null);
  const divToScale = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (
      !divToSlideLeft.current ||
      !divToSlideRight.current ||
      !divToScale.current
    )
      return;

    function transformEl(translateX?: 'left' | 'right', scale?: boolean) {
      return (el: HTMLElement) => {
        const style = window.getComputedStyle(el);

        if (translateX) {
          const matrix = new WebKitCSSMatrix(style.transform);
          const prevX = matrix.m41;

          let transformVal = 0;
          if (window.scrollY) {
            // want translateX value to be 0 at top of the page
            if (translateX === 'left') {
              const newOffset = prevX + y - window.scrollY;
              if (newOffset < 0) transformVal = newOffset;
            } else if (translateX === 'right') {
              const newOffset = window.scrollY - y + prevX;
              if (newOffset > 0) transformVal = newOffset;
            }
          }
          el.style.transform = `translateX(${transformVal}px)`;
        } else if (scale) {
          const scaleX = el.getBoundingClientRect().width / el.offsetWidth;
          let transformVal = 1;

          const newOffset = scaleX - (window.scrollY - y) / 300;

          if (window.scrollY) {
            if (newOffset < 0) transformVal = 0;
            else if (y > scrollY && scrollY > 342)
              transformVal = 0; // so the animation plays when you're scrolling up from bottom of the page
            else if (newOffset < 1) transformVal = newOffset;
          }

          el.style.transform = `scale(${transformVal})`;
        }
      };
    }

    transformEl('left')(divToSlideLeft.current);
    transformEl('right')(divToSlideRight.current);
    transformEl(undefined, true)(divToScale.current);

    setY(window.scrollY);
  }, [y]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.main}>
      {theme === 'light' ? <Bird /> : <StarsBg />}
      <CloudsBg />
      <Scale
        elRef={divToScale}
        className={styles.circle}
        animationRef={circleAnimeRef}
      />

      <div className={`${styles.text_block} ${styles.top}`}>
        <div className={styles.ctn}>
          <Slide
            animationRef={textAnimeRef}
            dir="left"
            config={slideConfig}
            tag="h2"
          >
            Alex Liang
          </Slide>
          <Slide
            elRef={divToSlideLeft}
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
            animationRef={textAnimeRef}
            dir="right"
            config={slideConfig}
            tag="h2"
          >
            web developer
          </Slide>
          <Slide
            elRef={divToSlideRight}
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
