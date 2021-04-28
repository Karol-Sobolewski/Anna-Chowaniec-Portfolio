import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Row, Col } from 'react-bootstrap';
import { AddOfferForm } from '../../features/AddOfferForm/AddOfferForm';
import { Button } from '../Button/Button';
import styles from './OfferModal.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, offerCategory }) => {
  // console.log(`OfferModal`);
  // const dispatch = useDispatch();
  const allOffers = useSelector((state) => state.offers.data);
  console.log(`offerCategory`, offerCategory);
  console.log(`allOffers`, allOffers);
  const offers = allOffers.filter(
    (offer) => offer.category?._id === offerCategory // eslint-disable-line
  );
  const [active, setActive] = useState(false);

  const { isAuthenticated } = useAuth0();
  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.offerRow}>
        {offers.map((item) => (
          <Col
            key={item._id}
            className={`col-12 col-md-5 mt-3 col-xl-4 ${styles.offerColumn}`}
          >
            <div className={styles.offerColumnInner}>
              <div className={styles.offerTitle}>
                <h3> {item.name}</h3>
              </div>
              <ul className={styles.offerDescription}>
                {item.descriptions.map((description) => (
                  <li key={item.descriptions.indexOf(description)}>
                    {description.text}
                  </li>
                ))}
              </ul>
              <h4 className={styles.offerPrice}>{item.price} ZŁ</h4>
            </div>
          </Col>
        ))}
        {isAuthenticated ? (
          <Col
            className={`col-12 col-md-5 mt-3 col-xl-4 ${styles.addOfferColumn}`}
          >
            <Button
              onClick={() => setActive(!active)}
              edit={active}
              icon="plus"
              className={
                active ? styles.addOfferButton__active : styles.addOfferButton
              }
            />
            {isAuthenticated && active ? (
              <AddOfferForm category={offerCategory} />
            ) : null}
          </Col>
        ) : null}
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
