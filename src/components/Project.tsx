import React from 'react';
import styles from '../styles/Project.module.scss';

import { useTrail, useTransition, animated } from 'react-spring';

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

  const imageTransition = useTransition(true, {
    from: { transform: 'scale(0%)' },
    enter: { transform: 'scale(100%)' }
  });

  const textTransition = useTransition(true, {
    from: {
      transform: reverse ? 'translateX(100%)' : 'translateX(-100%)'
    },
    enter: { transform: 'translateX(0%)' }
  });

  const stackTrail = useTrail(stack.length, {
    from: {
      transform: reverse ? 'translateX(-100%)' : 'translateX(100%)'
    },
    to: { transform: 'translateX(0%)' }
  });

  return (
    <div className={rootClasses.join(' ')}>
      {textTransition((transition) => (
        <animated.div className={styles.text_block} style={transition}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.desc}>{desc}</p>
          <div className={styles.btn_ctn}>
            <a className={styles.live} href={links.live}>
              Live
            </a>
            |<a href={links.repo}>Repo</a>
          </div>
        </animated.div>
      ))}
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
        {imageTransition((transition) => (
          <animated.div className={styles.img_wrapper} style={transition}>
            <img
              src={image.src}
              alt={image.alt}
              style={{
                objectPosition: image.objectPosition
              }}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
