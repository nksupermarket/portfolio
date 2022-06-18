import React from 'react';
import styles from '../styles/Header.module.scss';
import {
  useChain,
  useSpringRef,
  useTransition,
  animated
} from 'react-spring';

export default function Header() {
  const circleTransitionRef = useSpringRef();
  const circleTransition = useTransition(true, {
    from: { transform: 'scale(0%)' },
    enter: { transform: 'scale(100%)' },
    ref: circleTransitionRef
  });

  const textTransitionRef = useSpringRef();
  const textBlockTopTransition = useTransition(true, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    ref: textTransitionRef
  });

  const textBlockBottomTransition = useTransition(true, {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    ref: textTransitionRef
  });

  // useChain([circleTransitionRef, textTransitionRef], [0, 1]);

  return (
    <div className={styles.main}>
      {circleTransition((transitions) => (
        <animated.div
          className={styles.circle}
          style={transitions}
        ></animated.div>
      ))}
      {textBlockTopTransition((transitions) => (
        <animated.div
          className={`${styles.text_block} ${styles.top}`}
          style={transitions}
        >
          <div className={styles.ctn}>
            <h2>Alex Liang</h2>
            <div className={styles.underline}></div>
          </div>
        </animated.div>
      ))}

      {textBlockBottomTransition((transitions) => (
        <animated.div
          className={`${styles.text_block} ${styles.bottom}`}
          style={transitions}
        >
          <div className={styles.ctn}>
            <h2>web developer</h2>
            <div className={styles.underline}></div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
