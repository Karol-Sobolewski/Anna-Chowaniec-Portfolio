import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';

import ImageUploader from 'react-images-upload';
import styles from './AddCategoryForm.module.scss';
import { Button } from '../../common/Button/Button';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { addCategoryRequest } from '../../../redux/categoryRedux';
import { addMenuRequest } from '../../../redux/menuRedux';

const Component = ({ className }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [category, setCategory] = useState({
    name: ``,
    description: ``,
    component: `GalleryPage`,
    shortName: ``,
    order: 3, // TODO get last order of GalleryPage
    photo: {
      alt: ``,
      file: null,
    },
  });

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setCategory({ ...category, [name]: value });
  };

  useEffect(() => {
    setCategory({
      ...category,
      shortName: category.name,
    });
  }, [category.name]); //eslint-disable-line

  useEffect(() => {
    setCategory({
      ...category,
      photo: { ...category.photo, alt: category.description },
    });
  }, [category.description]); //eslint-disable-line

  // useEffect(() => {
  //   setCategory({
  //     ...category,
  //     photo: { alt: category.description },
  //   });
  // }, [category.photo]); //eslint-disable-line

  const handleImage = (files) => {
    if (files)
      setCategory({
        ...category,
        photo: { ...category.photo, file: files[0] },
      });
    else setCategory({ ...category, photo: { ...category.photo, file: null } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    const categoryFormData = new FormData();
    for (const key of [`description`, `name`]) {
      categoryFormData.append(key, category[key]);
    }
    categoryFormData.append(`file`, category.photo.file);

    // const PhotoFormData = new FormData();
    // for (const key of [
    //   `category`,
    //   `title`,
    //   `categoryName`,
    //   `format`,
    //   `order`,
    // ]) {
    //   PhotoFormData.append(key, photo[key]);
    // }
    // PhotoFormData.append(`file`, photo.file);

    // console.log(photo);
    // dispatch(addPhotoRequest(formData, token));

    dispatch(addCategoryRequest(categoryFormData, token));
    dispatch(addMenuRequest(category, token));
  };
  return (
    <form
      className={clsx(className, styles.root)}
      action="#"
      method="post"
      onSubmit={(e) => handleSubmit(e)}
      onChange={(e) => handleChange(e)}
    >
      <input type="text" placeholder="Tytuł" name="description" />
      <input type="text" placeholder="link (np. śluby, dzieci)" name="name" />
      <ImageUploader
        withIcon
        buttonText="Wybierz obraz"
        imgExtension={[`.jpg`, `.gif`, `.png`]}
        maxFileSize={5242880}
        withPreview
        onChange={handleImage}
        label="Maksymalny rozmiar: 5MB, Formaty: jpg, png, gif"
        singleImage
        // className={photo.file ? `hide` : `animated fadeInUp`}
      />
      <Button className={styles.addPhotoButton} type="submit" name="Wyślij" />
    </form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as AddCategoryForm, Component as AddCategoryFormComponent };
