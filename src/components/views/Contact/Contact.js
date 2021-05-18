import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react"; //eslint-disable-line

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Row, Col } from 'react-bootstrap';
import autosize from 'autosize';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { faIcons, fas } from '@fortawesome/free-solid-svg-icons';
import { IconsGenerator } from '../../common/IconsGenerator/IconsGenerator';
import { Button } from '../../common/Button/Button';

import styles from './Contact.module.scss';

import { editDescriptionRequest } from '../../../redux/descriptionRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.descriptions.data);
  const contactPage = allPages.filter((item) => item.page === `contact`)[0];
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const [contact] = useState({
    ...contactPage,
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e, item) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    item[name] = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    dispatch(editDescriptionRequest(contact, token));
    setEdit(false);
  };

  const handleLink = (link, type) => {
    if (type === `web`) {
      if (link.includes(`https://`)) {
        return link;
      }
      if (!link.includes(`https://`)) {
        return `https://${link}`;
      }
    }
    if (type === `phone`) return `tel:${link}`;
    if (type === `mail`) return `mailto:${link}`;
  };

  useEffect(() => {
    autosize(document.querySelectorAll(`textarea`));
  });
  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.contactRow}>
        <Col className={`${styles.contactCol} col-12 col-md-6`}>
          <h3>Napisz do mnie</h3>
          <p>contact form</p>
        </Col>
        <Col className={`${styles.contactCol} col-12 col-md-6`}>
          {contactPage.description.map((item) =>
            // eslint-disable-next-line no-nested-ternary
            item.type !== `web` ? (
              !edit ? (
                <a
                  href={handleLink(item.value, item.type)}
                  className={styles.contactLink}
                >
                  <IconsGenerator
                    iconName={item.icon}
                    iconsList={fas}
                    alternativeIcon={faIcons}
                    size="2"
                  />
                  <p>{item.text}</p>
                </a>
              ) : (
                <textarea
                  name="text"
                  type="text"
                  defaultValue={item.text}
                  onChange={(e) => handleChange(e, item)}
                />
              )
            ) : null
          )}
          <Row className={styles.socialIconsRow}>
            {contactPage.description.map((item) =>
              // eslint-disable-next-line no-nested-ternary
              item.type === `web` ? (
                !edit ? (
                  <Col className="col">
                    <a href={handleLink(item.value, item.type)}>
                      <IconsGenerator
                        iconName={item.icon}
                        iconsList={fab}
                        alternativeIcon={faIcons}
                        size="2"
                      />
                    </a>
                  </Col>
                ) : (
                  <textarea
                    name="value"
                    type="text"
                    defaultValue={item.value}
                    onChange={(e) => handleChange(e, item)}
                  />
                )
              ) : null
            )}
            {isAuthenticated && edit ? (
              <Button
                onClick={(e) => handleSubmit(e)}
                name="Wyślij"
                className={styles.submitContactButton}
              />
            ) : null}
          </Row>
        </Col>
        {isAuthenticated ? (
          <Button
            onClick={() => setEdit(!edit)}
            edit={edit}
            icon="pencil"
            className={styles.editContactButton}
          />
        ) : null}
      </Row>
      {/* {contactPage.description.map((item) => (
        <form
          action="#"
          method="put"
          // onSubmit={}
          onChange={(e) => handleChange(e, item)}
          className={styles.editContact}
          key={contactPage.description.indexOf(item)}
        >
          <Row className="w-100 py-3 justify-content-center">
            <Col className="col-12 col-md-6">
              {isAuthenticated && edit ? (
                <div>
                  <p>Tytuł</p>
                  <input
                    name="heading"
                    type="text"
                    defaultValue={item.heading}
                  />
                </div>
              ) : null}
            </Col>
            <Col className={`col-12 col-md-6 ${edit ? `d-none` : `flex`}`}>
                {item.type === `mail` ? (
                  <a href={`mailto:${item.value}`}>{item.text}</a>
                ) : item.type === `phone` ? (
                  <a href={`tel:${item.value}`}>{item.text}</a>
                ) : item.type === `web` ? (
                  <a target="_blank" href={`${item.value}`}>{item.text}</a>
                ) : null}
            </Col>
            <Row className={`${!edit ? `d-none` : `flex`}`}>
              <Col className="col-12 col-md-6">
                <p>Tekst</p>
                <input name="text" type="text" defaultValue={item.text} />
              </Col>
              <Col className="col-12 col-md-6">
                <p>Wartość / Link</p>
                <input name="text" type="value" defaultValue={item.value} />
              </Col>
            </Row>
          </Row>
        </form>
      ))}
      */}

      <main>{children}</main>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Contact, Component as ContactComponent };
