import React, { useEffect, useState } from 'react'; // import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import autosize from 'autosize';
import { Button } from '../Button/Button';
import styles from './Offer.module.scss';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, offer }) => {
  const { isAuthenticated } = useAuth0();
  const [edit, setEdit] = useState(false);
  const [editedOffer, setEditedOffer] = useState({
    _id: offer._id,
    name: offer.name,
    category: offer.category,
    description: [],
  });

  const mapDescription = () => {
    if (edit) {
      const descriptionArr = [];
      offer.descriptions.map((description) => {
        descriptionArr.push(description);
        return descriptionArr;
      });
      setEditedOffer({ ...editedOffer, description: descriptionArr });
    }
  };

  autosize(document.querySelectorAll(`textarea`));

  useEffect(() => {
    if (edit) return mapDescription();
  }, [edit]);

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setEditedOffer({ ...editedOffer, [name]: value });
  };

  const handleChangeSubForm = (e, index) => {
    const { name, value } = e.target;
    const descriptionArray = [...editedOffer.description];
    descriptionArray[index][name] = value;
    setEditedOffer({ ...editedOffer, description: descriptionArray });
  };
  const handleOfferDescription = (e) => {
    console.log(editedOffer);
  };

  const handleSubmit = (e) => {
    console.log(editedOffer);
  };

  return (
    <div className={clsx(className, styles.root)}>
      {isAuthenticated ? (
        <Button
          className={styles.editOfferButton}
          onClick={() => setEdit(!edit)}
          edit={edit}
          icon="pencil"
        />
      ) : null}

      <div className={styles.offerColumnInner}>
        <div className={styles.offerTitle}>
          {edit ? (
            <textarea
              name="name"
              type="text"
              placeholder="Tytuł"
              defaultValue={offer.name}
              onChange={(e) => handleChange(e)}
            />
          ) : (
            <h3>{offer.name}</h3>
          )}
        </div>
        <ul className={styles.offerDescription}>
          {offer.descriptions.map((description, i) => (
            <li key={i}>
              {edit ? (
                <textarea
                  defaultValue={description.text}
                  name="text"
                  onChange={(e) => handleChangeSubForm(e, i)}
                  placeholder="Oferta"
                  type="text"
                />
              ) : (
                <p>{description.text}</p>
              )}
            </li>
          ))}

          {/* {edit
            ? inputList.map((item, i) => (
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
            ))
            : null} */}
          {/* {edit ? (
            <li>
              <textarea name="text" placeholder="nowa oferta" type="text" />
              <Button
                className={styles.addOfferDescriptionButton}
                onClick={(e) => handleOfferDescription(e)}
                name="Ok"
              />
            </li>
          ) : null} */}
        </ul>
        {edit ? (
          <input
            className={styles.offerPriceInput}
            defaultValue={offer.price}
            name="price"
            onChange={(e) => handleChange(e)}
            placeholder="Cena"
            type="text"
          />
        ) : (
          <h4 className={styles.offerPrice}>{offer.price} ZŁ</h4>
        )}
        {edit ? (
          <Button
            className={styles.submitEditedOfferButton}
            onClick={(e) => handleSubmit(e)}
            name="Wyślij"
          />
        ) : null}
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  offer: PropTypes.object,
};

export { Component as Offer, Component as OfferComponent };
