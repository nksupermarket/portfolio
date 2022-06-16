import React from 'react';
import Project from './Project';
import SectionHeader from './SectionHeader';

import { SectionProps } from '../types/interfaces';
import styles from '../styles/ProjectSection.module.scss';
import crochessScreen from '../assets/images/crochess-screen.png';

export default function ProjectSection({
  title,
  sectionNumber
}: SectionProps) {
  return (
    <section className={styles.main}>
      <SectionHeader title={title} number={sectionNumber} />
      <Project
        title="croChess"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: crochessScreen,
          alt: 'screenshot of chess game in action'
        }}
        stack={['Typescript', 'Express', 'Next.js', 'Sass']}
        links={{
          live: '',
          repo: ''
        }}
      />
      <Project
        title="croChess"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: crochessScreen,
          alt: 'screenshot of chess game in action'
        }}
        reverse={true}
        links={{
          live: '',
          repo: ''
        }}
      />
    </section>
  );
}
