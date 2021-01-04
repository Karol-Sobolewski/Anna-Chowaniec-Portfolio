import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Contact.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.descriptions.data);
  const contactPage = allPages.filter((item) => item.page === `contact`)[0];

  useEffect(() => {
    console.log(contactPage);
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        {contactPage.description.map((item) => (
          <Row>
            <Col>
              <h3>{item.heading}</h3>
            </Col>
            {/* eslint-disable */}
            <Col className="col-12 col-md-6 my-3">
              {item.type === `mail` ? (
                <a href={`mailto:${item.value}`}>{item.text}</a>
              ) : item.type === `phone` ? (
                <a href={`tel:${item.value}`}>{item.text}</a>
              ) : item.type === `web` ? (
                <a href={`${item.value}`}>{item.text}</a>
              ) : null}
            </Col>
            {/* eslint-enable */}
          </Row>
        ))}
        <main>{children}</main>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Contact, Component as ContactComponent };
