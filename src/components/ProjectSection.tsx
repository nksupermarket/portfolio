import React from 'react';
import Project from './Project';
import SectionHeader from './SectionHeader';

import { SectionProps } from '../types/interfaces';
import styles from '../styles/ProjectSection.module.scss';
import crochessScreen from '../assets/images/crochess-screen.png';
import breadScreen from '../assets/images/discord-screen.png';

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
          alt: 'screenshot of chess game in action',
          objectPosition: '71% 50%'
        }}
        stack={['Typescript', 'Express', 'Next.js', 'Sass']}
        links={{
          live: '',
          repo: ''
        }}
      />
      <Project
        title="bread"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: breadScreen,
          alt: 'screenshot of bread in action',
          objectPosition: '0% 50%'
        }}
        stack={['Javascript', 'React', 'Css']}
        reverse={true}
        links={{
          live: '',
          repo: ''
        }}
      />
    </section>
  );
}
