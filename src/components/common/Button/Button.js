import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
// import { useAuth0 } from '@auth0/auth0-react';
import styles from './Button.module.scss';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, type, name, ...otherProps }) => {
  console.log(`Button`);
  // const dispatch = useDispatch();
  // const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    // dispatch(actionName(`whatToDispatch`));
  }, []);
  return (
    <button type={type} className={clsx(className, styles.root)} {...otherProps}> {/* eslint-disable-line */}
      {name}
    </button>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  fnc: PropTypes.func,
};

export { Component as Button, Component as ButtonComponent };
