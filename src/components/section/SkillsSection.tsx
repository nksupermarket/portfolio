import { useEffect, useRef, useState } from 'react';
import { animated, useTrail } from 'react-spring';
import styles from '../../styles/SkillsSection.module.scss';
import { SectionProps } from '../../types/interfaces';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import SectionHeader from '../SectionHeader';

import NodeLogo from '../svg/NodeLogo';
import JsLogo from '../svg/JsLogo';
import TsLogo from '../svg/TsLogo';
import ReactLogo from '../svg/ReactLogo';
import MongoLogo from '../svg/MongoLogo';
import TailwindLogo from '../svg/TailwindLogo';

const logos = [
  { component: JsLogo, type: 'javascript' },
  { component: TsLogo, type: 'typescript' },
  { component: ReactLogo, type: 'react' },
  { component: NodeLogo, type: 'express' },
  { component: MongoLogo, type: 'mongodb' },
  { component: TailwindLogo, type: 'tailwind' }
];
let timer: NodeJS.Timeout | null = null;
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
    if (ioData?.isIntersecting && timer === null)
      timer = setTimeout(() => setStartTrail(true), 400);
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
      <div className={styles.list}>
        <ul className={styles.top_row}>
          {trail.slice(0, 3).map((style, i) => {
            const logo = logos[i];
            return (
              <animated.li key={logo.type} style={style}>
                <div
                  className={styles.img_wrapper + ' ' + styles[logo.type]}
                >
                  <logo.component height="70%" width="70%" />
                </div>
              </animated.li>
            );
          })}
        </ul>
        <ul className={styles.bottom_row}>
          {trail.slice(3).map((style, i) => {
            const logo = logos[i + 3];
            return (
              <animated.li
                key={logo.type}
                className={styles[logo.type]}
                style={style}
              >
                <div className={styles.img_wrapper}>
                  <logo.component height="70%" width="70%" />
                </div>
              </animated.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
