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
import { useAuth0 } from '@auth0/auth0-react';

import arrayMove from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '../Button/Button';
import { Photo } from '../Photo/Photo';
import { fetchPhotos } from '../../../redux/photoRedux';

import styles from './GalleryPage.module.scss';
import { ImageUploadForm } from '../../features/ImageUploadForm/ImageUploadForm';

const removeDiacritics = require(`diacritics`).remove;

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const SortablePhoto = SortableElement(
  (item, index) => <Photo {...item} /> //eslint-disable-line
);

const SortableGallery = SortableContainer(({ items }) => {
  const { getAccessTokenSilently } = useAuth0();
  // getAccessTokenSilently({
  //   audience: `http://localhost:8000/`,
  //   scope: `read:posts`,
  // }).then(console.log);
  // console.log(`getAccessTokenSilently` getAccessTokenSilently());
  // console.log(`items`, items);
  return (
    <Gallery
      photos={items}
      renderImage={(props) => (
          <SortablePhoto {...props} index={props.index} photos={items}/> //eslint-disable-line
      )}
    />
  );
});

const Component = ({ className, children, galleryName }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { isAuthenticated } = useAuth0();
  // const { auth } = useContext(userisAuthenticatedContext);

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

  // const ph = useMemo(() => (photos), [input])

  useEffect(() => {
    setItems(photos);
    console.log(`update`);
    // dispatch(fetchPhotos());
  }, []);

  console.log(`render`);

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
    console.log(items);
  };
  return (
    <div className={clsx(className, styles.root)}>
      {isAuthenticated ? (
        <Button
          onClick={() => setActive(!active)}
          edit={active}
          icon="plus"
          // auth={auth}
          className={styles.addPhotoButton}
        />
      ) : null}
      <div
        className={active ? styles.addPhoto : styles.addPhoto__hidden}
        ref={wrapperRef}
      >
        {isAuthenticated && active ? (
          <ImageUploadForm category={category} />
        ) : null}
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
