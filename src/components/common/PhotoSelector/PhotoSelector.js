import React from 'react';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './PhotoSelector.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = React.memo( //eslint-disable-line
  ({ className, photos, onChangeValue, checkIcon, checkedPhoto }) => {
    const sliderChooserPhotos = photos.filter(
      (item) => item.width > item.height
    );

    const choosenPhoto = photos.filter((item) =>
      checkedPhoto ? item.src === checkedPhoto.src : null
    )[0];

    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.photoPick}>
          {sliderChooserPhotos.map((img) => (
            <button
              type="button"
              className={
                choosenPhoto && choosenPhoto.src === img.src
                  ? styles.photoSlide__checked
                  : styles.photoSlide
              }
              onClick={() => onChangeValue(img)}
              key={img._id}
            >
              {checkIcon && img.slider ? (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={styles.icon__chosen}
                />
              ) : null}
              <img src={img.src} alt={img.alt} />
            </button>
          ))}
        </div>
      </div>
    );
  }
);

Component.propTypes = {
  className: PropTypes.string,
  photos: PropTypes.array,
  onChangeValue: PropTypes.func,
  checkIcon: PropTypes.bool,
  checkedPhoto: PropTypes.object,
};

export { Component as PhotoSelector, Component as PhotoSelectorComponent };
