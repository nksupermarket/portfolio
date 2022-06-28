import React from 'react';
import { animated, useSpring, easings } from 'react-spring';
import styles from '../styles/Bird.module.scss';

export default function Bird() {
  const rotateSpring = useSpring({
    loop: { reverse: true },
    from: {
      transform: `rotate(-7deg)`
    },
    to: {
      transform: `rotate(7deg)`
    },

    config: { duration: 2000, easing: easings.easeOutSine }
  });
  return (
    <div className={styles.ctn}>
      <animated.div className={styles.rotate_wrapper} style={rotateSpring}>
        <div className={styles.main}>
          <div className={styles.body} />
          <div className={styles.tail_feather} />
          <div className={styles.eye}>
            <div className={styles.eyeball} />
          </div>
          <div className={styles.beak} />
          <div className={styles.wing}>
            <div className={styles.wing_feathers} />
          </div>
        </div>
      </animated.div>
    </div>
  );
}
