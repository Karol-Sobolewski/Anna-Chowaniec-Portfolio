import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Photos.module.scss';
import { GalleryPage } from '../GalleryPage/GalleryPage';

const removeDiacritics = require(`diacritics`).remove;

const Component = ({ className, galleryName }) => {
  const allPhotos = useSelector((state) => state.photos.data);
  const categories = useSelector((state) => state.categories.data);

  const photos = allPhotos.filter((photo) =>
    photo.category && photo.category.name !== undefined
      ? removeDiacritics(photo.category.name).toLowerCase() ===
        removeDiacritics(galleryName).toLowerCase()
      : null
  );

  const category = categories.filter((cat) =>
    cat.name
      ? removeDiacritics(cat.name).toLowerCase() ===
        removeDiacritics(galleryName).toLowerCase()
      : null
  );

  return (
    <div className={clsx(className, styles.root)}>
      <GalleryPage photos={photos} category={category[0]} />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  galleryName: PropTypes.string,
};

export { Component as Photos, Component as PhotosComponent };
