import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { Slider } from '../../features/Slider/Slider';
import { About } from '../../features/About/About';
import styles from './HomePage.module.scss';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <Slider />
    <About />
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as HomePage,
  // Container as MainLayout,
  Component as HomePageComponent,
};
