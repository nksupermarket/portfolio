import React from 'react';
import { SpringRef } from 'react-spring';
import styles from '../styles/SectionHeader.module.scss';
import Slide from './Animations/Slide';

interface SectionHeaderProps {
  title: {
    firstRow: string;
    secondRow: string;
  };
  number: number;
  animationRef?: SpringRef;
  shouldFireAnime: boolean;
  headerRef?: React.Ref<HTMLHeadingElement>;
  numRef?: React.Ref<HTMLHeadingElement>;
}

export default function SectionHeader({
  title,
  number,
  animationRef,
  shouldFireAnime,
  headerRef,
  numRef
}: SectionHeaderProps) {
  return (
    <header className={styles.main}>
      <Slide
        start={{ transform: 'translateX(-100vw)' }}
        end={{
          transform: shouldFireAnime
            ? 'translate(0)'
            : 'translateX(-100vw)'
        }}
        animationRef={animationRef}
      >
        <div className={styles.title}>
          <h4 className="shootable_el boundary">{title.firstRow}</h4>
          <h3 ref={headerRef} className="shootable_el boundary">
            {title.secondRow.toUpperCase()}
          </h3>
        </div>
      </Slide>
      <Slide
        start={{ transform: 'translateX(50vw)' }}
        end={{
          transform: shouldFireAnime ? 'translate(0)' : 'translateX(50vw)'
        }}
        animationRef={animationRef}
        config={{
          mass: 60,
          tension: 1000,
          friction: 200,
          bounce: 0.3
        }}
      >
        <h2
          ref={numRef}
          className="shootable_el boundary"
        >{`0${number}`}</h2>
      </Slide>
    </header>
  );
}
