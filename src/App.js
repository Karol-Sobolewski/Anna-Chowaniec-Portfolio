import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
// import { useSelector } from 'react-redux';
import './styles/bootstrap.scss';

import styles from './App.module.scss';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { fetchMenu } from './redux/menuRedux';
import { fetchPhotos } from './redux/photoRedux';
import { fetchCategories } from './redux/categoryRedux';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
import { GalleryPage } from './components/common/GalleryPage/GalleryPage';

const removeDiacritics = require(`diacritics`).remove;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchPhotos());
    dispatch(fetchCategories());
  }, []);
  const menu = useSelector((state) => state.menu.data);
  const filtered = menu.filter((m) => m.component === `GalleryPage`);

  const routeComponents = filtered.map(({ path, _id, shortName }) => (
    <Route
      exact
      path={`/${removeDiacritics(path).toLowerCase()}`}
      key={_id}
      component={() => <GalleryPage galleryName={shortName} />}
    />
  ));

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <MainLayout>
          <ScrollToTop />
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={styles.switchWrapper}
          >
            <Route exact path="/" component={() => <HomePage />} />
            {routeComponents}
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
