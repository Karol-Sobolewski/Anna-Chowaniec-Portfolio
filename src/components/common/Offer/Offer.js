import React from 'react'; // import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Offer.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, offer }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.offerColumnInner}>
      <div className={styles.offerTitle}>
        <h3>{offer.name}</h3>
      </div>
      <ul className={styles.offerDescription}>
        {offer.descriptions.map((description) => (
          <li key={offer.descriptions.indexOf(description)}>
            {description.text}
          </li>
        ))}
      </ul>
      <h4 className={styles.offerPrice}>{offer.price} ZŁ</h4>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  offer: PropTypes.object,
};

export { Component as Offer, Component as OfferComponent };
