import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { OfferModal } from '../OfferModal/OfferModal';
import { Button } from '../Button/Button';
import { PhotoSelector } from '../PhotoSelector/PhotoSelector';

import styles from './Offer.module.scss';
import { SliderSelector } from '../SliderSelector/SliderSelector';
import {
  editCategoryRequest,
  removeCategoryRequest,
} from '../../../redux/categoryRedux';
import { editMenuRequest, removeMenuRequest } from '../../../redux/menuRedux';

const removeDiacritics = require(`diacritics`).remove;

const Component = ({ className, offer }) => {
  const dispatch = useDispatch();
  const allPhotos = useSelector((state) => state.photos.data);
  const allMenus = useSelector((state) => state.menu.data);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [edit, setEdit] = useState(false);
  const [modalData, setModalData] = useState(null);

  const photos = allPhotos.filter((item) =>
    item.category
      ? removeDiacritics(item.category.name).toLowerCase() ===
        removeDiacritics(offer.name).toLowerCase()
      : null
  );

  const menu = allMenus.filter((item) =>
    item.shortName
      ? removeDiacritics(item.shortName).toLowerCase() ===
        removeDiacritics(offer.name).toLowerCase()
      : null
  )[0];

  const [category, setCategory] = useState({
    _id: offer._id,
    description: offer.description,
    image: {
      src: offer.image.src,
      alt: offer.image.alt,
    },
  });

  const [editedMenu, setMenu] = useState({
    _id: menu._id,
    name: menu.name,
  });

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
    setMenu({ ...editedMenu, name: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await dispatch(editCategoryRequest(category, token));
    await dispatch(editMenuRequest(editedMenu, token));
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

  const handlePhotosNumber = () => {
    if (photos.length === 0) return `zdjęć`;
    if (photos.length === 1) return `zdjęcie`;
    if (photos.length >= 2 && photos.length <= 4) return `zdjęcia`;
    if (photos.length >= 5) return `zdjęć`;
  };

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    const confirm = window.confirm(
      `Uwaga! Usuwając tę kategorię usuniesz również ${
        photos.length
      } ${handlePhotosNumber()}`
    );
    if (confirm) {
      await dispatch(removeCategoryRequest(category, token));
      await dispatch(removeMenuRequest(menu, token));
    }
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
          onClick={() => handleDelete()}
          icon="delete"
          className={styles.deletePhotoButton}
        />
      ) : null}
      {edit ? (
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
          <PhotoSelector
            photos={photos}
            onChangeValue={handleChangePhoto}
            checkedPhoto={category.image}
          />
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
