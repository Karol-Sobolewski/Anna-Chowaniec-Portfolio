import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { OfferModal } from '../../common/OfferModal/OfferModal';
import { AddCategoryForm } from '../../features/AddCategoryForm/AddCategoryForm';

import { Button } from '../../common/Button/Button';
import { Offer } from '../../common/Offer/Offer';
import { fetchOffers } from '../../../redux/offerRedux';
import styles from './OfferPage.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [edit, setEdit] = useState(false);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const offerCategories = useSelector((state) => state.categories.data);

  useEffect(() => {
    dispatch(fetchOffers());
  }, []);

  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.offerRow}>
        {offerCategories.map((offer) => (
          <Col className="col-12 col-md-6 mt-3 d-flex justify-content-center align-items-center">
            <Offer offer={offer} key={offer._id} />
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
