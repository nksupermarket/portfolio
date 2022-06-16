import React, { SyntheticEvent, useState } from 'react';
import styles from '../styles/ContactSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';

export default function ContactSection({
  title,
  sectionNumber
}: SectionProps) {
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleInputChange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setInputValues((prev) => ({ ...prev, [target.id]: target.value }));
  }
  return (
    <section className={styles.main}>
      <SectionHeader title={title} number={sectionNumber} />
      <form>
        <div className={styles.form_field}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form_field}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={inputValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form_field}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            value={inputValues.message}
            onChange={handleInputChange}
          />
        </div>
        <button>Send email</button>
      </form>
    </section>
  );
}
