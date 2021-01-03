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
import { fetchDescriptions } from './redux/descriptionRedux';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
import { GalleryPage } from './components/common/GalleryPage/GalleryPage';
import { Offer } from './components/views/Offer/Offer';

const removeDiacritics = require(`diacritics`).remove;

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.data);
  const descriptions = useSelector((state) => state.descriptions.data);
  const categories = useSelector((state) => state.categories.data);
  const photos = useSelector((state) => state.photos.data);
  useEffect(() => {
    dispatch(fetchDescriptions());
    dispatch(fetchPhotos());
    dispatch(fetchCategories());
    dispatch(fetchMenu());
    if (menu && descriptions && categories && photos) {
      setTimeout(() => {
        setLoaded(true);
      }, 500);
    }
  }, []);
  const filtered = menu.filter((item) => item.component === `GalleryPage`);

  const routeComponents = filtered.map(({ path, _id, shortName }) => (
    <Route
      exact
      path={`/${removeDiacritics(shortName).toLowerCase()}`}
      key={_id}
      component={() => <GalleryPage galleryName={shortName} />}
    />
  ));
  return (
    <>
      {loaded ? (
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
                <Route exact path="/oferta" component={() => <Offer />} />
              </AnimatedSwitch>
            </MainLayout>
          </BrowserRouter>
        </div>
      ) : null}
    </>
  );
};

export default App;
