import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Burger } from '../../features/Burger/Burger';
import styles from './Header.module.scss'; //eslint-disable-line
const Header = () => {
  const MenuItems = useSelector((state) => state.Menu);
  const localState = {
    logoClasses: styles.logoImg,
  };
  const [logoClasses, setLogoClasses] = useState(styles.logoImg);
  useEffect(() => {
    function scrollFunction() {
      if (
        document.body.scrollTop > 25 ||
        document.documentElement.scrollTop > 25
      ) {
        // setLogoClasses(styles.logoImgOnScroll);
        document.getElementById(`burgerButton`).style.marginTop = `1vh`;
        // document.getElementById(`mainMenu`).style.padding = `0`;
      } else {
        // setLogoClasses(styles.logoImg);
        document.getElementById(`burgerButton`).style.marginTop = `0`;
        // document.getElementById(`mainMenu`).style.padding = `5vh 0 5vh 0`;
        // document.getElementsByClassName(`mainMenu`).style.paddingBottom = `0`;
      }
    }
    window.onscroll = function () {
      scrollFunction();
    };
  });
  return (
    <header className={styles.root} id="header">
      <nav className={styles.mainMenu} id="mainMenu">
        <Link to="/" className={styles.logoImg}>
          <img
            type="image/svg+xml"
            src="/images/logo/logo.svg"
            className={styles.logoImg}
            aria-label="Logo"
          />
        </Link>
        {MenuItems.items.map((item) => (
          <NavLink key={item.id} to={item.src} activeClassName="active">
            {item.title}
          </NavLink>
        ))}
      </nav>
      <Burger />
    </header>
  );
};
export default Header;
