import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container } from 'react-bootstrap';
import styles from './Popup.module.scss';
import { Button } from '../Button/Button';

const Component = ({
  className,
  children,
  visible,
  setVisible,
  verifyConfirm,
}) => {
  const useOutsidePopup = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setVisible(false);
        }
      }
      document.addEventListener(`mouseup`, handleClickOutside);
      return () => {
        document.removeEventListener(`mouseup`, handleClickOutside);
      };
    }, [ref]);
  };
  const popupRef = useRef(null);
  useOutsidePopup(popupRef);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = `unset`;
    }
  }, [visible]);

  const handleConfirm = () => {
    verifyConfirm(true);
    setVisible(false);
  };

  return visible ? (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.popupContent} ref={popupRef}>
        <main>{children}</main>
        <div className={styles.actionButtons}>
          <Button onClick={() => handleConfirm()} type="button" name="✓" />
          <Button onClick={() => setVisible(false)} type="button" name="X" />
        </div>
      </Container>
    </div>
  ) : null;
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  verifyConfirm: PropTypes.func,
};

export { Component as Popup, Component as PopupComponent };
