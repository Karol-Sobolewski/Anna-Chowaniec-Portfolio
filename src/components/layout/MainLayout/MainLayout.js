import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './MainLayout.module.scss';

const Component = ({ className, children }) => {
  // const MenuItems = useSelector((state) => state.Menu);
  const location = useLocation();
  // console.log(`params`, location.pathname);
  const [splash, setSplash] = useState(false);
  useEffect(() => {
    function scrollFunction() {
      if (
        document.body.scrollTop > 1 ||
        document.documentElement.scrollTop > 1
      ) {
        setSplash(false);
        console.log(`change class for scroll`);
      } else {
        setSplash(true);
        console.log(`change class for top`);
      }
    }
    if (location.pathname === `/`) {
      console.log(`scrollNow`); // Working
      window.onscroll = function () {
        scrollFunction(); // Scrolls anyway
      };
    } else {
      console.log(`shouldNotScroll`); // Working
      setSplash(false);
    }
  });
  return (
    <div className={clsx(className, styles.root)}>
      <Header splash={splash} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
