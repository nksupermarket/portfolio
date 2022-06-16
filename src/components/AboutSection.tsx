import React from 'react';
import styles from '../styles/AboutSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';

export default function AboutSection({
  title,
  sectionNumber
}: SectionProps) {
  return (
    <section className={styles.main}>
      <SectionHeader title={title} number={sectionNumber} />
      <div className={styles.text_block}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          eleifend cursus dolor, sed accumsan turpis feugiat lobortis.
          Maecenas vulputate fermentum lorem. Cras blandit suscipit
          lacinia. Aliquam erat volutpat. Curabitur finibus magna nec nisl
          scelerisque venenatis. Maecenas at nisl et velit pellentesque
          ornare in nec metus. Pellentesque eu mi id ipsum vehicula
          fermentum non non eros. Aenean non commodo urna. Morbi sit amet
          egestas lacus. Vivamus ligula dui, pretium et risus in, pharetra
          ultricies ex. Sed nec nulla lobortis, feugiat tellus id, laoreet
          massa. Fusce nibh sapien, gravida a augue vitae, fringilla semper
          metus. Etiam id sem nec odio fringilla sollicitudin eget nec
          orci. Vivamus aliquet ipsum libero, et maximus erat convallis
          nec. Donec aliquam, urna vel ornare vehicula, ipsum enim
          porttitor neque, id ultricies lectus erat et lorem.
        </p>
      </div>
    </section>
  );
}
