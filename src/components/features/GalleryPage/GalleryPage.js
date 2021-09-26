import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Gallery from 'react-photo-gallery';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useAuth0 } from '@auth0/auth0-react';

import arrayMove from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Button } from '../../common/Button/Button';
import { Photo } from '../../common/Photo/Photo';
import { editPhotoRequest } from '../../../redux/photoRedux';

import styles from './GalleryPage.module.scss';
import { ImageUploadForm } from '../ImageUploadForm/ImageUploadForm';

const SortablePhoto = SortableElement(
  (item) => <Photo {...item} /> // eslint-disable-line react/jsx-props-no-spreading
);

const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => (
      <SortablePhoto {...props} photos={items} /> // eslint-disable-line react/jsx-props-no-spreading
    )}
  />
));

const Component = ({ className, photos, category }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { isAuthenticated } = useAuth0();
  const [items, setItems] = useState(photos);

  const { getAccessTokenSilently } = useAuth0();

  const editedItems = [];

  useEffect(() => {
    for (const item of items) {
      const index = items.findIndex((i) => i._id === item._id);
      item.order = index;
      editedItems.push(item);
    }
    const updatePhotos = async (editedItem) => {
      const token = await getAccessTokenSilently();
      dispatch(editPhotoRequest(editedItem, token));
    };
    if (JSON.stringify(editedItems) !== JSON.stringify(photos)) {
      editedItems.forEach((editedItem) => {
        updatePhotos(editedItem);
      });
    }
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const imageRenderer = useCallback(
    ({ index, key, photo }) => (
      <Photo key={key} index={index} photo={photo} photos={photos} />
    ),
    [photos]
  );

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = `unset`;
    }
  }, [active]);

  return (
    <div className={clsx(className, styles.root)}>
      {isAuthenticated ? (
        <Button
          onClick={() => setActive(!active)}
          edit={active}
          icon="plus"
          className={styles.addPhotoButton}
        />
      ) : null}
      <div className={active ? styles.addPhoto : styles.addPhoto__hidden}>
        {isAuthenticated && active ? (
          <ImageUploadForm category={category} />
        ) : null}
      </div>
      <div className={styles.galleryContainer}>
        {isAuthenticated ? (
          <SortableGallery
            items={items}
            onSortEnd={onSortEnd}
            axis="xy"
            pressDelay={200}
          />
        ) : (
          <Gallery photos={photos} renderImage={imageRenderer} />
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  photos: PropTypes.array,
  category: PropTypes.object,
};

export { Component as GalleryPage, Component as GalleryPageComponent };
