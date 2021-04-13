import React, { useEffect } from 'react';
import { Ring } from 'react-spinners-css';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Loader.module.scss';

const Component = ({ className }) => {
  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => (document.body.style.overflow = `unset`);
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <Ring color="#3d4447" />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as Loader, Component as LoaderComponent };
