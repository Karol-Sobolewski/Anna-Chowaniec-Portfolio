import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/captioned.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../../common/Button/Button';

import { editPhotoRequest, fetchPhotos } from '../../../redux/photoRedux';

import styles from './Slider.module.scss';

const Component = ({ className }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const { isAuthenticated } = useAuth0();
  // const sliderPage = allPages.filter((item) => item.page === `slider`)[0];
  const dispatch = useDispatch();
  const allPhotos = useSelector((state) => state.photos.data);
  // console.log(allPhotos);
  const { getAccessTokenSilently } = useAuth0();

  const sliderPhotos = allPhotos.filter((item) => {
    const width = Math.abs(item.width);
    const height = Math.abs(item.height);
    // console.log(item.title, width, height);
    return item.slider === true && width > height;
  });
  const sliderChooserPhotos = allPhotos.filter((item) => {
    const width = Math.abs(item.width);
    const height = Math.abs(item.height);
    // console.log(item.title, width, height);
    return width > height;
  });

  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleImageChooser = async (img) => {
    // console.log(img.category);
    const category = JSON.parse(JSON.stringify(img.category));
    // console.log(category);
    await setImage({ ...img, slider: !img.slider, category });
  };

  useEffect(() => {
    // console.log(image);
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
            <div key={img._id} data-src={img.src}>
              {/* <div className={styles.caption}>
                <p>{im.title}</p>
              </div> */}
            </div>
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
          <div>
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
