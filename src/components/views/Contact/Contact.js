import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Row, Col } from 'react-bootstrap';
import autosize from 'autosize';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { faIcons, fas } from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.scss';

import { Button } from '../../common/Button/Button';
import { IconsGenerator } from '../../common/IconsGenerator/IconsGenerator';
import { editDescriptionRequest } from '../../../redux/descriptionRedux';

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
                  key={contactPage.description.indexOf(item)}
                  href={handleLink(item.value, item.type)}
                  className={styles.contactLink}
                >
                  <IconsGenerator
                    iconName={item.icon}
                    iconsList={fas}
                    alternativeIcon={faIcons}
                    size={2}
                  />
                  <p>{item.value}</p>
                </a>
              ) : (
                <textarea
                  key={contactPage.description.indexOf(item)}
                  name="value"
                  type="text"
                  defaultValue={item.value}
                  onChange={(e) => handleChange(e, item)}
                />
              )
            ) : null
          )}
          <Row
            className={
              edit ? styles.socialIconsRow__edit : styles.socialIconsRow
            }
          >
            {contactPage.description.map((item) =>
              // eslint-disable-next-line no-nested-ternary
              item.type === `web` ? (
                !edit ? (
                  <Col key={item.heading} className="col">
                    <a href={handleLink(item.value, item.type)}>
                      <IconsGenerator
                        iconName={item.icon}
                        iconsList={fab}
                        alternativeIcon={faIcons}
                        size={2}
                      />
                    </a>
                  </Col>
                ) : (
                  <textarea
                    key={contactPage.description.indexOf(item)}
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
      <main>{children}</main>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Contact, Component as ContactComponent };
