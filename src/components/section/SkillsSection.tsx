import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/SkillsSection.module.scss';
import { SectionProps } from '../../types/interfaces';
import SectionHeader from '../SectionHeader';
import { useTrail, animated } from 'react-spring';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

import reactLogo from '../../assets/skills_icons/react.svg';
import expressLogo from '../../assets/skills_icons/express.svg';
import jsLogo from '../../assets/skills_icons/javascript.svg';
import tsLogo from '../../assets/skills_icons/typescript-icon.svg';
import mongoLogo from '../../assets/skills_icons/mongodb.svg';
import tailwindLogo from '../../assets/skills_icons/tailwind.svg';

const logos = [
  { src: jsLogo, type: 'javascript' },
  { src: tsLogo, type: 'typescript' },
  { src: reactLogo, type: 'react' },
  { src: expressLogo, type: 'express' },
  { src: mongoLogo, type: 'mongodb' },
  { src: tailwindLogo, type: 'tailwind' }
];

export default function SkillsSection({
  title,
  sectionNumber
}: SectionProps) {
  const [startTrail, setStartTrail] = useState(false);

  const triggerRef = useRef<HTMLElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.1
  });

  const visible = ioData?.isIntersecting || false;

  const trail = useTrail(logos.length, {
    transform: startTrail ? 'scale(100%)' : 'scale(0%)',
    config: {
      mass: 50,
      tension: 3000,
      friction: 200,
      bounce: 0.3
    }
  });

  useEffect(() => {
    if (ioData?.isIntersecting) setTimeout(() => setStartTrail(true), 400);
  }, [ioData?.isIntersecting]);

  return (
    <section
      className={styles.main + ' ' + 'main_section'}
      ref={triggerRef}
    >
      <SectionHeader
        title={title}
        number={sectionNumber}
        visible={visible}
      />
      <ul className={styles.list}>
        <div className={styles.top_row}>
          {trail.slice(0, 3).map((style, i) => {
            const logo = logos[i];
            return (
              <animated.li key={logo.type} style={style}>
                <div
                  className={styles.img_wrapper + ' ' + styles[logo.type]}
                >
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
