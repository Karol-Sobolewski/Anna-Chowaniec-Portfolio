import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Redirect } from 'react-router';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './NotFound.module.scss';

const Component = ({ className, children }) => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const timeOut = setTimeout(() => setRedirect(true), 5000);
    return () => clearTimeout(timeOut);
  });
  return (
    <div className={clsx(className, styles.root)}>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <Row>
            <Col>
              <div>
                <h2>404 - Nieznana strona</h2>
                <p>Za 5 sekund nastąpi przekierowanie stronę główną</p>
                <a href="/">Kliknij aby przejśc od razu</a>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <main>{children}</main>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as NotFound, Component as NotFoundComponent };
