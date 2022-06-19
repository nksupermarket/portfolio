import React from 'react';
import styles from '../styles/Project.module.scss';

import {
  useChain,
  useSpring,
  useTrail,
  animated,
  useSpringRef
} from 'react-spring';
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
}

export default function Project({
  title,
  desc,
  image,
  stack,
  links,
  reverse
}: ProjectProps) {
  const rootClasses = [styles.main];
  if (reverse) rootClasses.push(styles.reverse);

  const secondaryAnimeRef = useSpringRef();

  const slideAnimeRef = useSpringRef();

  const stackTrail = useTrail(stack.length, {
    from: {
      transform: reverse ? 'translateX(-100vw)' : 'translateX(100vw)'
    },
    to: { transform: 'translateX(0)' }
  });

  useChain([slideAnimeRef, secondaryAnimeRef], [0, 0.3]);

  return (
    <div className={rootClasses.join(' ')}>
      <Slide
        dir={reverse ? 'left' : 'right'}
        className={styles.text_block}
        animationRef={slideAnimeRef}
      >
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{desc}</p>

        <Scale className={styles.btn_ctn} animationRef={secondaryAnimeRef}>
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
