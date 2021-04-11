import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HamburgerSqueeze } from 'react-animated-burgers';

import clsx from 'clsx';

import styles from './Burger.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const removeDiacritics = require(`diacritics`).remove;

const Component = ({ className, button }) => {
  const MenuItems = useSelector((state) => state.menu.data);

  const [active, setActive] = useState(false);
  const toggleTrueFalse = () => setActive(!active);
  const useOutsideAlerter = (ref) => {
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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div
      className={clsx(className, active ? styles.root__active : styles.root)}
      ref={wrapperRef}
    >
      <HamburgerSqueeze
        className={
          button && !active ? styles.burgerButton : styles.burgerButton__active
        }
        // className={styles.burgerButton}
        id="burgerButton"
        isActive={active}
        onClick={toggleTrueFalse}
      />
      <nav className={active ? styles.burgerMenu__active : styles.burgerMenu}>
        {MenuItems.map((item) => (
          <NavLink
            key={item._id}
            to={removeDiacritics(item.shortName).toLowerCase()}
            activeClassName="active"
            onClick={toggleTrueFalse}
            className={styles.link}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   someProp: reduxSelector(state);
// })

// const mapDispatchToProps = (dispatch) => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),

//   const container = connect(mapStateToProps, mapStateToProps)(Component);
// })

Component.propTypes = {
  className: PropTypes.string,
  button: PropTypes.bool,
};

export {
  Component as Burger,
  // Container as Burger,
  Component as BurgerComponent,
};
