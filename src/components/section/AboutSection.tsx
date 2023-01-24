import React, { useEffect, useMemo, useRef } from 'react';
import styles from '../../styles/AboutSection.module.scss';
import { SectionProps } from '../../types/interfaces';
import SectionHeader from '../SectionHeader';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

import Slide from '../Animations/Slide';
import { useChain, useSpringRef } from 'react-spring';
import SeigaihaPattern from '../SeigaihaPattern';

export default function AboutSection({
  title,
  sectionNumber
}: SectionProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const numRef = useRef<HTMLHeadingElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.1
  });

  const visible = ioData?.isIntersecting || false;

  const headerAnimeRef = useSpringRef();
  const textAnimeRef = useSpringRef();
  const patternAnimeRef = useSpringRef();

  useChain(
    visible ? [headerAnimeRef, textAnimeRef, patternAnimeRef] : [],
    [0, 0.5, 0.5]
  );

  const textBlockWidth = useMemo(() => {
    if (!headerRef.current) return 0;
    else return headerRef.current.offsetWidth;
  }, [headerRef.current]);
  const patternWidth = useMemo(() => {
    if (!numRef.current) return 0;
    else return numRef.current.offsetWidth;
  }, [numRef.current]);

  return (
    <section
      className={styles.main + ' ' + 'main_section'}
      ref={triggerRef}
    >
      <SectionHeader
        title={title}
        number={sectionNumber}
        animationRef={headerAnimeRef}
        headerRef={headerRef}
        numRef={numRef}
        visible={visible}
      />
      <div className={styles.content}>
        <Slide
          start={{
            transform: 'translateY(-15vh)',
            opacity: '0'
          }}
          end={{
            transform: 'translate(0)',
            opacity: '1'
          }}
          className={styles.text_block}
          animationRef={textAnimeRef}
        >
          <div style={{ width: `${textBlockWidth}px` }}>
            <p>
              I create <strong>responsive web applications</strong> that
              are fun to use.
            </p>
            <p>
              I never thought I would fall in love with programming. But,
              for me, it exists at the perfect intersection between
              creativity and pure logic.
            </p>
            <p>
              I love the puzzle games you have to solve on the way to
              elegant code, the many creative solutions that exist for any
              given problem. It can be thrilling.
            </p>
            <p>
              But being able to put everything together — the ability to
              create beautiful displays <i>and</i> powering the
              functionality behind the application — that feeling is{' '}
              <strong>priceless</strong>.
            </p>
          </div>
        </Slide>
        <Slide
          start={{ transform: 'translateX(100vw)' }}
          end={{
            transform: 'translate(0)'
          }}
          animationRef={patternAnimeRef}
        >
          <SeigaihaPattern
            style={{
              width: `${patternWidth}px`
            }}
            className={[styles.pattern, styles.top].join(' ')}
          />
        </Slide>
      </div>
      <SeigaihaPattern
        style={{ height: `${patternWidth}px` }}
        className={[styles.pattern, styles.bottom].join(' ')}
      />
    </section>
  );
}
