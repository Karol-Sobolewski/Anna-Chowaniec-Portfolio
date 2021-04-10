import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { Slider } from '../../features/Slider/Slider';
import { About } from '../../features/About/About';
import styles from './HomePage.module.scss';

const Component = ({ className }) => {
  // const { user } = useAuth0();
  // console.log(`auth`, auth);
  useAuth0();

  return (
    <div className={clsx(className, styles.root)}>
      <Slider />
      {/* {user ? <p>logged</p> : <p>not logged</p>} */}
      <About />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as HomePage,
  // Container as MainLayout,
  Component as HomePageComponent,
};
