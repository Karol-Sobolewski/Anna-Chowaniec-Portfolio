import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faTimes,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Button.module.scss';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({
  className,
  type,
  name,
  editSlider,
  editAbout,
  edit,
  auth,
  icon,
  ...otherProps
}) => {
  // const dispatch = useDispatch();
  // const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    // dispatch(actionName(`whatToDispatch`));
  }, []);

  const { isAuthenticated } = useAuth0();

  return (
    <button type={type} className={clsx(className, styles.root)} {...otherProps}> {/* eslint-disable-line */}
      {name}
      {isAuthenticated && !edit && icon === `pencil` ? (
        <FontAwesomeIcon icon={faPencilAlt} />
      ) : null}
      {isAuthenticated && !edit && icon === `plus` ? (
        <FontAwesomeIcon icon={faPlus} />
      ) : null}
      {isAuthenticated && icon === `delete` ? (
        <FontAwesomeIcon icon={faTrash} />
      ) : null}
      {isAuthenticated && edit ? <FontAwesomeIcon icon={faTimes} /> : null}
    </button>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  fnc: PropTypes.func,
  editSlider: PropTypes.bool,
  editAbout: PropTypes.bool,
  edit: PropTypes.bool,
  auth: PropTypes.bool,
  icon: PropTypes.string,
};

export { Component as Button, Component as ButtonComponent };
