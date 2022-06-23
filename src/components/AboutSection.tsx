import React, { useRef } from 'react';
import styles from '../styles/AboutSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';
import useIntersectionObserver from '../utils/useIntersectionObserver';

import Slide from './Animations/Slide';
import { useChain, useSpringRef } from 'react-spring';

export default function AboutSection({
  title,
  sectionNumber
}: SectionProps) {
  const triggerRef = useRef<HTMLElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.1
  });

  const visible = ioData?.isIntersecting || false;

  const headerAnimeRef = useSpringRef();
  const textAnimeRef = useSpringRef();

  useChain(visible ? [headerAnimeRef, textAnimeRef] : [], [0, 0.5]);

  return (
    <section className={styles.main} ref={triggerRef}>
      <SectionHeader
        title={title}
        number={sectionNumber}
        animationRef={headerAnimeRef}
      />
      <Slide
        dir="down"
        className={styles.text_block}
        animationRef={textAnimeRef}
        config={{
          mass: 50,
          tension: 2000,
          friction: 300,
          bounce: 0.5
        }}
      >
        <p>
          I create <strong>responsive web applications</strong> that are
          fun to use.
        </p>
        <p>
          I never thought I would fall in love with programming. But, for
          me, it exists at the perfect intersection between creativity and
          pure logic.
        </p>
        <p>
          I love the puzzle games you have to solve on the way to elegant
          code, the many creative solutions that exist for any given
          problem. It is all so thrilling.
        </p>
        <p>
          But being able to put everything together — the ability to create
          beautiful displays <i>and</i> powering the functionality behind
          the application — that feeling is <strong>priceless</strong>.
        </p>
      </Slide>
    </section>
  );
}
