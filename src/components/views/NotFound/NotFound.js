import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './NotFound.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <Container>
      <Row>
        <Col>
          <div>
            <h2>404 - Nieznana strona</h2>
            <a href="/">Kliknij aby przejśc na stronę główną</a>
          </div>
        </Col>
      </Row>
    </Container>
    <main>{children}</main>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as NotFound, Component as NotFoundComponent };
