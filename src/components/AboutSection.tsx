import React from 'react';
import styles from '../styles/AboutSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';

import Slide from './Animations/Slide';
import { useChain, useSpringRef } from 'react-spring';

export default function AboutSection({
  title,
  sectionNumber
}: SectionProps) {
  const headerAnimeRef = useSpringRef();
  const textAnimeRef = useSpringRef();

  useChain([headerAnimeRef, textAnimeRef], [0, 0.4]);

  return (
    <section className={styles.main}>
      <SectionHeader
        title={title}
        number={sectionNumber}
        animationRef={headerAnimeRef}
      />
      <Slide
        dir="down"
        className={styles.text_block}
        animationRef={textAnimeRef}
      >
        <p>Coding was never part of the plan.</p>
        <p>
          It started with some simple HTML/CSS so I could design my
          Wordpress blog. Then I got a little more into it so I could
          improve the UI/UX of the ecommerce store I was doing digital
          marketing for. And I thought that was fun — with how the block
          model works, it was kind of like playing with Legos.
        </p>
        <p>
          But picking up Javascript was the game changer — the little
          puzzle games you have to solve to write elegant code, the many
          creative solutions that exist for any given problem. It is all so
          thrilling.
        </p>
        <p>
          Being able to put everything together — the ability to create
          beautiful displays while also powering the functionality behind
          the application — that feeling is priceless.
        </p>
      </Slide>
    </section>
  );
}
