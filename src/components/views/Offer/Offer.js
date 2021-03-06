import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Row, Col } from 'react-bootstrap';
import { Work } from '../../common/Work/Work';

import { fetchOffers } from '../../../redux/offerRedux';
import styles from './Offer.module.scss';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  console.log(`Offer`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, []);

  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Work />
        <main>{children}</main>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Offer, Component as OfferComponent };
