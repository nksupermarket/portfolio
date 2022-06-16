import React, { SyntheticEvent, useState } from 'react';
import styles from '../styles/ContactSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';

export default function ContactSection({
  title,
  sectionNumber
}: SectionProps) {
  const [inputValues, setInputValues] = useState({
    email: '',
    message: ''
  });

  const [inputErrors, setInputErrors] = useState({
    email: '',
    message: ''
  });

  function validate(inputId: string, inputVal: string) {
    let regX;

    switch (inputId) {
      case 'email':
        regX = /\S+@\S+\.\S+/;
        break;
      case 'message':
        regX = /([a-zA-Z0-9]){10,}/;
        break;
    }

    const valid = regX?.test(inputVal);

    if (!valid) {
      const errorMsg =
        inputId === 'email'
          ? 'Please enter a valid email address'
          : 'The message should be at least 10 characters';
      setInputErrors((prev) => {
        return { ...prev, [inputId]: errorMsg };
      });
    } else {
      console.log('removing errors');
      setInputErrors((prev) => ({ ...prev, [inputId]: '' }));
    }
  }

  function handleInputChange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setInputValues((prev) => ({ ...prev, [target.id]: target.value }));
    validate(target.id, target.value);
  }

  function handleInputBlur(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    validate(target.id, target.value);
  }

  return (
    <section className={styles.main}>
      <SectionHeader title={title} number={sectionNumber} />
      <form
        className={styles.form}
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();

          let key: keyof typeof inputValues;
          for (key in inputValues) {
            validate(key, inputValues[key]);
          }

          if (Object.values(inputErrors).some((val) => !!val)) {
            //
          }
        }}
      >
        <div className={styles.grid}>
          <label htmlFor="email">Email</label>
          <label htmlFor="message">Your message</label>
          <div className={styles.input_wrapper}>
            <input
              type="text"
              id="email"
              value={inputValues.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <p className={styles.error_msg}>{inputErrors.email}</p>
          </div>
          <div className={styles.input_wrapper}>
            <textarea
              id="message"
              value={inputValues.message}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <p className={styles.error_msg}>{inputErrors.message}</p>
          </div>
        </div>
        <button>Send email</button>
      </form>
    </section>
  );
}
