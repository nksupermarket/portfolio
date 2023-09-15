import { useRef } from 'react';
import styles from '../../styles/AboutSection.module.scss';
import { SectionProps } from '../../types/interfaces';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import SectionHeader from '../SectionHeader';

import { useChain, useSpringRef } from 'react-spring';
import Slide from '../Animations/Slide';

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

  useChain(visible ? [headerAnimeRef, textAnimeRef] : [], [0, 0.5]);

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
            transform: 'translateY(-5vh)',
            opacity: '0'
          }}
          end={{
            transform: 'translate(0)',
            opacity: '1'
          }}
          className={styles.text_wrapper}
          animationRef={textAnimeRef}
        >
          <div
            className={[
              'boundary',
              'shootable_el',
              styles.text_block
            ].join(' ')}
          >
            <p>
              I create <strong>responsive web applications</strong> that
              are fun to use.
            </p>
            <p>
              I never saw myself programming. Somewhere along the way I
              must&apos;ve gotten lost - led wayward by the witchcraft
              Javascript. It whispered to me, told me stories of what was
              possible, showed me visions of what I could build.
            </p>
            <p>
              And now I can&apos;t seem to stop. I love the little puzzle
              games you have to solve as you compose elegant code, the many
              creative solutions that exist for any given problem,
            </p>
            <p>
              making <i>something</i> out of nothing.
            </p>
          </div>
          <div className={styles.backdrop} />
        </Slide>
      </div>
    </section>
  );
}
