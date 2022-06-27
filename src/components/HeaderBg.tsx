import React, { useRef, useEffect } from 'react';
import { useSprings, animated } from 'react-spring';
import CloudSvg from './CloudSvg';
import styles from '../styles/HeaderBg.module.scss';

interface HeaderBgProps {
  size: {
    height: number;
    width: number;
  };
}

export default function HeaderBg({ size }: HeaderBgProps) {
  const node = useRef<HTMLDivElement | null>(null);

  const [springs, api] = useSprings(12, (index) => ({ left: '100vw' }));

  useEffect(() => {
    api.start();
  }, []);

  const rootClasses = ['bg', styles.main];
  return (
    <div ref={node} className={rootClasses.join(' ')}>
      {springs.map((anime, i) => (
        <animated.div style={anime} key={i}>
          <CloudSvg key={i} className={styles.init} />
        </animated.div>
      ))}
      {Array(24)
        .fill(null)
        .map((v, i) => (
          <CloudSvg key={i} className={styles.off_page} />
        ))}
    </div>
  );
}
