import styles from '../../styles/CloudsBg.module.scss';
import CloudSvg from './CloudSvg';

export default function CloudsBg() {
  const rootClasses = ['bg', styles.main];
  return (
    <div className={rootClasses.join(' ')}>
      {Array(12)
        .fill(null)
        .map((v, i) => (
          <CloudSvg key={i} className={styles.init} />
        ))}
      {Array(24)
        .fill(null)
        .map((v, i) => (
          <CloudSvg key={i} className={styles.off_page} />
        ))}
    </div>
  );
}
