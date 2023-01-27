import { useContext } from 'react';
import styles from '../styles/Project.module.scss';

import { animated, useChain, useSpringRef, useTrail } from 'react-spring';
import { ProjectDetails } from '../types/interfaces';
import WindowSizeContext from '../utils/WindowSizeContext';
import Scale from './Animations/Scale';
import Slide from './Animations/Slide';

interface ProjectProps extends ProjectDetails {
  reverse?: boolean;
  fireAnime: boolean;
}

const slideConfig = {
  mass: 30,
  tension: 300,
  friction: 63,
  clamp: false,
  precision: 0.01,
  velocity: 0,
  damping: 0.5,
  frequency: 0.7,
  bounce: 0.5
};

export default function Project({
  title,
  desc,
  image,
  stack,
  links,
  reverse,
  fireAnime
}: ProjectProps) {
  const { lessThan992px } = useContext(WindowSizeContext);
  const rootClasses = [styles.main];
  if (reverse) rootClasses.push(styles.reverse);

  const secondaryAnimeRef = useSpringRef();

  const slideAnimeRef = useSpringRef();

  const stackTrail = useTrail(stack.length, {
    from: {
      transform: reverse ? 'translateX(50vw)' : 'translateX(-50vw)'
    },
    to: {
      transform: fireAnime
        ? 'translateX(0)'
        : reverse
        ? 'translateX(100vw)'
        : 'translateX(-100vw)'
    },
    config: slideConfig
  });

  useChain(fireAnime ? [slideAnimeRef, secondaryAnimeRef] : [], [0, 0.3]);

  return (
    <div className={rootClasses.join(' ')}>
      <div className={styles.main_content}>
        <Slide
          start={{
            transform: reverse ? 'translateX(100vw)' : 'translateX(-100vw)'
          }}
          end={{
            transform: 'translate(0)'
          }}
          className={styles.text_col}
          animationRef={slideAnimeRef}
        >
          <header>
            <div className="flex-col">
              <h4 className={styles.title}>{title}</h4>
              <div>
                <div
                  className={[styles.underline, styles.green_line].join(
                    ' '
                  )}
                ></div>
                <div
                  className={[styles.underline, styles.yellow_line].join(
                    ' '
                  )}
                ></div>
                <div
                  className={[styles.underline, styles.red_line].join(' ')}
                ></div>
              </div>
            </div>
            {!lessThan992px ? (
              <div className={styles.stack}>
                {stack?.map((s, i) => {
                  return (
                    <animated.span
                      key={i}
                      className={styles.tech}
                      style={stackTrail[i]}
                    >
                      {s.toUpperCase()}
                    </animated.span>
                  );
                })}
              </div>
            ) : undefined}
          </header>
          <p className={styles.desc}>{desc}</p>
          <div className="flex-row">
            {reverse ? (
              <>
                <div className={styles.line}></div>
                <Scale
                  className={styles.btn_ctn}
                  animationRef={secondaryAnimeRef}
                  config={slideConfig}
                >
                  <a
                    className={styles.live}
                    target="_blank"
                    href={links.live}
                    rel="noreferrer"
                  >
                    Live
                  </a>
                  <span className={styles.divider}>|</span>
                  <a target="_blank" href={links.repo} rel="noreferrer">
                    Repo
                  </a>
                </Scale>
              </>
            ) : (
              <>
                <Scale
                  className={styles.btn_ctn}
                  animationRef={secondaryAnimeRef}
                  config={slideConfig}
                >
                  <a
                    className={styles.live}
                    target="_blank"
                    href={links.live}
                    rel="noreferrer"
                  >
                    Live
                  </a>
                  <span className={styles.divider}>|</span>
                  <a target="_blank" href={links.repo} rel="noreferrer">
                    Repo
                  </a>
                </Scale>
                <div className={styles.line}></div>
              </>
            )}
          </div>
        </Slide>

        <div className={styles.img_col}>
          <Scale
            className={styles.img_wrapper}
            animationRef={secondaryAnimeRef}
            config={slideConfig}
          >
            <img
              src={image.src as string}
              alt={image.alt}
              style={{
                objectPosition: image.objectPosition
              }}
            />
          </Scale>
        </div>
      </div>
      {lessThan992px ? (
        <div className={styles.stack}>
          {stack?.map((s, i) => {
            return (
              <animated.span
                key={i}
                className={styles.tech}
                style={stackTrail[i]}
              >
                {s.toUpperCase()}
              </animated.span>
            );
          })}
        </div>
      ) : undefined}
    </div>
  );
}
