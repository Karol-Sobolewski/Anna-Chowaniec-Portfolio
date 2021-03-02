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
  const { isAuthenticated } = useAuth0();
  const { auth, SetAuth } = useContext(userContext);
  const { logout } = useAuth0();
  useEffect(() => {
    // dispatch(actionName(`whatToDispatch`));
    console.log(auth);
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      {auth ? (
        <Container>
          <Row>
            <Col>
              <p>Dodaj zdjęcie</p>
              <ImageUploadForm />
              <Button
                type="button"
                name="Login"
                // onClick={() => loginWithRedirect()}
              />
              <Button type="button" name="Logout" onClick={() => logout()} />
            </Col>
          </Row>
          <main>{children}</main>
        </Container>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Dashboard, Component as DashboardComponent };
