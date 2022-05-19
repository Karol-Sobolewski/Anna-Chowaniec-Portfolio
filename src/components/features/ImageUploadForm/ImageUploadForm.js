import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';

import ImageUploader from 'react-images-upload';

import Resizer from 'react-image-file-resizer';
import { addPhotoRequest } from '../../../redux/photoRedux';
import { Button } from '../../common/Button/Button';
import { Loader } from '../../common/Loader/Loader';

import styles from './ImageUploadForm.module.scss';

const uniqid = require(`uniqid`);

const Component = ({ className, children, category }) => {
  /* eslint-disable react/jsx-props-no-spreading */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.photos.loading);

  const [photo, setPhoto] = useState({
    file: null,
    title: ``,
    category: category._id,
    categoryName: category.name,
    cloudName: ``,
    width: ``,
    height: ``,
    format: ``,
    order: -1,
  });
  const [photoError, setPhotoError] = useState(false);
  const [photoCloudTitle, setPhotoCloudTitle] = useState(``);
  useEffect(() => {
    if (photo.file) setPhotoError(false);
  }, [photo.file]); // eslint-disable-line react-hooks/exhaustive-deps
  const [formatError, setFormatError] = useState(false);
  useEffect(() => {
    if (photo.format) setFormatError(false);
  }, [photo.format]); // eslint-disable-line react-hooks/exhaustive-deps

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1920,
        1920,
        `WEBP`,
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        `file`
      );
    });

  const handleImage = async (files) => {
    if (files[0]) {
      const image = await resizeFile(files[0]);
      setPhoto({ ...photo, file: image });
    } else setPhoto({ ...photo, file: null });
  };

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setPhoto({ ...photo, [name]: value });
  };

  useEffect(() => {
    const photoTitle = `${category.name}_${uniqid()}`;
    setPhotoCloudTitle(photoTitle);
    setPhoto({
      ...photo,
      cloudName: photoTitle,
      src: `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1632648100/${photo.categoryName}/${photoTitle}.webp`,
    });
  }, [photo.title]); //eslint-disable-line

  const onSubmit = async () => {
    if (photo.file && photo.format) {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      const imageFormData = new FormData();

      for (const key of [
        `category`,
        `title`,
        `cloudName`,
        `categoryName`,
        `format`,
        `order`,
        `src`,
      ]) {
        formData.append(key, photo[key]);
      }
      imageFormData.append(`file`, photo.file);
      imageFormData.append(`upload_preset`, `ehibbaam`);
      imageFormData.append(`public_id`, photoCloudTitle);
      imageFormData.append(`folder`, photo.categoryName);
      formData.append(`file`, photo.file);
      await dispatch(addPhotoRequest(formData, imageFormData, token, category));
    }
    if (!photo.file) setPhotoError(true);
    if (!photo.format) setFormatError(true);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <form
        action="#"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        onChange={(e) => handleChange(e)}
      >
        <p>Tytuł:</p>
        <input
          name="title"
          type="text"
          placeholder="Nazwa zdjęcia"
          className={
            !errors.description ? styles.formInput : styles.formInput__error
          }
          {...register(`title`, {
            required: true,
            maxLength: 80,
          })}
        />
        {errors.title && (
          <span className={styles.errorMessage}>
            Proszę podać tytuł zdjęcia
          </span>
        )}
        <ImageUploader
          withIcon
          buttonText="Wybierz obraz"
          imgExtension={[`.jpg`, `.png`, `.jpeg`]}
          maxFileSize={5242880}
          withPreview
          onChange={handleImage}
          label="Maksymalny rozmiar: 5MB, Formaty: jpg, jpeg, png"
          singleImage
          className={photo.file ? `hide` : `animated fadeInUp`}
        />
        {photoError && (
          <span className={styles.errorMessage}>Proszę dodać zdjęcie</span>
        )}
        <p>Format:</p>
        <div className={styles.radioRow}>
          <label htmlFor="vertical">
            <input type="radio" id="vertical" name="format" value="vertical" />
            <img src="/images/utils/vertical.png" alt="vertical" />
          </label>
          <label htmlFor="horizontal">
            <input
              type="radio"
              id="horizontal"
              name="format"
              value="horizontal"
            />
            <img src="/images/utils/horizontal.png" alt="horizontal" />
          </label>
        </div>
        {formatError && (
          <span className={styles.errorMessage}>
            Proszę wybrać format zdjęcia
          </span>
        )}
        {loadingStatus === undefined ||
        loadingStatus.active ||
        loadingStatus.error ? (
          /* eslint-disable */
          <Loader />
        ) : (
            <Button
              className={styles.addPhotoButton}
            type="submit"
            name="Wyślij"
            />
        )}
      </form>
      <main>{children}</main>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  category: PropTypes.object,
};

export { Component as ImageUploadForm, Component as ImageUploadFormComponent };
