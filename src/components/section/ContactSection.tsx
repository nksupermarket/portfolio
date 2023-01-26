import React, { SyntheticEvent, useState, useRef } from 'react';
import { useSpringRef, useChain } from 'react-spring';
import styles from '../../styles/ContactSection.module.scss';
import { SectionProps } from '../../types/interfaces';
import SectionHeader from '../SectionHeader';
import emailjs from '@emailjs/browser';
import useIntersectionObserver from '../../utils/useIntersectionObserver';

import checkSvg from '../../assets/icons/check-line.svg';
import closeSvg from '../../assets/icons/close-line.svg';
import Slide from '../Animations/Slide';

interface Inputs {
  email: string;
  message: string;
}

const defaultInputVals = {
  email: '',
  message: ''
};

export default function ContactSection({
  title,
  sectionNumber
}: SectionProps) {
  const [inputValues, setInputValues] = useState(defaultInputVals);

  const [inputErrors, setInputErrors] = useState({
    email: '',
    message: ''
  });

  const [sendStatus, setSendStatus] = useState<'error' | 'success' | ''>(
    ''
  );

  const [loading, setLoading] = useState(false);

  const form = useRef<HTMLFormElement>(null);

  const triggerRef = useRef<HTMLElement>(null);

  const ioData = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
    threshold: 0.1
  });

  const visible = ioData?.isIntersecting || false;

  const headerAnimeRef = useSpringRef();
  const formAnimeRef = useSpringRef();

  useChain(visible ? [headerAnimeRef, formAnimeRef] : [], [0, 0.5]);

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
    <section
      className={styles.main + ' ' + 'main_section'}
      ref={triggerRef}
    >
      <SectionHeader
        title={title}
        number={sectionNumber}
        animationRef={headerAnimeRef}
        visible={visible}
      />
      <Slide
        start={{ transform: 'translateX(-10vw)', opacity: '0' }}
        end={{
          transform: 'translate(0)',
          opacity: '1'
        }}
        animationRef={formAnimeRef}
      >
        <>
          <form
            ref={form}
            className={styles.form}
            onSubmit={async (e: SyntheticEvent) => {
              e.preventDefault();

              if (loading) return;

              let key: keyof typeof inputValues;
              // eslint-disable-next-line
              const inputErrors: { [key in keyof Inputs]: string } = {
                email: '',
                message: ''
              };

              for (key in inputValues) {
                const errorMsg = validate(key, inputValues[key]);
                inputErrors[key] = errorMsg;
              }

              if (Object.values(inputErrors).some((val) => !!val)) return;

              setLoading(true);

              try {
                await emailjs.sendForm(
                  process.env.REACT_APP_EMAILJS_SERVICEID as string,
                  'template_ccjsl6k',
                  form.current as HTMLFormElement,
                  process.env.REACT_APP_EMAILJS_PUBLICKEY as string
                );
                setLoading(false);
                setInputValues(defaultInputVals);
                setSendStatus('success');
              } catch (err) {
                setLoading(false);
                setSendStatus('error');
              }

              setTimeout(() => setSendStatus(''), 3000);
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
            <button className={loading ? 'loading' : ''}>
              {loading ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                'Send email'
              )}
            </button>
          </form>
          {sendStatus && (
            <div className={`${styles[sendStatus]} ${styles.send_status}`}>
              <img src={sendStatus === 'success' ? checkSvg : closeSvg} />
              <p>
                {sendStatus === 'success'
                  ? "Success. We'll be in touch."
                  : 'Something went wrong. Try again.'}
              </p>
            </div>
          )}
        </>
      </Slide>
    </section>
  );
}
