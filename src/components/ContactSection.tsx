import React, { SyntheticEvent, useState, useRef } from 'react';
import styles from '../styles/ContactSection.module.scss';
import { SectionProps } from '../types/interfaces';
import SectionHeader from './SectionHeader';
import emailjs from '@emailjs/browser';

interface Inputs {
  email: string;
  message: string;
}

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

  const form = useRef<HTMLFormElement>(null);

  function validate(inputId: string, inputVal: string) {
    let valid;

    switch (inputId) {
      case 'email': {
        const regX = /\S+@\S+\.\S+/;
        valid = regX.test(inputVal);
        break;
      }
      case 'message':
        valid = inputVal.trim().length >= 10;
        break;
    }

    let errorMsg = '';
    if (!valid) {
      errorMsg =
        inputId === 'email'
          ? 'Please enter a valid email address'
          : 'The message should be at least 10 characters';
      setInputErrors((prev) => {
        return { ...prev, [inputId]: errorMsg };
      });
    } else {
      setInputErrors((prev) => ({ ...prev, [inputId]: '' }));
    }

    return errorMsg;
  }

  function handleInputChange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const targetId = target.id as keyof typeof inputValues;
    setInputValues((prev) => ({ ...prev, [targetId]: target.value }));
    if (inputErrors[targetId]) validate(target.id, target.value);
  }

  function handleInputBlur(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    validate(target.id, target.value);
  }

  return (
    <section className={styles.main}>
      <SectionHeader title={title} number={sectionNumber} />
      <form
        ref={form}
        className={styles.form}
        onSubmit={async (e: SyntheticEvent) => {
          e.preventDefault();

          let key: keyof typeof inputValues;
          const inputErrors: { [key in keyof Inputs]: string } = {
            email: '',
            message: ''
          };

          for (key in inputValues) {
            const errorMsg = validate(key, inputValues[key]);
            inputErrors[key] = errorMsg;
          }

          if (Object.values(inputErrors).some((val) => !!val)) return;

          try {
            console.log(
              process.env.EMAILJS_SERVICEID,
              process.env.EMAILJS_PUBLICKEY
            );
            await emailjs.sendForm(
              process.env.EMAILJS_SERVICEID as string,
              'template_ccjsl6k',
              form.current as HTMLFormElement,
              process.env.EMAILJS_PUBLICKEY as string
            );
            console.log('success');
          } catch (err) {
            console.log(err);
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
              name="user_email"
              value={inputValues.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            <p className={styles.error_msg}>{inputErrors.email}</p>
          </div>
          <div className={styles.input_wrapper}>
            <textarea
              id="message"
              name="message"
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
