import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Resizer from 'react-image-file-resizer';

import { useAuth0 } from '@auth0/auth0-react';

import ImageUploader from 'react-images-upload';
import styles from './AddCategoryForm.module.scss';
import { Button } from '../../common/Button/Button';
import { addCategoryRequest } from '../../../redux/categoryRedux';
import { addMenuRequest } from '../../../redux/menuRedux';
import { addPhotoRequest } from '../../../redux/photoRedux';

const mongoose = require(`mongoose`);
const uniqid = require(`uniqid`);

const Component = ({ className }) => {
  const allMenus = useSelector((state) => state.menu.data);
  const filtered = allMenus.filter((item) => item.component === `GalleryPage`);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const categories = useSelector((state) => state.categories.data).length;
  const categoryID = mongoose.Types.ObjectId();

  const [category, setCategory] = useState({
    _id: categoryID,
    name: ``,
    description: ``,
    component: `GalleryPage`,
    shortName: ``,
    order: filtered.length + 1,
    photo: {
      alt: ``,
      src: ``,
    },
  });

  const [photo, setPhoto] = useState({
    file: null,
    title: ``,
    category: ``,
    categoryName: ``,
    width: 4,
    height: 3,
    format: `horizontal`,
    order: 0,
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
      shortName: category.name,
    });

    const photoTitle = `${category.name}_${uniqid()}`;
    setPhoto({
      ...photo,
      title: `${category.name}_1`,
      categoryName: category.name,
      category: category._id,
      src: `images/photos/${category.name}/${photoTitle}.WEBP`,
    });
  }, [category.name]); //eslint-disable-line

  useEffect(() => {
    setCategory({
      ...category,
      image: { src: photo.src, alt: `${photo.title}` },
    });
  }, [photo.src]); //eslint-disable-line

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

  const handleImage = async (file) => {
    if (file[0]) {
      const image = await resizeFile(file[0]);
      setPhoto({ ...photo, file: image });
    } else setPhoto({ ...photo, file: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    const categoryFormData = new FormData();
    for (const key of [`description`, `name`, `_id`]) {
      categoryFormData.append(key, category[key]);
    }
    categoryFormData.append(`image`, JSON.stringify(category.image));

    const photoFormData = new FormData();
    for (const key of [
      `category`,
      `title`,
      `categoryName`,
      `format`,
      `order`,
      `photo`,
      `src`,
    ]) {
      photoFormData.append(key, photo[key]);
    }
    photoFormData.append(`file`, photo.file);

    dispatch(addCategoryRequest(categoryFormData, token));
    dispatch(addMenuRequest(category, token));
    dispatch(addPhotoRequest(photoFormData, token, category));
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
