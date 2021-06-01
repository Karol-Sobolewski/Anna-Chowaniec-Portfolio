import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAuth0 } from '@auth0/auth0-react';
import Resizer from 'react-image-file-resizer';

import ImageUploader from 'react-images-upload';
import styles from './AddCategoryForm.module.scss';
import { Button } from '../../common/Button/Button';
import { addCategoryRequest } from '../../../redux/categoryRedux';
import { addMenuRequest } from '../../../redux/menuRedux';

const Component = ({ className }) => {
  const allMenus = useSelector((state) => state.menu.data);
  const filtered = allMenus.filter((item) => item.component === `GalleryPage`);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [category, setCategory] = useState({
    name: ``,
    description: ``,
    component: `GalleryPage`,
    shortName: ``,
    order: filtered.length + 1,
    photo: {
      alt: ``,
      file: null,
    },
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
  }, [category.name]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCategory({
      ...category,
      photo: { ...category.photo, alt: category.description },
    });
  }, [category.description]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImage = async (files) => {
    if (files[0]) {
      const image = await resizeFile(files[0]);
      setCategory({
        ...category,
        photo: { ...category.photo, file: image },
      });
    } else
      setCategory({ ...category, photo: { ...category.photo, file: null } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    const categoryFormData = new FormData();
    for (const key of [`description`, `name`]) {
      categoryFormData.append(key, category[key]);
    }
    categoryFormData.append(`file`, category.photo.file);
    dispatch(addCategoryRequest(categoryFormData, token));
    dispatch(addMenuRequest(category, token));
    window.location.reload(false);
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
      />
      <Button className={styles.addPhotoButton} type="submit" name="Wyślij" />
    </form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as AddCategoryForm, Component as AddCategoryFormComponent };
