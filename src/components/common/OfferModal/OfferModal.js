import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './OfferModal.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, offerCategory }) => {
  console.log(`OfferModal`);
  // const dispatch = useDispatch();
  const allOffers = useSelector((state) => state.offers.data);
  const offers = allOffers.filter(
    (offer) => offer.category._id === offerCategory // eslint-disable-line
  );

  console.log(`offerCategory`, offers);
  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.offerRow}>
        {offers.map((item) => (
          <Col
            key={item.id}
            className={`col-12 col-md-5 col-xl-3 ${styles.offerColumn}`}
          >
            <h2>{item.name}</h2>
            {item.descriptions.map((description) => (
              <p>{description.text}</p>
            ))}
            <h3>{item.price} ZŁ</h3>
          </Col>
        ))}
      </Row>
      <main>{children}</main>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  offerCategory: PropTypes.string,
};

export { Component as OfferModal, Component as OfferModalComponent };
