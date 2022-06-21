import React, { useEffect } from 'react';
import styles from '../styles/Project.module.scss';

import { useChain, useTrail, animated, useSpringRef } from 'react-spring';
import Scale from './Animations/Scale';
import Slide from './Animations/Slide';

interface ProjectProps {
  title: string;
  desc: string;
  image: {
    src: string;
    alt: string;
    objectPosition: string;
  };
  stack: string[];
  links: {
    live: string;
    repo: string;
  };
  reverse?: boolean;
  fireAnime: boolean;
}

const slideConfig = {
  mass: 30,
  tension: 300,
  friction: 63,
  clamp: false,
  precision: 0.01,
  velocity: 0,
  damping: 0.5,
  frequency: 0.7,
  bounce: 0.5
};

export default function Project({
  title,
  desc,
  image,
  stack,
  links,
  reverse,
  fireAnime
}: ProjectProps) {
  const rootClasses = [styles.main];
  if (reverse) rootClasses.push(styles.reverse);

  const secondaryAnimeRef = useSpringRef();

  const slideAnimeRef = useSpringRef();

  const stackTrail = useTrail(stack.length, {
    from: {
      transform: reverse ? 'translateX(-50vw)' : 'translateX(50vw)'
    },
    to: {
      transform: fireAnime
        ? 'translateX(0)'
        : reverse
        ? 'translateX(-100vw)'
        : 'translateX(100vw)'
    },
    config: slideConfig
  });

  useChain(fireAnime ? [slideAnimeRef, secondaryAnimeRef] : [], [0, 0.3]);

  return (
    <div className={rootClasses.join(' ')}>
      <Slide
        dir={reverse ? 'left' : 'right'}
        className={styles.text_block}
        animationRef={slideAnimeRef}
      >
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{desc}</p>

        <Scale
          className={styles.btn_ctn}
          animationRef={secondaryAnimeRef}
          config={slideConfig}
        >
          <a className={styles.live} href={links.live}>
            Live
          </a>
          |<a href={links.repo}>Repo</a>
        </Scale>
      </Slide>

      <div className={styles.img_col}>
        <div className={styles.stack}>
          {stack?.map((s, i) => {
            return (
              <animated.h5
                key={i}
                className={styles.tech}
                style={stackTrail[i]}
              >
                {s.toUpperCase()}
              </animated.h5>
            );
          })}
        </div>
        <Scale
          className={styles.img_wrapper}
          animationRef={secondaryAnimeRef}
          config={slideConfig}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{
              objectPosition: image.objectPosition
            }}
          />
        </Scale>
      </div>
    </div>
  );
}
