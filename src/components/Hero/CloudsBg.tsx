import styles from '../../styles/CloudsBg.module.scss';
import CloudSvg from './CloudSvg';

function createCloud(v: null, i: number, className: string) {
  let colorClass;
  if (i % 3 === 0 && i % 2 === 0) colorClass = styles.mid_light;
  else if (i % 2 === 0) colorClass = styles.light;
  return <CloudSvg key={i} className={className + ' ' + colorClass} />;
}

export default function CloudsBg() {
  const rootClasses = ['bg', styles.main];
  return (
    <div className={rootClasses.join(' ')}>
      {Array(12)
        .fill(null)
        .map((v, i) => createCloud(v, i, styles.init))}
      {Array(24)
        .fill(null)
        .map((v, i) => createCloud(v, i, styles.off_page))}
    </div>
  );
}
