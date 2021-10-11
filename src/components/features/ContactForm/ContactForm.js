import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import emailjs from 'emailjs-com';

import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container } from 'react-bootstrap';
import styles from './ContactForm.module.scss';

const Component = ({ className, children }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toastifySuccess = () => {
    toast(`Formularz wysłany!`, {
      autoClose: 2000,
      className: styles.submitFeedback,
      closeOnClick: true,
      draggable: false,
      hideProgressBar: true,
      pauseOnHover: true,
      position: `bottom-right`,
      toastId: `notifyToast`,
    });
  };

  const onSubmit = async (data) => {
    try {
      const templateParams = {
        name: data.name,
        mail: data.mail,
        subject: data.subject,
        message: data.message,
      };
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );
      reset();
      toastifySuccess();
    } catch (e) {
      console.log(`status:`, e);
    }
  };
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div className={clsx(className, styles.root)}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formCell}>
            <input
              type="text"
              placeholder="Imię"
              name="name"
              className={
                !errors.name ? styles.formInput : styles.formInput__error
              }
              {...register(`name`, { required: true, maxLength: 30 })}
            />
            {errors.name && (
              <span className={styles.errorMessage}>Proszę podać imię</span>
            )}
          </div>
          <div className={styles.formCell}>
            <input
              type="text"
              placeholder="Email"
              className={
                !errors.mail ? styles.formInput : styles.formInput__error
              }
              {...register(`mail`, {
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.mail && (
              <span className={styles.errorMessage}>
                Proszę podać adres mailowy
              </span>
            )}
          </div>
          <div className={styles.formCell}>
            <input
              type="text"
              placeholder="Tytuł"
              className={
                !errors.subject ? styles.formInput : styles.formInput__error
              }
              {...register(`subject`, { required: true })}
            />
            {errors.subject && (
              <span className={styles.errorMessage}>Proszę podać tytuł</span>
            )}
          </div>
          <div className={styles.formCell}>
            <textarea
              placeholder="Wiadomość"
              className={
                !errors.message ? styles.formInput : styles.formInput__error
              }
              {...register(`message`, {
                required: true,
                maxLength: 1000,
              })}
            />
            {errors.message && (
              <span className={styles.errorMessage}>
                Proszę podać treść wiadomości
              </span>
            )}
          </div>
          <input type="submit" className={styles.submitForm} />
        </form>
        <main>{children}</main>
      </Container>
      <ToastContainer />
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as ContactForm, Component as ContactFormComponent };
