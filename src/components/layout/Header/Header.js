import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Burger } from '../../features/Burger/Burger';
import styles from './Header.module.scss'; //eslint-disable-line

const Component = ({ className, children, splash }) => {
  // const MenuItems = useSelector((state) => state.Menu);
  const MenuItems = useSelector((state) => state.menu.data);
  const [spl, setSpl] = useState(false);
  const [menuClass, setMenuClass] = useState(!splash);

  // useEffect(() => {
  //   setMenuClass(!splash);
  // });

  // useEffect(() => {
  //   const scroll = document.getElementById(`scrollIndicator`);
  //   const scrollPosition = scroll.getBoundingClientRect().top;
  //   console.log(`scrollPosition`, scrollPosition);
  //   window.addEventListener(`scroll`, function () {
  //     if (scrollPosition && scrollPosition < 0) {
  //       setMenuClass(true);
  //       // console.log(menuClass);
  //       // console.log(scrollPosition);
  //     } else if (scrollPosition && scrollPosition >= 0) {
  //       setMenuClass(false);
  //     } else {
  //       setMenuClass(true);
  //     }
  //   });
  // });

  // useEffect(() => {
  //   window.onscroll = function (e) {
  //     // called when the window is scrolled.
  //     if (
  //       splash &&
  //       (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1)
  //     ) {
  //       setMenuClass(true);
  //       console.log(menuClass);
  //     } else if (
  //       splash &&
  //       (document.body.scrollTop < 1 || document.documentElement.scrollTop < 1)
  //     ) {
  //       setMenuClass(false);
  //     } else {
  //       setMenuClass(true);
  //     }
  //   };

  // function scrollFunction() {
  //   if (
  //     document.body.scrollTop > 50 ||
  //     document.documentElement.scrollTop > 50
  //   ) {
  //     setMenuClass(true);
  //   } else {
  //     setMenuClass(false);
  //   }
  // }
  // window.onscroll = function () {
  //   scrollFunction();
  // };
  // scrollFunction();
  // });
  return (
    <header className={styles.root}>
      <nav className={!splash ? styles.mainMenu : styles.mainMenu__scroll}>
        <Link to="/" className={styles.logoImg}>
          <img
            type="image/svg+xml"
            src="/images/logo/logo.svg"
            className={styles.logoImg}
            aria-label="Logo"
          />
        </Link>
        {MenuItems.map((item) => (
          <NavLink
            key={item._id}
            to={item.path}
            activeClassName="active"
            className={styles.link}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <Burger />
    </header>
  );
};
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  splash: PropTypes.bool,
};

export {
  Component as Header,
  // Container as Footer,
  Component as HeaderComponent,
};
