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
import styles from './Photo.module.scss';
import { Button } from '../Button/Button';

import { userContext } from '../../../userContext';

const removeDiacritics = require(`diacritics`).remove;
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({
  className,
  children,
  /* eslint-disable */
  index,
  photo,
  margin,
  direction,
  top,
  left,
  selected,
  galleryName
    /* eslint-enable */
}) => {
  const [currentImage, setCurrentImage] = useState(``);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const { auth } = useContext(userContext);
  const allPhotos = useSelector((state) => state.photos.data);
  const photos = allPhotos.filter(
    (ph) =>
      removeDiacritics(ph.category.name).toLowerCase() ===
      removeDiacritics(galleryName).toLowerCase()
  );

  const openLightbox = useCallback((e) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Chcesz usunąć zdjęcie?`);
    if (confirm) {
      console.log(`delete`);
    }
  };

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
            onClick={() => handleDelete()}
            // edit={active}
            icon="delete"
            auth={auth}
            className={styles.deletePhotoButton}
          />
        ) : null}
        <img alt={photo.title} {...photo} onClick={openLightbox} /> {/*eslint-disable-line*/}
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
};

export { Component as Photo, Component as PhotoComponent };
