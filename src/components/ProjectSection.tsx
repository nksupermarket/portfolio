import React from 'react';
import Project from './Project';
import SectionHeader from './SectionHeader';

import styles from '../styles/ProjectSection.module.scss';
import crochessScreen from '../assets/images/crochess-screen.png';

interface ProjectSectionProps {
  title: string;
  sectionNumber: number;
}

export default function ProjectSection({
  title,
  sectionNumber
}: ProjectSectionProps) {
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
      />
      <Project
        title="croChess"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: crochessScreen,
          alt: 'screenshot of chess game in action'
        }}
        reverse={true}
      />
    </section>
  );
}
