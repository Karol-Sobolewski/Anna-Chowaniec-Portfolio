import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import Carousel, { Modal, ModalGateway } from 'react-images';
import ImageGallery from 'react-image-gallery';
import { Container, Row, Col } from 'react-bootstrap';
import {
  editPhotoRequest,
  fetchPhotos,
  removePhotoRequest,
} from '../../../redux/photoRedux';
import styles from './Photo.module.scss';
import { Button } from '../Button/Button';

import { userContext } from '../../../userContext';

const removeDiacritics = require(`diacritics`).remove;
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ index, onClick, photo, photos, className }) => {
  const [currentImage, setCurrentImage] = useState(``);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(photo);

  const dispatch = useDispatch();

  const { auth } = useContext(userContext);
  // const allPhotos = useSelector((state) => state.photos.data);
  // const photos = allPhotos.filter(
  //   (ph) =>
  //     removeDiacritics(ph.category.name).toLowerCase() ===
  //     removeDiacritics(galleryName).toLowerCase()
  // );

  const openLightbox = useCallback((e) => {
    console.log(index);
    // console.log(index);
    // setCurrentImage(index);
    // setViewerIsOpen(true);
  }, []);

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
    await dispatch(editPhotoRequest(image));
    console.log(`edit`);
    // dispatch(fetchPhotos());
  };

  const handleDelete = (item) => {
    const confirm = window.confirm(`Chcesz usunąć zdjęcie?`);
    if (confirm) {
      dispatch(removePhotoRequest(item));
      // dispatch(fetchPhotos());
      console.log(`delete`);
    }
  };

  const handleClick = (e) => {
    // onClick(e, { photo, index });
    openLightbox();
  };
  // console.log(photos);

  useEffect(() => {
    // dispatch(fetchPhotos());
    // console.log(`photo`);
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.photoBox}>
        {auth ? (
          <Button
            className={styles.editPhotoButton}
            onClick={() => setEdit(!edit)}
            edit={edit}
            icon="pencil"
            auth={auth}
          />
        ) : null}
        {auth ? (
          <Button
            onClick={() => handleDelete(photo)}
            icon="delete"
            auth={auth}
            className={styles.deletePhotoButton}
          />
        ) : null}
        <img {...photo} onClick={handleClick} /> {/*eslint-disable-line*/}
        {edit ? (
          <form
            action="#"
            method="put"
            // onSubmit={(e) => handleSubmit(e)}
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
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  photo: PropTypes.object,
  photos: PropTypes.array,
  index: PropTypes.any,
  galleryName: PropTypes.string,
  onClick: PropTypes.func,
};

export { Component as Photo, Component as PhotoComponent };
