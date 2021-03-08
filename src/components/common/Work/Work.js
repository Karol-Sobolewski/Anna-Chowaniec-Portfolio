import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { OfferModal } from '../OfferModal/OfferModal';
import styles from './Work.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const workCategories = useSelector((state) => state.categories.data);

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
  const [showModal, hideModal] = useModal(
    () => (
      <ReactModal isOpen style={customStyles}>
        {/* <p>Hello, {modalData}</p> */}
        <OfferModal offerCategory={modalData} />
        <button
          type="button"
          className={styles.hideModalButton}
          onClick={hideModal}
        >
          <p>x</p>
        </button>
      </ReactModal>
    ),
    [modalData]
  );
  const openModal = useCallback((data) => {
    setModalData(data);
    showModal();
  });
  return (
    <div className={clsx(className, styles.root)}>
      <Container
        className={`${styles.container} d-flex flex-column justify-content-around align-items-center`}
      >
        {workCategories.map((item) => (
          <button
            type="button"
            className={styles.workPhoto}
            onClick={() => openModal(item._id)}
            key={item._id}
          >
            <img src={item.image.src} alt={item.image.alt} />
            <div className={styles.workDescription}>{item.description}</div>
          </button>
        ))}
        <main>{children}</main>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Work,
  // Container as Work,
  Component as WorkComponent,
};
