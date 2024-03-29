import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Resizer from 'react-image-file-resizer';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';

import ImageUploader from 'react-images-upload';
import { addCategoryRequest } from '../../../redux/categoryRedux';
import { addMenuRequest } from '../../../redux/menuRedux';
import { addPhotoRequest } from '../../../redux/photoRedux';
import { Button } from '../../common/Button/Button';
import styles from './AddCategoryForm.module.scss';

const mongoose = require(`mongoose`);
const uniqid = require(`uniqid`);

const Component = ({ className }) => {
  /* eslint-disable react/jsx-props-no-spreading */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const categoryID = mongoose.Types.ObjectId();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const allMenus = useSelector((state) => state.menu.data);
  const filtered = allMenus.filter((item) => item.component === `GalleryPage`);

  const [photoError, setPhotoError] = useState(false);
  const [photoCloudTitle, setPhotoCloudTitle] = useState(``);

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
    cloudName: ``,
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

    const photoTitle = `${category.name}_${uniqid()}`;
    setPhotoCloudTitle(photoTitle);

    setPhoto({
      ...photo,
      title: `${category.name}_1`,
      categoryName: category.name,
      category: category._id,
      cloudName: photoTitle,
      src: `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1632648100/${category.name}/${photoTitle}.webp`,
    });
  }, [category.name]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCategory({
      ...category,
      image: { src: photo.src, alt: `${photo.title}` },
    });
  }, [photo.src]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (photo.file) setPhotoError(false);
  }, [photo.file]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleImage = async (file) => {
    if (file[0]) {
      const image = await resizeFile(file[0]);
      setPhoto({ ...photo, file: image });
    } else setPhoto({ ...photo, file: null });
  };

  const onSubmit = async () => {
    if (photo.file) {
      const token = await getAccessTokenSilently();
      const categoryFormData = new FormData();
      for (const key of [`description`, `name`, `_id`]) {
        categoryFormData.append(key, category[key]);
      }
      categoryFormData.append(`image`, JSON.stringify(category.image));
      const imageFormData = new FormData();
      const imageCloudFormData = new FormData();

      for (const key of [
        `category`,
        `title`,
        `categoryName`,
        `cloudName`,
        `format`,
        `order`,
        `photo`,
        `src`,
      ]) {
        imageFormData.append(key, photo[key]);
      }

      imageCloudFormData.append(`file`, photo.file);
      imageCloudFormData.append(`upload_preset`, `ehibbaam`);
      imageCloudFormData.append(`public_id`, photoCloudTitle);
      imageCloudFormData.append(`folder`, category.name);
      imageFormData.append(`file`, photo.file);

      dispatch(addMenuRequest(category, token));
      dispatch(addCategoryRequest(categoryFormData, token));
      await dispatch(
        addPhotoRequest(imageFormData, imageCloudFormData, token, category)
      );
    } else {
      setPhotoError(true);
    }
  };

  return (
    <form
      className={clsx(className, styles.root)}
      action="#"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      onChange={(e) => handleChange(e)}
    >
      <input
        type="text"
        placeholder="Tytuł"
        name="description"
        className={
          !errors.description ? styles.formInput : styles.formInput__error
        }
        {...register(`description`, {
          required: true,
          maxLength: 80,
        })}
      />
      {errors.description && (
        <span className={styles.errorMessage}>
          Proszę podać tytuł kategorii
        </span>
      )}
      <input
        type="text"
        placeholder="link (np. śluby, dzieci)"
        name="name"
        className={!errors.name ? styles.formInput : styles.formInput__error}
        {...register(`name`, {
          required: true,
          maxLength: 80,
        })}
      />
      {errors.name && (
        <span className={styles.errorMessage}>Proszę podać poprawny link</span>
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
        require
      />
      {photoError && (
        <span className={styles.errorMessage}>Proszę dodać zdjęcie</span>
      )}
      <Button className={styles.addPhotoButton} type="submit" name="Wyślij" />
    </form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as AddCategoryForm, Component as AddCategoryFormComponent };
