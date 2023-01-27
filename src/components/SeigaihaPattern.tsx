import styles from '../styles/SeigaihaPattern.module.scss';

interface Props {
  style?: { [key: string]: string };
  className?: string;
}

export default function SeigaihaPattern({ style, className }: Props) {
  return (
    <div
      className={[styles.main, className].join(' ')}
      style={style}
    ></div>
  );
}
