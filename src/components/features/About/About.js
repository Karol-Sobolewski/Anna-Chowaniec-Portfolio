/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from 'react-images-upload';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../../common/Button/Button';
import { Loader } from '../../common/Loader/Loader';
import styles from './About.module.scss';

import {
  editDescriptionRequest,
  removeDescriptionImageRequest,
  addDescriptionImageRequest,
} from '../../../redux/descriptionRedux';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.descriptions.data);
  const loadingStatus = useSelector((state) => state.descriptions.loading);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const aboutPage = allPages.filter((item) => item.page === `about`)[0];
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [about, setAbout] = useState({
    ...aboutPage,
  });

  const description = {...aboutPage.description[0]};

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    description[name] = value;

    setAbout({ ...about, description });
  };

  const handleDispatchDescrRequest = (aboutObj, token) => {
    dispatch(editDescriptionRequest(aboutObj, token));
    setEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (selectedImage.length > 0) {
      const imageData = new FormData();
      imageData.append(`file`, selectedImage[0]);
      dispatch(removeDescriptionImageRequest(about, token));
      dispatch(addDescriptionImageRequest(imageData, token));
      handleDispatchDescrRequest(
        {
          ...about,
          images: [
            {
              src: `images/photos/about/${selectedImage[0].name}`,
              title: aboutPage.description[0].heading,
            },
          ],
        },
        token
      );
    } else {
      handleDispatchDescrRequest(about, token);
    }
  };

  const handleSelectedImage = (file) => {
    setSelectedImage(file);
  };

  return (
    <div className={clsx(className, styles.root)}>
      {
        // eslint-disable-next-line no-nested-ternary
        loadingStatus === undefined || loadingStatus.active || loadingStatus.error
          ?
          loadingStatus === undefined || loadingStatus.error ? null : <Loader />
          :
          loadingStatus === undefined || loadingStatus.error ? null :
            <Container
              fluid
              className={`${styles.container} d-flex flex-column justify-content-center`}
            >
              <h2>{aboutPage.heading}</h2>
              <Row className="row-cols-1 row-cols-md-4 justify-content-around">
                <Col
                  md={4}
                  className="d-flex align-items-center justify-content-center mb-3 mb-lg-0"
                >
                  <div className={styles.aboutImage}>
                    <img
                      src={aboutPage.images[0].src}
                      alt={aboutPage.images[0].title}
                    />
                  </div>
                </Col>
                {isAuthenticated ? (
                  <Button
                    onClick={() => setEdit(!edit)}
                    edit={edit}
                    icon="pencil"
                    className={styles.editAboutButton}
                  />
                ) : null}
                <Col
                  md={4}
                  className="d-flex flex-column align-items-center justify-content-center mt-3 mt-lg-0"
                >
                  <form
                    action="#"
                    method="put"
                    onSubmit={(e) => handleSubmit(e)}
                    onChange={(e) => handleChange(e)}
                    className={styles.editAbout}
                  >
                    {isAuthenticated && edit ? (
                      <div>
                        <input
                          name="heading"
                          type="text"
                          defaultValue={aboutPage.description[0].heading}
                        />
                        <textarea
                          name="text"
                          type="text"
                          rows="4"
                          cols="50"
                          defaultValue={aboutPage.description[0].text}
                        />
                        <ImageUploader
                          withIcon
                          buttonText="Wybierz obraz"
                          imgExtension={[`.jpg`, `.gif`, `.png`]}
                          maxFileSize={5242880}
                          withPreview
                          onChange={handleSelectedImage}
                          label="Maksymalny rozmiar: 5MB, Formaty: jpg, png, gif"
                          singleImage
                        />
                        <Button type="submit" name="Wyślij" />
                      </div>
                    ) : (
                      <div>
                        <h3>{aboutPage.description[0].heading}</h3>
                        <p>{aboutPage.description[0].text}</p>
                      </div>
                    )}
                  </form>
                </Col>
              </Row>
              <main>{children}</main>
            </Container>
      }
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as About,
  Component as AboutComponent,
};
