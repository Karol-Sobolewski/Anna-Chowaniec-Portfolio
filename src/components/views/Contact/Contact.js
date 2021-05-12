import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react"; //eslint-disable-line

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Row, Col } from 'react-bootstrap';

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
    // setDescription({ ...description, [name]: value });
    // const descriptionIndex =
    item[name] = value;
    // const filtered = menu.filter((item) => item.component === `GalleryPage`);
    // console.log(matchItem[0]);
    // console.log(item);
    // console.log(description);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    dispatch(editDescriptionRequest(contact, token));
    setEdit(false);
  };

  useEffect(() => {
    // console.log(auth);
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.contactRow}>
        <Col className={`${styles.contactCol} col-12 col-md-6`}>
          <h3>Skontaktuj się ze mną</h3>
          <p>contact form</p>
        </Col>
        <Col className={`${styles.contactCol} col-12 col-md-6`}>
          {contactPage.description.map((item) =>
            item.type !== `web` ? <p>{item.text}</p> : null
          )}
          <Row>
            {contactPage.description.map((item) =>
              item.type === `web` ? (
                <Col className="col-md-6">
                  <p>{item.text}</p>
                </Col>
              ) : null
            )}
          </Row>
        </Col>
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
      {isAuthenticated ? (
        <Button
          onClick={() => setEdit(!edit)}
          edit={edit}
          icon="pencil"
          // auth={auth}
          className={styles.editContactButton}
        />
      ) : null}
      <main>{children}</main>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Contact, Component as ContactComponent };
