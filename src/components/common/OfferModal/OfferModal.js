import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './OfferModal.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, offerCategory }) => {
  // console.log(`OfferModal`);
  // const dispatch = useDispatch();
  const allOffers = useSelector((state) => state.offers.data);
  const offers = allOffers.filter(
    (offer) => offer.category._id === offerCategory // eslint-disable-line
  );

  // console.log(`offerCategory`, offers);
  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.offerRow}>
        {offers.map((item) => (
          <Col
            key={item.id}
            className={`col-12 col-md-5 mt-3 col-xl-3 ${styles.offerColumn}`}
          >
            <div className={styles.offerTitle}>
              <h3> {item.name}</h3>
            </div>
            <ul className={styles.offerDescription}>
              {item.descriptions.map((description) => (
                <li>{description.text}</li>
              ))}
            </ul>
            <h4 className={styles.offerPrice}>{item.price} ZŁ</h4>
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
