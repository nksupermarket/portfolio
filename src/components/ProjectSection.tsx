import React, { useState, useRef, useEffect } from 'react';
import Project from './Project';
import SectionHeader from './SectionHeader';

import useIntersectionObserver from '../utils/useIntersectionObserver';

import { SectionProps } from '../types/interfaces';
import styles from '../styles/ProjectSection.module.scss';
import crochessScreen from '../assets/images/crochess-screen.png';
import breadScreen from '../assets/images/discord-screen.png';
import wheresWaldoScreen from '../assets/images/wheres_waldo_screen.png';
import battleshipScreen3 from '../assets/images/battleship_screen_3.png';
import memoryCardScreen from '../assets/images/memory_card_game_screen.png';

export default function ProjectSection({
  title,
  sectionNumber
}: SectionProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.1
  });

  const visible = ioData?.isIntersecting || false;

  const [headerAnimeFinished, setHeaderAnimeFinished] = useState([
    false,
    false
  ]);

  useEffect(() => {
    if (ioData?.isIntersecting)
      setTimeout(() => setHeaderAnimeFinished([true, true]), 200);
  }, [ioData?.isIntersecting]);

  return (
    <section className={styles.main} ref={triggerRef}>
      <SectionHeader
        title={title}
        number={sectionNumber}
        visible={visible}
      />

      <Project
        title="croChess"
        desc="Play live online chess with your friends. Choose from standard time controls or create your own. All timers run on the backend so cheating is not possible."
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
        fireAnime={headerAnimeFinished.every((bool) => bool)}
      />
      <Project
        title="bread"
        desc="A community-based chat application where you can hang out with friends or find communities where people share your interests. Create a channel and start your own community or just sit back and enjoy the conversations."
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
        fireAnime={headerAnimeFinished.every((bool) => bool)}
      />
      <Project
        title="Where's Waldo"
        desc="Compete with players around the world for the best time in a game of Where's Waldo. 7 different levels means 7 chances to get that #1 spot."
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
        fireAnime={headerAnimeFinished.every((bool) => bool)}
      />
      <Project
        title="memory card game"
        desc="Is your memory as good (or bad) as you think it is? Test your memory out in this game, and try to set some new personal bests."
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
        fireAnime={headerAnimeFinished.every((bool) => bool)}
      />
      <Project
        title="Battleship"
        desc="Play a game of battleship where the computer will stop at nothing to defeat you. It's your fleet admiral. Defend your position!"
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
        fireAnime={headerAnimeFinished.every((bool) => bool)}
      />
    </section>
  );
}
