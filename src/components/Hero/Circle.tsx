import { useCallback, useEffect, useRef, useState } from 'react';
import { useChain, useSpringRef } from 'react-spring';
import Scale from '../Animations/Scale';
import Slide from '../Animations/Slide';
import styles from '../../styles/Circle.module.scss';

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

export default function Circle() {
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

    function slide(translateX: 'left' | 'right', el: HTMLElement) {
      const style = window.getComputedStyle(el);

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
    }

    function scale(el: HTMLElement) {
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

    slide('left', divToSlideLeft.current);
    slide('right', divToSlideRight.current);
    scale(divToScale.current);

    setY(window.scrollY);
  }, [y]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return (
    <>
      <Scale
        elRef={divToScale}
        className={styles.circle}
        animationRef={circleAnimeRef}
      />

      <div className={`${styles.text_block} ${styles.top}`}>
        <div className={styles.ctn}>
          <Slide
            start={{ transform: 'translateX(100vw)' }}
            end={{
              transform: 'translate(0)'
            }}
            animationRef={textAnimeRef}
            config={slideConfig}
            tag="h2"
          >
            Alex Liang
          </Slide>
          <Slide
            start={{ transform: 'translateX(100vw)' }}
            end={{
              transform: 'translate(0)'
            }}
            elRef={divToSlideLeft}
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
            start={{ transform: 'translateX(-100vw)' }}
            end={{
              transform: 'translate(0)'
            }}
            animationRef={textAnimeRef}
            config={slideConfig}
            tag="h2"
          >
            web developer
          </Slide>
          <Slide
            start={{ transform: 'translateX(-100vw)' }}
            end={{
              transform: 'translate(0)'
            }}
            elRef={divToSlideRight}
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
    </>
  );
}
