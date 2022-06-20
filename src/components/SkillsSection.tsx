import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/SkillsSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';
import { useTrail, animated } from 'react-spring';
import useIntersectionObserver from '../utils/useIntersectionObserver';

import reactLogo from '../assets/skills_icons/react.svg';
import expressLogo from '../assets/skills_icons/express.svg';
import jsLogo from '../assets/skills_icons/javascript.svg';
import tsLogo from '../assets/skills_icons/typescript-icon.svg';
import mongoLogo from '../assets/skills_icons/mongodb.svg';

const logos = [
  { src: jsLogo, type: 'javascript' },
  { src: tsLogo, type: 'typescript' },
  { src: reactLogo, type: 'react' },
  { src: expressLogo, type: 'express' },
  { src: mongoLogo, type: 'mongodb' }
];

export default function SkillsSection({
  title,
  sectionNumber
}: SectionProps) {
  // const headerAnimeRef = useSpringRef();
  const [headerAnimeFinished, setHeaderAnimeFinished] = useState([
    false,
    false
  ]);

  const triggerRef = useRef<HTMLElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.1
  });

  const visible = ioData?.isIntersecting || false;

  const [trail, api] = useTrail(logos.length, () => ({
    transform: 'scale(0%)'
  }));

  useEffect(() => {
    if (headerAnimeFinished.every((bool) => bool))
      api.start({ transform: 'scale(100%)' });
  }, [headerAnimeFinished]);

  return (
    <section className={styles.main} ref={triggerRef}>
      <SectionHeader
        title={title}
        number={sectionNumber}
        visible={visible}
        setHeaderAnimeFinished={setHeaderAnimeFinished}
        // animationRef={headerAnimeRef}
      />
      <ul className={styles.list}>
        <div className={styles.top_row}>
          {trail.slice(0, 3).map((style, i) => {
            const logo = logos[i];
            return (
              <animated.li
                key={logo.type}
                className={styles[logo.type]}
                style={style}
              >
                <div className={styles.img_wrapper}>
                  <img src={logo.src} alt={`${logo.type} logo`} />
                </div>
              </animated.li>
            );
          })}
        </div>
        <div className={styles.bottom_row}>
          {trail.slice(3).map((style, i) => {
            const logo = logos[i + 3];
            return (
              <animated.li
                key={logo.type}
                className={styles[logo.type]}
                style={style}
              >
                <div className={styles.img_wrapper}>
                  <img src={logo.src} alt={`${logo.type} logo`} />
                </div>
              </animated.li>
            );
          })}
        </div>
      </ul>
    </section>
  );
}
