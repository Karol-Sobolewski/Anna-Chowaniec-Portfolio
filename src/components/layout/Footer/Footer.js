import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  console.log(`sth`);
  return (
    <footer className={clsx(className, styles.root)}>
      <Container>
        <Row className="">
          <Col
            md={4}
            className="col-6 d-flex align-items-center justify-content-center p-3"
          >
            <a href="mailto:name@email.com">
              <p>kontakt@ac.pl</p>
            </a>
          </Col>
          <Col md={4} className="col-6">
            <a href="tel:+48123456789">
              <div className="d-flex align-items-center justify-content-center p-3">
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  className={`${styles.footerIcon} pr-1`}
                />
                <p className="pl-1">+48123456789</p>
              </div>
            </a>
          </Col>
          <Col
            md={4}
            className="col-12 d-flex align-items-center justify-content-center p-3"
          >
            <a href="https://www.instagram.com/" className="pr-2">
              <FontAwesomeIcon
                icon={faInstagram}
                className={styles.footerIcon}
              />
            </a>
            <a href="https://www.facebook.com/" className="pl-2">
              <FontAwesomeIcon
                icon={faFacebook}
                className={styles.footerIcon}
              />
            </a>
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </footer>
  );
};

// const mapStateToProps = (state) => ({
//   someProp: reduxSelector(state);
// })

// const mapDispatchToProps = (dispatch) => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),

//   const container = connect(mapStateToProps, mapStateToProps)(Component);
// })

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
