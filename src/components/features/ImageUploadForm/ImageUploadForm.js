import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { useAuth0 } from '@auth0/auth0-react';

import ImageUploader from 'react-images-upload';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './ImageUploadForm.module.scss';
import { addPhotoRequest } from '../../../redux/photoRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  // const { user } = useAuth0();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState({
    file: null,
    title: ``,
    category: ``,
    width: ``,
    height: ``,
    login: false,
  });

  const handleImage = (files) => {
    if (files) setPhoto({ ...photo, file: files[0] });
    else setPhoto({ ...photo, file: null });
    console.log(`file`, files[0].height);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setPhoto({ ...photo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (user) {
    //   setPhoto({ ...photo, login: true });
    // }
    const formData = new FormData();
    for (const key of [`category`, `title`, `login`]) {
      formData.append(key, photo[key]);
    }
    formData.append(`file`, photo.file);
    console.log(photo);
    dispatch(addPhotoRequest(formData));
  };

  useEffect(() => {}, []);
  return (
    <div className={clsx(className, styles.root)}>
      <form
        action="#"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
      >
        <input name="title" type="text" placeholder="Nazwa" />
        <select name="category" id="category">
          <option value="children">Fotografia dziecięca</option>
          <option value="wedding">Fotografia ślubna</option>
        </select>
        <ImageUploader
          withIcon
          buttonText="Wybierz obraz"
          imgExtension={[`.jpg`, `.gif`, `.png`]}
          maxFileSize={5242880}
          withPreview
          onChange={handleImage}
          label="Maksymalny rozmiar 5MB, Formaty: jpg, png, gif"
          singleImage
          className={photo.file ? `hide` : `animated fadeInUp`}
        />
        <button type="submit">Wyślij</button>
      </form>
      <main>{children}</main>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as ImageUploadForm, Component as ImageUploadFormComponent };
