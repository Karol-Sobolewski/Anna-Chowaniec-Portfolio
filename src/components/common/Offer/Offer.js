import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { Loader } from '../Loader/Loader';
import styles from './Offer.module.scss';
import {
  fetchOffers,
  editOfferRequest,
  removeOfferRequest,
} from '../../../redux/offerRedux';

const uniqid = require(`uniqid`);

const Component = ({ className, offer }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const loadingStatus = useSelector((state) => state.descriptions.loading);
  const [addOfferState, setAddOfferState] = useState(false);
  const [sortOfferState, setSortOfferState] = useState(false);
  const [editedOffer, setEditedOffer] = useState({
    _id: offer._id,
    name: offer.name,
    category: offer.category,
    descriptions: [],
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
      setEditedOffer({ ...editedOffer, descriptions: descriptionArr });
    }
  };

  useEffect(() => {
    if (edit) return mapDescription();
  }, [edit]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const descriptionArray = [...editedOffer.descriptions];
    descriptionArray[index][name] = value;
    setEditedOffer({ ...editedOffer, descriptions: descriptionArray });
    setDescriptionItems(descriptionArray);
    e.target.focus();
  };

  const handleRemoveDescription = (e, id) => {
    const index = descriptionItems.findIndex((i) => i._id === id);
    const descriptionArray = [...editedOffer.descriptions];
    descriptionArray.splice(index, 1);
    setEditedOffer({ ...editedOffer, descriptions: descriptionArray });
    setDescriptionItems(descriptionArray);
  };

  const handleDescriptionChange = (e) => {
    const { target } = e;
    const { value } = target;
    setNewOffer({ ...newOffer, text: value });
  };

  const submitDescription = () => {
    const descriptionArray = [...editedOffer.descriptions];
    descriptionArray.push(newOffer);
    setEditedOffer({ ...editedOffer, descriptions: descriptionArray });
    setDescriptionItems(descriptionArray);
    setNewOffer({ _id: uniqid(), text: `` });
  };

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    setDescriptionItems(arrayMove(descriptionItems, oldIndex, newIndex));
    setEditedOffer({ ...editedOffer, descriptions: descriptionItems });
  };

  useEffect(() => {
    setEditedOffer({ ...editedOffer, descriptions: descriptionItems });
  }, [descriptionItems]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <ul className={styles.offerDescription} key={1}>
          {descriptionItems.map((value, index) => (
            <SortableItem key={value._id} index={index} value={value.text} />
          ))}
        </ul>
      );
    }
  });

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    dispatch(editOfferRequest(editedOffer, token));
    setEdit(false);
    setSortOfferState(false);
    setAddOfferState(false);
    setTimeout(() => {
      if (!loadingStatus.active && !loadingStatus.error) {
        dispatch(fetchOffers());
      } else {
        const confirm = window.confirm(`Błąd! odświeżyć stronę?`);
        if (confirm) {
          window.location.reload();
        }
      }
    }, 500);
  };

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    const confirm = window.confirm(`Chcesz usunąć ofertę?`);
    if (confirm) {
      dispatch(removeOfferRequest(editedOffer, token));
    }
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
      {isAuthenticated ? (
        <Button
          onClick={() => handleDelete()}
          icon="delete"
          className={styles.deleteOfferButton}
        />
      ) : null}
      {
        // eslint-disable-next-line no-nested-ternary
        loadingStatus === undefined ||
        loadingStatus.active ||
        loadingStatus.error ? (
          /* eslint-disable */
          loadingStatus === undefined || loadingStatus.error ? null : (
            <Loader />
          )
        ) : loadingStatus === undefined || loadingStatus.error ? null : (
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
                {descriptionItems.map((description, i) =>
                !sortOfferState && edit ? (
                    <li key={i}>
                    <textarea
                        value={description.text}
                        name="text"
                        key={i}
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
                )}
              {sortOfferState && edit ? (
                <SortableList
                  items={descriptionItems}
                  onSortEnd={onSortEnd}
                  helperClass="sortableHelper"
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
                      onClick={() => submitDescription()}
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
                onClick={() => handleSubmit()}
                name="Wyślij"
              />
            ) : null}
            </div>
          )
        /* eslint-enable */
      }
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  offer: PropTypes.object,
};

export { Component as Offer, Component as OfferComponent };
