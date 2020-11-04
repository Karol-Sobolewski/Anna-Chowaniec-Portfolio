import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss'; //eslint-disable-line

class Header extends React.Component {
  render() {
    return (
      <header className={styles.component}>
        <nav>
          <Link to="/" className={styles.logo}>
            <img
              type="image/svg+xml"
              src="/images/logo/logo.svg"
              className={styles.logoImg}
              aria-label="Logo"
            />
          </Link>
          <NavLink to="/wedding" activeClassName="active">
            Fotografia ślubna
          </NavLink>
          <NavLink to="/children" activeClassName="active">
            Fotografia dziecięca
          </NavLink>
          <NavLink to="/portrait" activeClassName="active">
            Fotografia portretowa
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
