import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faPencilAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { Container } from 'react-bootstrap';
import { Button } from '../../common/Button/Button';

import { userContext } from '../../../userContext';
import { editPhotoRequest } from '../../../redux/photoRedux';

import styles from './Slider.module.scss';

const Component = ({ className }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const allPages = useSelector((state) => state.descriptions.data);
  const { auth } = useContext(userContext);
  // const sliderPage = allPages.filter((item) => item.page === `slider`)[0];
  const dispatch = useDispatch();
  const allPhotos = useSelector((state) => state.photos.data);
  const sliderPhotos = allPhotos.filter(
    (item) => item.slider === true && item.width > item.height
  );
  const sliderChooserPhotos = allPhotos.filter(
    (item) => item.width > item.height
  );

  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleImageChooser = async (img) => {
    await setImage({ ...img, slider: !img.slider });
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
            <div key={img.id} data-src={img.src}>
              {/* <div className={styles.caption}>
                <p>{im.title}</p>
              </div> */}
            </div>
          ))}
        </AutoplaySlider>
      </Container>
      {auth ? (
        <div className={styles.editButton}>
          <Button onClick={() => setEdit(!edit)} edit={edit} auth={auth} />
        </div>
      ) : null}
      {auth && edit ? (
        <div className={styles.photoPick}>
          <div>
            {sliderChooserPhotos.map((img) => (
              <button
                type="button"
                className={
                  img.slider ? styles.photoSlide__chosen : styles.photoSlide
                }
                onClick={() => handleImageChooser(img)}
              >
                <div className={img.slider ? styles.icon__chosen : styles.icon}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <img src={img.src} alt="im.src" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Slider,
  // Container as Slider,
  Component as SliderComponent,
};
