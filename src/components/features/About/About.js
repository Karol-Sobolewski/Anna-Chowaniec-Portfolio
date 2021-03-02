import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '../../common/Button/Button';
import { userContext } from '../../../userContext';
import styles from './About.module.scss';
// import { connect } from 'react-redux';
import { editDescriptionRequest } from '../../../redux/descriptionRedux';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.descriptions.data);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const aboutPage = allPages.filter((item) => item.page === `about`)[0];
  const { auth, SetAuth } = useContext(userContext);
  const [about, setAbout] = useState({
    ...aboutPage,
  });
  const [description, setDescription] = useState({
    ...aboutPage.description[0],
  });
  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setDescription({ ...description, [name]: value });
    setAbout({ ...about, description });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(about);
    // dispatch(editDescriptionRequest);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container
        fluid
        className={`${styles.container} d-flex flex-column justify-content-center`}
      >
        <h2>{aboutPage.heading}</h2>
        <Row className="row-cols-1 row-cols-md-4 justify-content-around">
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center mb-3 mb-lg-0"
          >
            <div className={styles.aboutImage}>
              <img
                src={aboutPage.images[0].src}
                alt={aboutPage.images[0].title}
              />
            </div>
          </Col>
          <Col
            md={4}
            className="d-flex flex-column align-items-center justify-content-center mt-3 mt-lg-0"
          >
            <form
              action="#"
              method="post"
              onSubmit={(e) => handleSubmit(e)}
              onChange={(e) => handleChange(e)}
            >
              <Row className="d-flex align-items-center">
                {auth && edit ? (
                  <input
                    name="heading"
                    type="text"
                    defaultValue={aboutPage.description[0].heading}
                  />
                ) : (
                  <h3>{aboutPage.description[0].heading}</h3>
                )}
                {auth && !edit ? (
                  <button type="button" onClick={() => setEdit(true)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                ) : null}
                {auth && edit ? (
                  <button type="button" onClick={() => setEdit(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                ) : null}
              </Row>
              <Row>
                {auth && edit ? (
                  <textarea
                    name="text"
                    type="text"
                    rows="4"
                    cols="50"
                    defaultValue={aboutPage.description[0].text}
                  />
                ) : (
                  <h3>{aboutPage.description[0].text}</h3>
                )}
              </Row>
              {auth && edit ? <button type="submit">Wyślij</button> : null}
            </form>
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
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
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as About,
  // Container as About,
  Component as AboutComponent,
};
