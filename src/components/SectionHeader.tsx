import React, { useRef } from 'react';
import styles from '../styles/SectionHeader.module.scss';
import Slide from './Animations/Slide';
import { SpringRef } from 'react-spring';

import useIntersectionObserver from '../utils/useIntersectionObserver';

interface SectionHeaderProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  number: number;
  animationRef?: SpringRef;
}

export default function SectionHeader({
  title,
  number,
  animationRef
}: SectionHeaderProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {});

  const visible = ioData?.isIntersecting || false;
  console.log(visible, number);

  return (
    <header className={styles.main}>
      <Slide dir="right" animationRef={animationRef} condition={visible}>
        <div className={styles.title}>
          <h4>{title.firstRow}</h4>
          <h3>{title.secondRow.toUpperCase()}</h3>
        </div>
      </Slide>
      <Slide dir="left" animationRef={animationRef} condition={visible}>
        <h2>{`0${number}`}</h2>
      </Slide>
      <span ref={triggerRef}></span>
    </header>
  );
}
