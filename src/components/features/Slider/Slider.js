import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/captioned.css';

import { Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../../common/Button/Button';
import { PhotoSelector } from '../../common/PhotoSelector/PhotoSelector';

import { editPhotoRequest, fetchPhotos } from '../../../redux/photoRedux';

import styles from './Slider.module.scss';

const Component = ({ className }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const allPhotos = useSelector((state) => state.photos.data);
  const { getAccessTokenSilently } = useAuth0();

  const sliderPhotos = allPhotos.filter((item) => {
    const width = Math.abs(item.width);
    const height = Math.abs(item.height);
    return item.slider === true && width > height;
  });

  const sliderChooserPhotos = allPhotos.filter((item) => {
    const width = Math.abs(item.width);
    const height = Math.abs(item.height);
    return width > height;
  });

  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleImageChooser = async (img) => {
    const category = JSON.parse(JSON.stringify(img.category));
    await setImage({ ...img, slider: !img.slider, category });
  };

  useEffect(() => {
    const handleSubmit = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        await dispatch(editPhotoRequest(image, token));
        dispatch(fetchPhotos());
      }
    };
    handleSubmit();
  }, [dispatch, image, isAuthenticated, getAccessTokenSilently]);

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>
        <AutoplaySlider
          play
          cancelOnInteraction={false}
          interval={6000}
          className={styles.slider}
          cssModule={styles}
          bullets={false}
          fillParent
        >
          {sliderPhotos.map((img) => (
            <div key={img._id} data-src={img.src} />
          ))}
        </AutoplaySlider>
      </Container>
      {isAuthenticated ? (
        <div className={styles.editButton}>
          <Button onClick={() => setEdit(!edit)} edit={edit} icon="pencil" />
        </div>
      ) : null}
      {isAuthenticated && edit ? (
        <div className={styles.photoPick}>
          <PhotoSelector
            photos={sliderChooserPhotos}
            onChangeValue={handleImageChooser}
            checkIcon
          />
        </div>
      ) : null}
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as Slider, Component as SliderComponent };
