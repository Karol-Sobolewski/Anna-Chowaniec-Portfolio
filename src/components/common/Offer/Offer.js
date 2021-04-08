import React, { useState, useCallback } from 'react';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { OfferModal } from '../OfferModal/OfferModal';
import { Button } from '../Button/Button';
import styles from './Offer.module.scss';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, offer }) => {
  const [edit, setEdit] = useState(false);

  const { isAuthenticated } = useAuth0();

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
  const openModal = useCallback((data) => { //eslint-disable-line
    setModalData(data);
    showModal();
    document.body.style.overflow = `hidden`;
  });

  return (
    <div className={clsx(className, styles.root)}>
      {isAuthenticated ? (
        <div className={styles.editButtons}>
          <Button
            className={styles.editCategoryButton}
            onClick={() => setEdit(!edit)}
            edit={edit}
            icon="pencil"
            // auth={auth}
          />
          <Button
            // onClick={() => handleDelete(photo)}
            icon="delete"
            // auth={auth}
            className={styles.deletePhotoButton}
          />
        </div>
      ) : null}
      <button
        type="button"
        className={styles.offerBox}
        onClick={() => openModal(offer._id)}
        key={offer._id}
      >
        <div className={styles.offerDescription}>
          <h4>{offer.description}</h4>
          <img src={offer.image.src} alt={offer.image.alt} />
        </div>
      </button>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  offer: PropTypes.object,
};

export { Component as Offer, Component as OfferComponent };
