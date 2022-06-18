import React from 'react';
import styles from '../styles/SectionHeader.module.scss';
import { useTransition, animated } from 'react-spring';

interface SectionHeaderProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  number: number;
}

export default function SectionHeader({
  title,
  number
}: SectionHeaderProps) {
  const titleTransition = useTransition(true, {
    from: { transform: 'translate(-100%)' },
    enter: { transform: 'translateX(0%)' }
  });

  const numberTransition = useTransition(true, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' }
  });

  return (
    <header className={styles.main}>
      {titleTransition((transitions) => (
        <animated.div className={styles.title} style={transitions}>
          <h4>{title.firstRow}</h4>
          <h3>{title.secondRow.toUpperCase()}</h3>
        </animated.div>
      ))}
      {numberTransition((transitions) => (
        <animated.h2 style={transitions}>{`0${number}`}</animated.h2>
      ))}{' '}
    </header>
  );
}
