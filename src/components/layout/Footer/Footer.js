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
    console.log(`footerElements`, footerRef.current);
    // for (const footerElement of footerElements) {
    gsap.set(footerElements, { autoAlpha: 0, y: `-50` });

    const timelineUsesLink = gsap.timeline({
      defaults: {
        duration: 1,
        ease: `Power3.easeOut`,
      },
      scrollTrigger: {
        trigger: footerRef.current,
        toggleActions: `play none play reverse`,
        start: `top bottom`,
      },
    });
    timelineUsesLink.to(footerElements, {
      delay: 1,
      y: 0,
      autoAlpha: 1,
      stagger: 0.2,
    });
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
