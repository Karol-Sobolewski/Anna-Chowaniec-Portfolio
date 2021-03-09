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

import arrayMove from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

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

const SortablePhoto = SortableElement((item, index) => {
  console.log(`item`, item, `index`, index);
    return (<Photo {...item} />) //eslint-disable-line
});

const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => {
      console.log(props);
      return (
        <SortablePhoto {...props} index={props.index} /> //eslint-disable-line
      );
    }}
  />
));

const Component = ({ className, children, galleryName }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const { auth } = useContext(userContext);

  const allPhotos = useSelector((state) => state.photos.data);
  const photos = allPhotos.filter((photo) =>
    photo.category.name
      ? removeDiacritics(photo.category.name).toLowerCase() ===
        removeDiacritics(galleryName).toLowerCase()
      : null
  );
  const { category } = photos[0];

  const [items, setItems] = useState(photos);
  // console.log(photos);

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
    console.log(`items`);
    // setItems(photos);
  });

  const imageRenderer = useCallback(
    ({ index, key, photo }) => (
      <Photo
        key={key}
        index={index}
        photo={photo}
        photos={photos}
        galleryName={galleryName}
      />
    ),
    []
  );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
    console.log(`end`);
  };
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
        <SortableGallery
          items={items}
          onSortEnd={onSortEnd}
          axis="xy"
          pressDelay={200}
          // index={1}
        />
        {/* <Gallery photos={photos} renderImage={imageRenderer} /> */}
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
