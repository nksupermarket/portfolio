import React from 'react';
import styles from '../styles/AboutSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';

export default function AboutSection({
  title,
  sectionNumber
}: SectionProps) {
  return (
    <section className={styles.main}>
      <SectionHeader title={title} number={sectionNumber} />
      <div className={styles.text_block}>
        <p>
          Coding was never part of the plan. It was never something I
          thought I would enjoy.
        </p>
        <p>
          It started basic - with some basic HTML/CSS so I could design my
          Wordpress blog. Then I got a little more into it so I could
          improve the UI/UX of the ecommerce store I was doing marketing
          for. And I thought that was fun; with how the block model works,
          it was kind of like playing with Legos.
        </p>
        <p>
          But picking up Javascript was the game changer — the little
          puzzle games you have to solve to write elegant code, the many
          different creative solutions that exist for any given problem. It
          is all so thrilling.
        </p>
        <p>
          Being able to put everything together — the ability to create
          beautiful displays while also creating the functionality that
          powers the application — that feeling is priceless.
        </p>
      </div>
    </section>
  );
}
