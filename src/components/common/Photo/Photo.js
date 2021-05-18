import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import Carousel, { Modal, ModalGateway } from 'react-images';
import {
  editPhotoRequest,
  fetchPhotos,
  removePhotoRequest,
} from '../../../redux/photoRedux';
import styles from './Photo.module.scss';
import { Button } from '../Button/Button';
import { Popup } from '../Popup/Popup';

const Component = ({ photo, photos, className }) => {
  const [currentImage, setCurrentImage] = useState(``);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(photo);
  const [popup, setPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [remove, setRemove] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const openLightbox = useCallback(() => {
    const selected = photos.findIndex((i) => i._id === photo._id);
    setCurrentImage(selected);
    setViewerIsOpen(true);
  }, [photo._id, photos]);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleChange = async (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setImage({ ...photo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    await dispatch(editPhotoRequest(image, token));
    dispatch(fetchPhotos());
  };

  const handleDeleteClick = async (item) => {
    setPopup(true);
    setRemove(item);
  };

  const handleDelete = async (item) => {
    const token = await getAccessTokenSilently();
    await dispatch(removePhotoRequest(item, token));
    await dispatch(fetchPhotos());
    window.location.reload(false);
  };

  const handleClick = () => {
    openLightbox();
  };

  useEffect(() => {
    if (confirm) {
      handleDelete(remove);
    }
  }, [confirm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.photoBox}>
        {isAuthenticated ? (
          <Button
            className={styles.editPhotoButton}
            onClick={() => setEdit(!edit)}
            edit={edit}
            icon="pencil"
          />
        ) : null}
        {isAuthenticated ? (
          <Button
            onClick={() => handleDeleteClick(photo)}
            icon="delete"
            className={styles.deletePhotoButton}
          />
        ) : null}
        <img src={photo.src} alt={photo.title} height={photo.height} width={photo.width} onClick={handleClick} /> {/*eslint-disable-line*/}
        {edit ? (
          <form
            action="#"
            method="put"
            onChange={(e) => handleChange(e)}
            className={styles.editPhotoForm}
          >
            <input
              name="title"
              type="text"
              placeholder="Nazwa zdjęcia"
              defaultValue={photo.title}
            />
            <Button
              type="submit"
              name="Wyślij"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        ) : null}
      </div>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((item) => ({
                ...item,
                srcset: item.srcSet,
                caption: item.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <Popup visible={popup} setVisible={setPopup} verifyConfirm={setConfirm}>
        <p>Chcesz usunąć to zdjęcie?</p>
      </Popup>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  photo: PropTypes.object,
  photos: PropTypes.array,
};

export { Component as Photo, Component as PhotoComponent };
