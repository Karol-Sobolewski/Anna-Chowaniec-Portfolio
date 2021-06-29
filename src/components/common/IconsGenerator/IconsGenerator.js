import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './IconsGenerator.module.scss';

const Component = ({
  className,
  children,
  iconName,
  iconsList,
  alternativeIcon,
  size,
}) => (
  <div className={clsx(className, styles.root)}>
    {(iconName === `` || iconsList[iconName]) === undefined ? (
      <FontAwesomeIcon icon={alternativeIcon} size={size} />
    ) : (
      <FontAwesomeIcon icon={iconsList[iconName]} size={`${size}x`} />
    )}
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconsList: PropTypes.object.isRequired,
  alternativeIcon: PropTypes.object.isRequired,
  size: PropTypes.number,
};

export { Component as IconsGenerator, Component as IconsGeneratorComponent };
