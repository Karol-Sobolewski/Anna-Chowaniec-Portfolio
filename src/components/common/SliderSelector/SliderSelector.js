import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './SliderSelector.module.scss';

const Component = React.memo( //eslint-disable-line
  ({ className, photos, onChangeValue }) => {
    const sliderChooserPhotos = photos.filter(
      (item) => item.width > item.height
    );
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.photoPick}>
          {sliderChooserPhotos.map((img) => (
            <button
              type="button"
              className={
                img.chosenOfferPhoto
                  ? styles.photoSlide__chosen
                  : styles.photoSlide
              }
              onClick={() => onChangeValue(img)}
              key={img._id}
            >
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
};

export { Component as SliderSelector, Component as SliderSelectorComponent };
