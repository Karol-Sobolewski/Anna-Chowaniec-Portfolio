import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Photos.module.scss';
import { GalleryPage } from '../GalleryPage/GalleryPage';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
const removeDiacritics = require(`diacritics`).remove;
const Component = ({ className, children, galleryName }) => {
  const allPhotos = useSelector((state) => state.photos.data);

  const photos = allPhotos.filter((photo) =>
    photo.category.name
      ? removeDiacritics(photo.category.name).toLowerCase() ===
        removeDiacritics(galleryName).toLowerCase()
      : null
  );

  const [items, setItems] = useState(photos);

  useEffect(() => {
    console.log(`photos`);
    // setItems(photos);
  }, [photos]);

  return (
    <div className={clsx(className, styles.root)}>
      <GalleryPage photos={photos} category={photos[0].category} />
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  galleryName: PropTypes.string,
};

export { Component as Photos, Component as PhotosComponent };
