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
    const error = '';

    switch (inputId) {
      case 'email':
        regX = /\S+@\S+\.\S+/;
        break;
      case 'message':
        regX = /([a-zA-Z0-9]){10,}/;
        break;
    }

    return regX?.test(inputVal);
  }

  function handleInputChange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setInputValues((prev) => ({ ...prev, [target.id]: target.value }));
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
            if (!validate(key, inputValues[key])) {
              setInputErrors((prev) => {
                switch (key) {
                  case 'email':
                    return {
                      ...prev,
                      email: 'Please enter a valid email address'
                    };
                  case 'message':
                    return {
                      ...prev,
                      message:
                        'The message should be at least 10 characters'
                    };
                }
              });
            }
          }
        }}
      >
        <div className={styles.grid}>
          <label htmlFor="email">Email</label>
          <label htmlFor="message">Your message</label>
          <input
            type="text"
            id="email"
            value={inputValues.email}
            onChange={handleInputChange}
          />
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
