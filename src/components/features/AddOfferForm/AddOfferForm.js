import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import autosize from 'autosize';

import styles from './AddOfferForm.module.scss';
import { Button } from '../../common/Button/Button';

import { addOfferRequest } from '../../../redux/offerRedux';

const Component = ({ className, category }) => {
  const dispatch = useDispatch();
  autosize(document.querySelectorAll(`textarea`));

  const [offer, setOffer] = useState({
    name: ``,
    description: [],
    category,
  });
  const [inputList, setInputList] = useState([{ text: `` }]);

  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setOffer({ ...offer, [name]: value });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { text: `` }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  useEffect(() => {
    setOffer({ ...offer, description: inputList });
  }, [inputList]); //eslint-disable-line

  const handleSubmit = async (e) => {
    const token = await getAccessTokenSilently();
    e.preventDefault();
    dispatch(addOfferRequest(offer, token));
  };

  return (
    <div className={clsx(className, styles.root)}>
      <form
        className={clsx(className, styles.root)}
        action="#"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
      >
        <input type="text" placeholder="Nazwa Pakietu" name="name" />
        {inputList.map((item, i) => (
          <div key={i} className={styles.offerDescriptionBox}>
            <textarea
              type="text"
              placeholder="Oferta"
              name="text"
              value={item.text}
              onChange={(e) => handleInputChange(e, i)}
            />
            {inputList.length >= 2 ? (
              <Button
                type="button"
                className={styles.removeOfferButton}
                onClick={() => handleRemoveClick(i)}
                icon="delete"
              />
            ) : null}
            <Button
              className={styles.addOfferButton}
              onClick={handleAddClick}
              type="button"
              icon="plus"
            />
          </div>
        ))}
        <input type="text" placeholder="Cena (bez zł)" name="price" />
        <Button className={styles.addPhotoButton} type="submit" name="Dodaj" />
      </form>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  category: PropTypes.string,
};

export { Component as AddOfferForm, Component as AddOfferFormComponent };
