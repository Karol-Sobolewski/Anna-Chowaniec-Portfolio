import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Children.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <h2>Children</h2>
    <main>{children}</main>
  </div>
);

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
  Component as Children,
  // Container as Children,
  Component as ChildrenComponent,
};
