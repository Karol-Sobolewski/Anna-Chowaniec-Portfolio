import React from 'react';
import PropTypes from 'prop-types';
import styles from './Section.module.scss';

const Section = ({ children }) => (
  <section className={styles.component}>{children}</section>
);

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;
