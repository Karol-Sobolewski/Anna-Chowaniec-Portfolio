import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { OfferModal } from '../OfferModal/OfferModal';
import { Button } from '../Button/Button';
import styles from './Offer.module.scss';
import { SliderSelector } from '../SliderSelector/SliderSelector';
import { editCategoryRequest } from '../../../redux/categoryRedux';

const removeDiacritics = require(`diacritics`).remove;

const Component = ({ className, offer }) => {
  const dispatch = useDispatch();

  const allPhotos = useSelector((state) => state.photos.data);
  const photos = allPhotos.filter((photo) =>
    photo.category.name
      ? removeDiacritics(photo.category.name).toLowerCase() ===
        removeDiacritics(offer.name).toLowerCase()
      : null
  );
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [category, setCategory] = useState({
    _id: offer._id,
    description: offer.description,
    image: {
      src: offer.image.src,
      alt: offer.image.alt,
    },
  });

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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

  const [showModal, hideModal] = useModal(() => {
    const closeModal = () => {
      document.body.style.overflow = `unset`;
      hideModal();
    };

    return (
      <ReactModal isOpen style={customStyles} ariaHideApp={false}>
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

  const handleChange = async (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await dispatch(editCategoryRequest(category, token));
  };

  const handleChangePhoto = (img) => {
    setCategory({
      ...category,
      image: {
        src: img.src,
        alt: img.title,
      },
    });
  };

  return (
    <div className={clsx(className, styles.root)}>
      {isAuthenticated ? (
        <Button
          className={styles.editCategoryButton}
          onClick={() => setEdit(!edit)}
          edit={edit}
          icon="pencil"
        />
      ) : null}
      {isAuthenticated ? (
        <Button
          // onClick={() => handleDelete(photo)}
          icon="delete"
          className={styles.deletePhotoButton}
        />
      ) : null}
      {edit ? (
        <div className="d-flex justify-content-center">
          <div className={styles.editOfferForm}>
            <form action="#" method="put" onChange={(e) => handleChange(e)}>
              <input
                name="description"
                type="text"
                placeholder="Tytuł"
                defaultValue={offer.description}
              />
              <img src={offer.image.src} alt={offer.image.alt} />
              <Button
                type="submit"
                name="Wyślij"
                className={styles.submitButton}
                onClick={(e) => handleSubmit(e)}
              />
            </form>
          </div>
          <SliderSelector photos={photos} onChangeValue={handleChangePhoto} />
        </div>
      ) : (
        <button
          type="button"
          className={styles.offerBox}
          onClick={() => openModal(offer._id)}
          key={offer._id}
        >
          <div className={styles.offerDescription}>
            <div>
              <h4>{offer.description}</h4>
              <img src={offer.image.src} alt={offer.image.alt} />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  offer: PropTypes.object,
};

export { Component as Offer, Component as OfferComponent };
