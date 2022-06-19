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

  const scaleTransitionRef = useSpringRef();
  const scaleAnime = useSpring({
    from: { transform: 'scale(0%)' },
    to: { transform: 'scale(100%)' },
    ref: scaleTransitionRef
  });

  const textTransitionRef = useSpringRef();
  const textAnime = useSpring({
    from: {
      transform: reverse ? 'translateX(100%)' : 'translateX(-100%)'
    },
    to: { transform: 'translateX(0%)' },
    ref: textTransitionRef
  });

  const stackTrail = useTrail(stack.length, {
    from: {
      transform: reverse ? 'translateX(-100%)' : 'translateX(100%)'
    },
    to: { transform: 'translateX(0%)' }
  });

  useChain([textTransitionRef, scaleTransitionRef]);

  return (
    <div className={rootClasses.join(' ')}>
      <Slide
        dir={reverse ? 'left' : 'right'}
        className={styles.text_block}
      >
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{desc}</p>

        <Scale className={styles.btn_ctn}>
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
        <Scale className={styles.img_wrapper}>
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
