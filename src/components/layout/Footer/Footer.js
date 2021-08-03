import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Container, Row, Col } from 'react-bootstrap';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { faIcons, fas } from '@fortawesome/free-solid-svg-icons';
import { IconsGenerator } from '../../common/IconsGenerator/IconsGenerator';
import styles from './Footer.module.scss';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.descriptions.data);

  const footerPage = allPages.filter((item) => item.page === `contact`)[0];

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

  const footerRef = useRef(null);
  useEffect(() => {
    const footerElements = footerRef.current.childNodes;
    for (const footerElement of footerElements) {
      gsap.set(footerElement, { autoAlpha: 0 });
      ScrollTrigger.batch(footerElements, {
        start: `top bottom`,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            delay: 0.1,
            duration: 0.5,
            stagger: 0.2,
            y: 0,
          }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            delay: 0.5,
            stagger: 0.2,
            y: 0,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            delay: 0.5,
            stagger: 0.2,
          }),
      });
      ScrollTrigger.addEventListener(`refreshInit`, () =>
        gsap.set(footerElement, { autoAlpha: 0 })
      );
    }
  }, []);

  return (
    <footer className={clsx(className, styles.root)}>
      <Container>
        <Row
          className="d-flex align-items-center justify-content-center"
          ref={footerRef}
        >
          {footerPage.description.map((item) =>
            item.type !== `web` ? (
              <Col
                key={footerPage.description.indexOf(item)}
                md={4}
                className="col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center p-3"
              >
                <a
                  href={handleLink(item.value, item.type)}
                  className={styles.contactLink}
                >
                  <IconsGenerator
                    iconName={item.icon}
                    iconsList={fas}
                    alternativeIcon={faIcons}
                    size={2}
                  />
                  <span>{item.value}</span>
                </a>
              </Col>
            ) : null
          )}
          <Col
            md={4}
            className="col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center p-3"
          >
            {footerPage.description.map((item) =>
              item.type === `web` && item.value ? (
                <a
                  key={footerPage.description.indexOf(item)}
                  href={handleLink(item.value, item.type)}
                >
                  <IconsGenerator
                    iconName={item.icon}
                    iconsList={fab}
                    alternativeIcon={faIcons}
                    size={2}
                    className="mr-2"
                  />
                </a>
              ) : null
            )}
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </footer>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Footer, Component as FooterComponent };
