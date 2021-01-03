import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './About.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.descriptions.data);
  const aboutPage = allPages.filter((item) => item.page === `about`)[0];
  return (
    <div className={clsx(className, styles.root)}>
      <Container
        fluid
        className={`${styles.container} d-flex flex-column justify-content-center`}
      >
        <h2>{aboutPage.heading}</h2>
        <Row className="row-cols-1 row-cols-md-4 justify-content-around">
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center mb-3 mb-lg-0"
          >
            <div className={styles.aboutImage}>
              <img
                src={aboutPage.images[0].src}
                alt={aboutPage.images[0].title}
              />
            </div>
          </Col>
          <Col
            md={4}
            className="d-flex flex-column align-items-center justify-content-center mt-3 mt-lg-0"
          >
            <Row>
              <h3>{aboutPage.description[0].heading}</h3>
            </Row>
            <Row>
              <p>{aboutPage.description[0].text}</p>
            </Row>
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </div>
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
  Component as About,
  // Container as About,
  Component as AboutComponent,
};
