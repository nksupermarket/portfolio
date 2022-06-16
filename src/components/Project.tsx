import React from 'react';
import styles from '../styles/Project.module.scss';

interface ProjectProps {
  title: string;
  desc: string;
  image: {
    src: string;
    alt: string;
  };
  stack?: string[];
  links: {
    live: string;
    repo: string;
  };
  reverse?: boolean;
}

export default function Project({
  title,
  desc,
  image,
  stack,
  links,
  reverse
}: ProjectProps) {
  const rootClasses = [styles.main];
  if (reverse) rootClasses.push(styles.reverse);
  return (
    <div className={rootClasses.join(' ')}>
      <div className={styles.text_block}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.btn_ctn}>
          <a className={styles.live} href={links.live}>
            Live
          </a>
          |<a href={links.repo}>Repo</a>
        </div>
      </div>
      <div className={styles.right_col}>
        <div className={styles.stack}>
          {stack?.map((s, i) => {
            return (
              <h5 key={i} className={styles.tech}>
                {s.toUpperCase()}
              </h5>
            );
          })}
        </div>
        <div className={styles.img_wrapper}>
          <img src={image.src} alt={image.alt} />
        </div>
      </div>
    </div>
  );
}
