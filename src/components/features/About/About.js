import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './About.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const About = useSelector((state) => state.About);
  console.log(About);
  return (
    <div className={clsx(className, styles.root)}>
      <Container
        fluid
        className={`${styles.container} d-flex flex-column justify-content-center`}
      >
        <Row className="row-cols-1 row-cols-md-4 justify-content-around">
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center mb-3 mb-lg-0"
          >
            <div className={styles.aboutImage}>
              <img src={About.image.src} alt={About.image.title} />
            </div>
          </Col>
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center mt-3 mt-lg-0"
          >
            <h2>{About.description}</h2>
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
