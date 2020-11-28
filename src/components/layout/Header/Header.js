import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss'; //eslint-disable-line
const Header = () => {
  const MenuItems = useSelector((state) => state.Menu);
  // useEffect(() => {});
  return (
    <header className={styles.root}>
      <nav>
        <Link to="/" className={styles.logo}>
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
    </header>
  );
};
export default Header;
