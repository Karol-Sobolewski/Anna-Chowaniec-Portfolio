import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { gsap } from 'gsap';

import { Row, Col } from 'react-bootstrap';
import autosize from 'autosize';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { faIcons, fas } from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.scss';
import { Button } from '../../common/Button/Button';
import { ContactForm } from '../../features/ContactForm/ContactForm';
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

  const contactRef = useRef(null);

  useEffect(() => {
    const contactColumns = contactRef.current.childNodes;
    const contactFormHeader = contactColumns[0].childNodes[0];
    const contactForm = contactColumns[0].childNodes[1].querySelector(`form`)
      .childNodes;
    const contactLinks = contactColumns[1];
    gsap.set(contactLinks, {
      autoAlpha: 0,
      x: `50%`,
    });

    const runOnComplete = () => {
      const timelineContactLinks = gsap.timeline({
        defaults: {
          ease: `Power3.easeOut`,
        },
      });
      timelineContactLinks.fromTo(
        contactLinks,
        { x: `50%` },
        { autoAlpha: 1, x: 0 }
      );
    };

    gsap.set([contactFormHeader], {
      autoAlpha: 0,
      y: `100%`,
    });

    for (const contactFormElement of contactForm) {
      gsap.set(contactFormElement, {
        autoAlpha: 0,
        y: `50%`,
      });
      const timelineForm = gsap.timeline({
        delay: 0.2,
        defaults: {
          ease: `Power3.easeOut`,
        },
        onComplete: runOnComplete,
      });
      timelineForm
        .fromTo(contactFormHeader, { y: `100%` }, { autoAlpha: 1, y: 0 })
        .fromTo(
          contactForm,
          { y: `50%` },
          { autoAlpha: 1, y: 0, stagger: 0.15 }
        );
    }
    // for (const contactLink of contactLinks) {
    //   gsap.set(contactLink, {
    //     autoAlpha: 0,
    //     y: `50%`,
    //   });
    //   const timelineContactLinks = gsap.timeline({
    //     defaults: {
    //       ease: `Power3.easeOut`,
    //     },
    //   });
    //   timelineContactLinks.fromTo(
    //     contactLinks,
    //     { y: `50%` },
    //     { autoAlpha: 1, y: 0, stagger: 0.2 }
    //   );
    // }

    // for (const contactColumn of contactColumns) {
    //   gsap.set(contactColumn, {
    //     autoAlpha: 0,
    //     y: `10%`,
    //   });
    //   const timelineContact = gsap.timeline({
    //     duration: 0.1,
    //     defaults: {
    //       ease: `Power3.easeOut`,
    //     },
    //     onComplete: runOnComplete,
    //   });
    //   timelineContact.fromTo(
    //     contactColumns,
    //     { y: `50%` },
    //     { autoAlpha: 1, y: 0, stagger: 0.1 }
    //   );
    // }
  }, []);

  return (
    <div className={clsx(className, styles.root)}>
      <Row className={styles.contactRow} ref={contactRef}>
        <Col className={`${styles.contactCol} col-12 col-md-6`}>
          <h3>Napisz do mnie</h3>
          <ContactForm />
        </Col>
        <Col className={`${styles.contactCol} col-12 col-md-6`}>
          <Row
            className={
              edit ? styles.socialIconsRow__edit : styles.socialIconsRow
            }
          >
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
          </Row>
          <br />
          <Row
            className={
              edit ? styles.socialIconsRow__edit : styles.socialIconsRow
            }
          >
            {contactPage.description.map((item) =>
              // eslint-disable-next-line no-nested-ternary
              item.type === `web` ? (
                // eslint-disable-next-line no-nested-ternary
                !edit ? (
                  item.value ? (
                    <a
                      href={handleLink(item.value, item.type)}
                      key={item.heading}
                      className={styles.socialIcon}
                    >
                      <IconsGenerator
                        iconName={item.icon}
                        iconsList={fab}
                        alternativeIcon={faIcons}
                        size={2}
                      />
                    </a>
                  ) : null
                ) : (
                  <textarea
                    key={contactPage.description.indexOf(item)}
                    name="value"
                    type="text"
                    defaultValue={item.value}
                    onChange={(e) => handleChange(e, item)}
                    placeholder={`${item.heading} link`}
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
