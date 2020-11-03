import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.component}>
        <nav>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/wedding" activeClassName="active">
            Fotografia ślubna
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
