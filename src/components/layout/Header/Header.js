import React, { useEffect, useState, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HamburgerSqueeze } from 'react-animated-burgers';

import { Burger } from '../../features/Burger/Burger';

import styles from './Header.module.scss';
import { useAuth0 } from "@auth0/auth0-react"; //eslint-disable-line
const removeDiacritics = require(`diacritics`).remove;

const Component = ({ className, children, splash }) => {
  // const MenuItems = useSelector((state) => state.Menu);
  const { isAuthenticated, logout } = useAuth0();
  const MenuItems = useSelector((state) => state.menu.data);
  const [active, setActive] = useState(false);
  const [activeRWD, setActiveRWD] = useState(false);

  const toggleMenuButton = () => setActiveRWD(!activeRWD);

  const useOutsideMenu = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setActiveRWD(false);
          setActive(false);
        }
      }
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }, [ref]);
  };

  // console.log(`auth`, isAuthenticated);

  const menuRef = useRef(null);
  useOutsideMenu(menuRef);
  return (
    <header className={styles.root} ref={menuRef}>
      {/* <HamburgerSqueeze
        className={styles.burgerButton}
        id="burgerButton"
        isActive={activeRWD}
        onClick={toggleMenuButton}
      /> */}
      <nav className={!splash ? styles.mainMenu : styles.mainMenu__scroll}>
        <a
          href="/"
          className={splash ? styles.logoImg : styles.logoImg__scroll}
        >
          <img
            type="image/svg+xml"
            src="/images/logo/logo.svg"
            className={styles.logoImg}
            aria-label="Logo"
          />
        </a>
        {/* <div className={activeRWD ? styles.mainMenuRWD : null}> */}
        {MenuItems.map((item) => (
          <NavLink
            key={item._id}
            to={removeDiacritics(item.shortName).toLowerCase()}
            activeClassName="active"
            onClick={() => setActiveRWD(false)}
            className={splash ? styles.link : styles.link__scroll}
          >
            {item.name}
          </NavLink>
        ))}
        {isAuthenticated ? (
          <Link
            className={splash ? styles.link : styles.link__scroll}
            onClick={() => logout()}
          >
            Wyloguj
          </Link>
        ) : null}
      </nav>
      <Burger button={splash} />
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
