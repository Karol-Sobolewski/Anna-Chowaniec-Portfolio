import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './MainLayout.module.scss';

const Component = ({ className, children }) => {
  const history = useHistory();
  const location = useLocation();
  const [splash, setSplash] = useState(false);
  const [margin, setMargin] = useState(true);
  const [RWD, setRWD] = useState(``);
  useEffect(() => {
    if (window.innerWidth >= 1200) {
      setRWD(false);
    } else {
      setRWD(true);
    }
  }, []);
  window.addEventListener(`resize`, function () {
    if (window.innerWidth >= 1200) {
      setRWD(false);
    } else {
      setRWD(true);
    }
  });
  function scrollFunction() {
    if (
      (document.body.scrollTop > 50 || document.documentElement.scrollTop) >
        50 &&
      history.location.pathname === `/`
    ) {
      setSplash(false);
    } else if (
      (document.body.scrollTop <= 50 || document.documentElement.scrollTop) <=
        50 &&
      history.location.pathname === `/`
    ) {
      setSplash(true);
    } else {
      setMargin(false);
    }
  }
  useEffect(() => {
    if (history.location.pathname === `/`) {
      window.onscroll = function () {
        scrollFunction();
      };
      setSplash(true);
    } else {
      setSplash(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (history.location.pathname !== `/`) {
      setSplash(false);
      setMargin(false);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={clsx(className, styles.root)}>
      <Header splash={splash} RWD={RWD} />
      <div className={margin ? styles.content__splash : styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as MainLayout, Component as MainLayoutComponent };
