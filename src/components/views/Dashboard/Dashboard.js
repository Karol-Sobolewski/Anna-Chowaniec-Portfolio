import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';

import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';

import styles from './Dashboard.module.scss';

import { userContext } from '../../../userContext';
import { ImageUploadForm } from '../../features/ImageUploadForm/ImageUploadForm';
import { Button } from '../../common/Button/Button';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  console.log(`Dashboard`);
  // const dispatch = useDispatch();
  const { isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
  // const { auth, SetAuth } = useContext(userContext);

  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      const timeOut = setTimeout(() => setAuth(true), 1);
      return () => clearTimeout(timeOut);
    }
  });

  useEffect(() => {});

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return auth ? <Redirect to="/" /> : null;
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Dashboard, Component as DashboardComponent };
