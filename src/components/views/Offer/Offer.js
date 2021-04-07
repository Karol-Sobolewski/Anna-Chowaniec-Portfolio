import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { OfferModal } from '../../common/OfferModal/OfferModal';
import { AddOfferForm } from '../../features/AddOfferForm/AddOfferForm';
import { Button } from '../../common/Button/Button';
import { fetchOffers } from '../../../redux/offerRedux';
import styles from './Offer.module.scss';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  console.log(`Offer`);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(fetchOffers());
  }, []);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const offerCategories = useSelector((state) => state.categories.data);

  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: `rgba(0, 0, 0, 0.2)` },
    content: {
      borderRadius: `20px`,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      backgroundColor: `#EDF7F6`,
    },
  };

  const [modalData, setModalData] = useState(null);
  const [showModal, hideModal] = useModal(() => {
    const closeModal = () => {
      document.body.style.overflow = `unset`;
      hideModal();
    };

    return (
      <ReactModal isOpen style={customStyles}>
        <OfferModal offerCategory={modalData} />
        <button
          type="button"
          className={styles.hideModalButton}
          onClick={closeModal}
        >
          <p>x</p>
        </button>
      </ReactModal>
    );
  }, [modalData]);
  const openModal = useCallback((data) => {
    setModalData(data);
    showModal();
    document.body.style.overflow = `hidden`;
  });

  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.offerRow}>
        {offerCategories.map((item) => (
          <Col className="col-12 col-md-6 mt-3 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className={styles.offerBox}
              onClick={() => openModal(item._id)}
              key={item._id}
            >
              <div className={styles.offerDescription}>
                <h4>{item.description}</h4>
                <img src={item.image.src} alt={item.image.alt} />
              </div>
            </button>
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
            {isAuthenticated && active ? <AddOfferForm /> : null}
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

export { Component as Offer, Component as OfferComponent };
