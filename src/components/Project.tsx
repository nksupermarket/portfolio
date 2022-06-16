import React from 'react';
import styles from '../styles/Project.module.scss';

interface ProjectProps {
  title: string;
  desc: string;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean;
}

export default function Project({
  title,
  desc,
  image,
  reverse
}: ProjectProps) {
  return (
    <div
      className={styles.main}
      style={{
        flexDirection: reverse ? 'row-reverse' : 'row'
      }}
    >
      <div className={styles.text_block}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{desc}</p>
      </div>
      <div className={styles.img_wrapper}>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  );
}
