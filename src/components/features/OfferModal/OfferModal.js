import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { gsap } from 'gsap';

import { Row, Col } from 'react-bootstrap';
import { AddOfferForm } from '../AddOfferForm/AddOfferForm';
import { Button } from '../../common/Button/Button';
import styles from './OfferModal.module.scss';
import { Offer } from '../../common/Offer/Offer';

const Component = ({ className, children, offerCategory }) => {
  const allOffers = useSelector((state) => state.offers.data);
  const offers = allOffers.filter(
    (offer) => offer.category?._id === offerCategory
  );
  const [active, setActive] = useState(false);

  const { isAuthenticated } = useAuth0();

  const offerRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      const offerElements = offerRef.current.childNodes;
      for (const offerElement of offerElements) {
        gsap.set(offerElement, {
          autoAlpha: 0,
          x: `-50%`,
        });
        const timelineOffer = gsap.timeline({
          duration: 0.5,
          defaults: {
            ease: `Power3.easeOut`,
          },
        });
        timelineOffer.fromTo(
          offerElements,
          { x: `-50%` },
          { autoAlpha: 1, x: 0, stagger: 0.2 }
        );
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.offerRow} ref={offerRef}>
        {offers.map((item) => (
          <Col
            key={item._id}
            className={`col-12 col-md-5 mt-3 col-xl-4 ${styles.offerColumn}`}
          >
            <Offer offer={item} key={item._id} />
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
