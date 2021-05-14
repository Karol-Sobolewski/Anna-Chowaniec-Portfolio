import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HamburgerSqueeze } from 'react-animated-burgers';

import { useAuth0 } from '@auth0/auth0-react';
import styles from './Header.module.scss';

const removeDiacritics = require(`diacritics`).remove;

const Component = ({ splash, RWD }) => {
  const { isAuthenticated, logout } = useAuth0();
  const MenuItems = useSelector((state) => state.menu.data);
  const [active, setActive] = useState(false);
  const toggleTrueFalse = () => setActive(!active);

  const useOutsideMenu = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setActive(false);
        }
      }
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }, [ref]);
  };

  const menuRef = useRef(null);
  useOutsideMenu(menuRef);
  return (
    <header className={styles.root} ref={menuRef}>
      {RWD ? (
        <HamburgerSqueeze
          className={
            active || !splash
              ? styles.burgerButton__active
              : styles.burgerButton
          }
          id="burgerButton"
          isActive={active}
          onClick={toggleTrueFalse}
        />
      ) : null}
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
        <div
          className={RWD ? (active ? styles.links_RWD : styles.links_RWDHidden) : styles.links} //eslint-disable-line
        >
          {MenuItems.map((item) => (
            <NavLink
              key={item._id}
              to={removeDiacritics(item.shortName).toLowerCase()}
              activeClassName="active"
              onClick={() => setActive(false)}
              className={splash && !RWD ? styles.link : styles.link__scroll}
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button
              type="button"
              className={splash && !RWD ? styles.link : styles.link__scroll}
              onClick={() => logout()}
            >
              Wyloguj
            </button>
          ) : null}
        </div>
      </nav>
    </header>
  );
};
Component.propTypes = {
  splash: PropTypes.bool,
  RWD: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export {
  Component as Header,
  // Container as Footer,
  Component as HeaderComponent,
};
