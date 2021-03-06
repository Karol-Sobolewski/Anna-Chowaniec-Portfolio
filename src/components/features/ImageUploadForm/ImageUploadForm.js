import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';

import ImageUploader from 'react-images-upload';

import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '../../common/Button/Button';
import styles from './ImageUploadForm.module.scss';
import { addPhotoRequest } from '../../../redux/photoRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, category }) => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [format, setFormat] = useState(``);
  const [photo, setPhoto] = useState({
    file: null,
    title: ``,
    category: category._id,
    categoryName: category.name,
    width: ``,
    height: ``,
    login: false,
    format,
  });

  const handleImage = (files) => {
    if (files) setPhoto({ ...photo, file: files[0] });
    else setPhoto({ ...photo, file: null });
    // console.log(`file`, files[0].height);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setPhoto({ ...photo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      setPhoto({ ...photo, login: true });
    }
    const formData = new FormData();
    for (const key of [`category`, `title`, `categoryName`, `format`]) {
      formData.append(key, photo[key]);
    }
    formData.append(`file`, photo.file);
    console.log(photo);
    dispatch(addPhotoRequest(formData));
  };

  useEffect(() => {
    console.log(photo);
  }, []);
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
          imgExtension={[`.jpg`, `.gif`, `.png`]}
          maxFileSize={5242880}
          withPreview
          onChange={handleImage}
          label="Maksymalny rozmiar: 5MB, Formaty: jpg, png, gif"
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
        {/* <label htmlFor="vertical">Vertical</label> */}
        {/* <label htmlFor="horizontal">Horizontal</label> */}
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
