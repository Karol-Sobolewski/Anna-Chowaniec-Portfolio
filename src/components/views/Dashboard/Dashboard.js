import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Dashboard.module.scss';
import { ImageUploadForm } from '../../features/ImageUploadForm/ImageUploadForm';
import { Button } from '../../common/Button/Button';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  console.log(`Dashboard`);
  // const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  useEffect(() => {
    // dispatch(actionName(`whatToDispatch`));
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row>
          <Col>
            <p>Dodaj zdjęcie</p>
            <ImageUploadForm />
            <Button
              type="button"
              name="Login"
              onClick={() => loginWithRedirect()}
            />
            <Button type="button" name="Logout" onClick={() => logout()} />
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Dashboard, Component as DashboardComponent };
