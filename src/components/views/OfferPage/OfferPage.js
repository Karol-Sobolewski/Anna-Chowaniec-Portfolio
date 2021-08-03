import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { gsap } from 'gsap';

import { Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { AddCategoryForm } from '../../features/AddCategoryForm/AddCategoryForm';

import { Button } from '../../common/Button/Button';
import { Category } from '../../common/Category/Category';
import { fetchOffers } from '../../../redux/offerRedux';
import styles from './OfferPage.module.scss';

const Component = ({ className, children }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const { isAuthenticated } = useAuth0();
  const offerCategories = useSelector((state) => state.categories.data);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const categoryRef = useRef(null);

  useEffect(() => {
    const categoryElements = categoryRef.current.childNodes;
    for (const categoryElement of categoryElements) {
      gsap.set(categoryElement, {
        autoAlpha: 0,
        y: `25%`,
      });
      const timelineCategory = gsap.timeline({
        duration: 0.5,
        delay: 0.3,
        defaults: {
          ease: `Power3.easeOut`,
        },
      });
      timelineCategory.fromTo(
        categoryElements,
        { y: `25%` },
        { autoAlpha: 1, y: 0, stagger: 0.2 }
      );
    }
  }, []);

  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.offerRow} ref={categoryRef}>
        {offerCategories.map((offer) => (
          <Col
            key={offer._id}
            className="col-12 col-md-6 mt-3 d-flex justify-content-center align-items-center"
          >
            <Category offer={offer} key={offer._id} />
          </Col>
        ))}
        {isAuthenticated ? (
          <Col className="col-12 col-md-6 mt-3 d-flex justify-content-center align-items-center">
            <Button
              onClick={() => setActive(!active)}
              edit={active}
              icon="plus"
              className={
                active ? styles.addOfferButton__active : styles.addOfferButton
              }
            />
            {isAuthenticated && active ? <AddCategoryForm /> : null}
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
};

export { Component as OfferPage, Component as OfferPageComponent };
