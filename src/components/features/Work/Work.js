import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Work.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  console.log(`sth`);
  return (
    <div className={clsx(className, styles.root)}>
      <Container
        className={`${styles.container} d-flex flex-column justify-content-around align-items-center`}
      >
        <Link to="/sluby" className={styles.workPhoto}>
          <img src="/images/photos/work/slub_14.jpg" alt="wedding" />
          <div className={styles.workDescription}>Fotografia Ślubna</div>
        </Link>
        <Link to="/dzieci" className={styles.workPhoto}>
          <img src="/images/photos/work/dzieci_17.jpg" alt="children" />
          <div className={styles.workDescription}>Fotografia Dziecięca</div>
        </Link>
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
  Component as Work,
  // Container as Work,
  Component as WorkComponent,
};
