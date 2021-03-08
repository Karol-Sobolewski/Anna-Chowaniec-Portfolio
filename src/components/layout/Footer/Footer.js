import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.descriptions.data);

  const footerPage = allPages.filter((item) => item.page === `contact`)[0];
  // console.log(footerPage);
  const footerPageLinks = footerPage.description.filter(
    (item) => item.type === `web`
  );
  console.log(footerPageLinks);
  return (
    <footer className={clsx(className, styles.root)}>
      <Container>
        <Row className="">
          {footerPage.description.slice(0, 2).map((item) => (
            <Col
              md={4}
              className="col-6 d-flex align-items-center justify-content-center p-3"
            >
              {/* eslint-disable */}
              {item.type === `mail` ? (
                <a href={`mailto:${item.value}`}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={`${styles.footerIcon} pr-1`}
                  />
                  {item.text}
                </a>
              ) : item.type === `phone` ? (
                <a href={`tel:${item.value}`}>
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className={`${styles.footerIcon} pr-1`}
                  />
                  {item.text}
                </a>
              ) : null}
              {/* eslint-enable */}
            </Col>
          ))}
          <Col
            md={4}
            className="col-12 d-flex align-items-center justify-content-center p-3"
          >
            {footerPageLinks.map((item) => (
              <a href={item.value} className="pr-2">
                {/* eslint-disable */}
                <FontAwesomeIcon
                  icon={
                    item.heading === `Instagram`
                      ? faInstagram
                      : item.heading === `Facebook`
                      ? faFacebook
                      : null
                    }
                    className={styles.footerIcon}
                    />
                {/* eslint-enable */}
              </a>
            ))}
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </footer>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Footer, Component as FooterComponent };
