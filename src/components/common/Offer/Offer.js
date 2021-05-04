import React, { useEffect, useState } from 'react'; // import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import autosize from 'autosize';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { Button } from '../Button/Button';
import styles from './Offer.module.scss';

const uniqid = require(`uniqid`);
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, offer }) => {
  const { isAuthenticated } = useAuth0();
  const [edit, setEdit] = useState(false);
  const [addOfferState, setAddOfferState] = useState(false);
  const [sortOfferState, setSortOfferState] = useState(false);
  const [editedOffer, setEditedOffer] = useState({
    _id: offer._id,
    name: offer.name,
    category: offer.category,
    description: ``,
  });
  const [descriptionItems, setDescriptionItems] = useState(offer.descriptions);
  const [newOffer, setNewOffer] = useState({ _id: uniqid(), text: `` });
  autosize(document.querySelectorAll(`textarea`));

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

  useEffect(() => {
    if (edit) return mapDescription();
  }, [edit]);

  useEffect(() => {
    autosize(document.querySelectorAll(`textarea`));
  }, [sortOfferState]);

  const handleEdit = () => {
    setEdit(!edit);
    if (!edit) {
      setAddOfferState(false);
      setSortOfferState(false);
    }
  };

  const handleSort = () => {
    setSortOfferState(!sortOfferState);
    if (!sortOfferState) {
      setAddOfferState(false);
    }
  };

  const handleChangeUpperForm = (e) => {
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
    setDescriptionItems(descriptionArray);
    e.target.focus();
  };

  const handleRemoveDescription = (e, id) => {
    const index = descriptionItems.findIndex((i) => i._id === id);
    const descriptionArray = [...editedOffer.description];
    descriptionArray.splice(index, 1);
    setEditedOffer({ ...editedOffer, description: descriptionArray });
    setDescriptionItems(descriptionArray);
  };

  const handleDescriptionChange = (e) => {
    const { target } = e;
    const { value } = target;
    setNewOffer({ ...newOffer, text: value });
  };

  const submitDescription = (e) => {
    const descriptionArray = [...editedOffer.description];
    descriptionArray.push(newOffer);
    setEditedOffer({ ...editedOffer, description: descriptionArray });
    setDescriptionItems(descriptionArray);
    setNewOffer({ _id: uniqid(), text: `` });
  };

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    setDescriptionItems(arrayMove(descriptionItems, oldIndex, newIndex));
    setEditedOffer({ ...editedOffer, description: descriptionItems });
  };

  useEffect(() => {
    setEditedOffer({ ...editedOffer, description: descriptionItems });
  }, [descriptionItems]); /* eslint-disable-line */

  const DragHandle = SortableHandle(() => <span>::</span>);

  const SortableItem = SortableElement(({ value, index }) => (
    <li className={styles.sortableHelper} key={index}>
      <DragHandle />
      <p>{value}</p>
    </li>
  ));

  const SortableList = SortableContainer(() => {
    if (edit) {
      return (
        <ul
          className={styles.offerDescription}
          lockAxis
          pressDelay={200}
          transitionDuration={300}
        >
          {descriptionItems.map((value, index) => (
            <SortableItem key={value._id} index={index} value={value.text} />
          ))}
        </ul>
      );
    }
  });

  const handleSubmit = (e) => {
    console.log(editedOffer);
  };

  return (
    <div className={clsx(className, styles.root)}>
      {isAuthenticated ? (
        <Button
          className={styles.editOfferButton}
          onClick={() => handleEdit()}
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
              onChange={(e) => handleChangeUpperForm(e)}
            />
          ) : (
            <h3>{offer.name}</h3>
          )}
        </div>
        <ul className={styles.offerDescription}>
          {edit ? (
            <li>
              <Button
                className={styles.sortOfferButton}
                onClick={() => handleSort()}
                type="button"
                icon="sort"
                edit={sortOfferState}
              />
            </li>
          ) : null}
          {descriptionItems.map(
            (description, i) =>
              /* eslint-disable */
              !sortOfferState && edit ? (
                <li key={i}>
                  <textarea
                    value={description.text}
                    name="text"
                    key={i}
                    id={i}
                    index={i}
                    onChange={(e) => handleChangeSubForm(e, i)}
                    placeholder="Oferta"
                    type="text"
                  />
                  <Button
                    type="button"
                    className={styles.removeDescriptionButton}
                    onClick={(e) => handleRemoveDescription(e, i)}
                    icon="delete"
                  />
                </li>
              ) : sortOfferState && edit ? null : (
                <li key={i}>
                  <p>{description.text}</p>
                </li>
              )
            /* eslint-enable */
          )}
          {sortOfferState && edit ? (
            <SortableList
              items={descriptionItems}
              onSortEnd={onSortEnd}
              helperClass="sortableHelper"
              lockAxis
              pressDelay={200}
              useDragHandle
            />
          ) : null}
          {addOfferState && edit ? (
            <li>
              <textarea
                name="name"
                type="text"
                placeholder="Oferta"
                value={newOffer.text}
                onChange={(e) => handleDescriptionChange(e)}
              />
              <Button
                className={styles.submitDescriptionButton}
                onClick={(e) => submitDescription(e)}
                name="ok"
              />
            </li>
          ) : null}
          {edit && !sortOfferState ? (
            <li>
              <Button
                className={styles.addOfferButton}
                onClick={() => setAddOfferState(!addOfferState)}
                type="button"
                icon="plus"
                edit={addOfferState}
              />
            </li>
          ) : null}
        </ul>
        {edit ? (
          <input
            className={styles.offerPriceInput}
            defaultValue={offer.price}
            name="price"
            onChange={(e) => handleChangeUpperForm(e)}
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
