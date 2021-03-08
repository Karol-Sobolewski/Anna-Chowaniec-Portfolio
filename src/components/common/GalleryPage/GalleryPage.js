import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Gallery from 'react-photo-gallery';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Carousel, { Modal, ModalGateway } from 'react-images';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '../Button/Button';
import { Photo } from '../Photo/Photo';

import { userContext } from '../../../userContext';
import { fetchPhotos } from '../../../redux/photoRedux';

import styles from './GalleryPage.module.scss';
import { ImageUploadForm } from '../../features/ImageUploadForm/ImageUploadForm';

const removeDiacritics = require(`diacritics`).remove;

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, galleryName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const { auth } = useContext(userContext);

  const allPhotos = useSelector((state) => state.photos.data);
  const photos = allPhotos.filter(
    (photo) =>
      removeDiacritics(photo.category.name).toLowerCase() ===
      removeDiacritics(galleryName).toLowerCase()
  );
  const { category } = photos[0];

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setActive(false);
        }
      }

      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (active) {
      document.body.style.position = `fixed`;
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = ``;
      document.body.style.top = ``;
      window.scrollTo(0, parseInt(scrollY || 0) * -1);
    }
  });

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <Photo key={key} index={index} photo={photo} galleryName={galleryName} />
    ),
    []
  );

  return (
    <div className={clsx(className, styles.root)}>
      {auth ? (
        <Button
          onClick={() => setActive(!active)}
          edit={active}
          icon="plus"
          auth={auth}
          className={styles.addPhotoButton}
        />
      ) : null}
      <div
        className={active ? styles.addPhoto : styles.addPhoto__hidden}
        ref={wrapperRef}
      >
        {auth && active ? <ImageUploadForm category={category} /> : null}
      </div>
      <div className={styles.galleryContainer}>
        <Gallery
          photos={photos}
          onClick={openLightbox}
          renderImage={imageRenderer}
        />
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  galleryName: PropTypes.string,
};

export { Component as GalleryPage, Component as GalleryPageComponent };
