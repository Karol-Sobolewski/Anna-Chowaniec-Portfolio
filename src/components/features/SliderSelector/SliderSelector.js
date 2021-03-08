import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SliderSelector.module.scss';

import { editPhotoRequest } from '../../../redux/photoRedux';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const dispatch = useDispatch();

  const allPhotos = useSelector((state) => state.photos.data);

  const sliderChooserPhotos = allPhotos.filter(
    (item) => item.width > item.height
  );
  // console.log(allPhotos);
  const [image, setImage] = useState(null);

  const handleImageChooser = (img) => {
    setImage({ ...img, slider: !img.slider });
  };

  useEffect(() => {
    console.log(image);
    const handleSubmit = () => {
      dispatch(editPhotoRequest(image));
    };
    handleSubmit();
  }, [image]);
  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.photoPick}>
        {sliderChooserPhotos.map((img) => (
          <button
            type="button"
            className={
              img.slider ? styles.photoSlide__chosen : styles.photoSlide
            }
            onClick={() => handleImageChooser(img)}
            key={img.id}
          >
            <div className={img.slider ? styles.icon__chosen : styles.icon}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <img src={img.src} alt="im.src" />
          </button>
        ))}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as SliderSelector, Component as SliderSelectorComponent };
