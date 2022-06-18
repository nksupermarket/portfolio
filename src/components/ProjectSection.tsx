import React from 'react';
import Project from './Project';
import SectionHeader from './SectionHeader';

import { SectionProps } from '../types/interfaces';
import styles from '../styles/ProjectSection.module.scss';
import crochessScreen from '../assets/images/crochess-screen.png';
import breadScreen from '../assets/images/discord-screen.png';
import wheresWaldoScreen from '../assets/images/wheres_waldo_screen.png';
import battleshipScreen from '../assets/images/battleship_screen.png';
import battleshipScreen3 from '../assets/images/battleship_screen_3.png';
import memoryCardScreen from '../assets/images/memory_card_game_screen.png';

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
          live: 'https://crochess-frontend.herokuapp.com/',
          repo: 'https://github.com/lookingcoolonavespa/crochess'
        }}
      />
      <Project
        title="bread"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: breadScreen,
          alt: 'screenshot of chat channel in bread',
          objectPosition: '0% 50%'
        }}
        stack={['Javascript', 'React', 'Css']}
        reverse={true}
        links={{
          live: 'https://lookingcoolonavespa.github.io/discord-clone',
          repo: 'https://github.com/lookingcoolonavespa/discord-clone/tree/master'
        }}
      />
      <Project
        title="Where's Waldo"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: wheresWaldoScreen,
          alt: "screenshot of where's waldo home page",
          objectPosition: '50% 50%'
        }}
        stack={['Javascript', 'React', 'Css']}
        links={{
          live: 'https://lookingcoolonavespa.github.io/wheres-waldo/',
          repo: 'https://github.com/lookingcoolonavespa/wheres-waldo'
        }}
      />
      <Project
        title="memory card game"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: memoryCardScreen,
          alt: 'screenshot of chat channel in bread',
          objectPosition: '50% 50%'
        }}
        stack={['Javascript', 'React', 'Css']}
        reverse={true}
        links={{
          live: 'https://lookingcoolonavespa.github.io/memory-card-game/',
          repo: 'https://github.com/lookingcoolonavespa/memory-card-game'
        }}
      />
      <Project
        title="Battleship"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus sit amet volutpat consequat."
        image={{
          src: battleshipScreen3,
          alt: 'screenshot of battleship home page',
          objectPosition: '50% 50%'
        }}
        stack={['Javascript', 'Html', 'Css']}
        links={{
          live: 'https://lookingcoolonavespa.github.io/battleship/dist/',
          repo: 'https://github.com/lookingcoolonavespa/battleship'
        }}
      />
    </section>
  );
}
