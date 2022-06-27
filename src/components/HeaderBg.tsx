import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useSprings, animated } from 'react-spring';
import CloudSvg from './CloudSvg';
import styles from '../styles/HeaderBg.module.scss';

interface HeaderBgProps {
  size: {
    height: number;
    width: number;
  };
}

function getRdmNum(max: number) {
  return Math.floor(Math.random() * max);
}

export default function HeaderBg({ size }: HeaderBgProps) {
  const node = useRef<HTMLDivElement | null>(null);
  const initialClouds = useRef<SVGElement[]>([]);

  const [springs, api] = useSprings(8, (index: number) => {
    const start = getRdmNum(100 - index * 2); // index*2 so clouds are more spread out
    const end = start + 100;

    return {
      from: {
        transform: `translateX(${start}vw)`
      },
      to: {
        transform: `translateX(${end}vw)`
      },
      config: {
        duration: 70000
      }
    };
  });

  useLayoutEffect(() => {
    api.start();
  }, []);

  const rootClasses = ['bg', styles.main];
  return (
    <div ref={node} className={rootClasses.join(' ')}>
      {springs.map((spring, i) => (
        <CloudSvg
          key={i}
          listRef={(instance: SVGElement | null) => {
            if (!instance || initialClouds.current.includes(instance))
              return;
            initialClouds.current.push(instance);
          }}
          className={styles.init}
          style={spring}
        />
      ))}
      {Array(16)
        .fill(null)
        .map((v, i) => (
          <CloudSvg key={i} className={styles.off_page} />
        ))}
    </div>
  );
}
