import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';

import ImageUploader from 'react-images-upload';

import Resizer from 'react-image-file-resizer';
import { Button } from '../../common/Button/Button';
import styles from './ImageUploadForm.module.scss';
import { addPhotoRequest } from '../../../redux/photoRedux';

const uniqid = require(`uniqid`);

const Component = ({ className, children, category }) => {
  const { getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();
  const [format] = useState(``);
  const [photo, setPhoto] = useState({
    file: null,
    title: ``,
    category: category._id,
    categoryName: category.name,
    width: ``,
    height: ``,
    format,
    order: 0,
  });

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1024,
        1024,
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

    setPhoto({
      ...photo,
      src: `images/photos/${category.name}/${photoTitle}.WEBP`,
    });
  }, [photo.title]); //eslint-disable-line

  const handleSubmit = async (e) => {
    const token = await getAccessTokenSilently();

    e.preventDefault();
    const formData = new FormData();
    for (const key of [
      `category`,
      `title`,
      `categoryName`,
      `format`,
      `order`,
      `src`,
    ]) {
      formData.append(key, photo[key]);
    }
    formData.append(`file`, photo.file);
    await dispatch(addPhotoRequest(formData, token, category));
    window.location.reload(false);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <form
        action="#"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
      >
        <p>Tytuł:</p>
        <input name="title" type="text" placeholder="Nazwa zdjęcia" />
        <ImageUploader
          withIcon
          buttonText="Wybierz obraz"
          imgExtension={[`.jpg`, `.png`]}
          maxFileSize={5242880}
          withPreview
          onChange={handleImage}
          label="Maksymalny rozmiar: 5MB, Formaty: jpg, png"
          singleImage
          className={photo.file ? `hide` : `animated fadeInUp`}
        />
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
        <Button className={styles.addPhotoButton} type="submit" name="Wyślij" />
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
