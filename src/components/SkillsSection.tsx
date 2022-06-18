import React from 'react';
import styles from '../styles/SkillsSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';
import { useTrail, animated } from 'react-spring';

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
  const trail = useTrail(logos.length, {
    from: { transform: 'scale(0%)' },
    to: { transform: 'scale(100%)' }
  });

  return (
    <section className={styles.main}>
      <SectionHeader title={title} number={sectionNumber} />
      <ul className={styles.list}>
        <div className={styles.top_row}>
          {logos.slice(0, 3).map((logo, i) => {
            return (
              <animated.li
                key={logo.type}
                className={styles[logo.type]}
                style={trail[i]}
              >
                <div className={styles.img_wrapper}>
                  <img src={logo.src} alt={`${logo.type} logo`} />
                </div>
              </animated.li>
            );
          })}
        </div>
        <div className={styles.bottom_row}>
          {logos.slice(3).map((logo, i) => {
            return (
              <animated.li
                key={logo.type}
                className={styles[logo.type]}
                style={trail[i + 3]}
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
