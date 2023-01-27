import React, { Suspense, useMemo } from 'react';
import styles from '../../styles/Hero.module.scss';
import ReactLogo from '../svg/ReactLogo';

import Circle from './Circle';
import CloudsBg from './CloudsBg';

interface HeroProps {
  theme: 'light' | 'dark';
}

export default function Hero({ theme }: HeroProps) {
  const Bird = useMemo(() => React.lazy(() => import('./Bird')), []);
  const StarsBg = useMemo(() => React.lazy(() => import('./StarsBg')), []);

  return (
    <div className={styles.main}>
      <Suspense>{theme === 'light' ? <Bird /> : <StarsBg />}</Suspense>
      <CloudsBg />
      <Circle />
    </div>
  );
}
