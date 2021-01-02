import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
// import { useSelector } from 'react-redux';
import './styles/bootstrap.scss';

import styles from './App.module.scss';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { fetchMenu } from './redux/menuRedux';
import { fetchPhotos } from './redux/photoRedux';
import { fetchCategories } from './redux/categoryRedux';
import { GalleryPage } from './components/common/GalleryPage/GalleryPage';
import { routes } from './routes';

const removeDiacritics = require(`diacritics`).remove;

const App = () => {
  // const Menu = useSelector((state) => state.Menu);

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchPhotos());
    dispatch(fetchCategories());
  }, []);
  // const menu = useSelector((state) => state.menu.data);
  // console.log(menu);
  const routeComponents = routes.map(({ path, component, _id, render }) => {
    console.log(`comp`, component);
    return (
      <Route
        exact
        path={`/${removeDiacritics(path).toLowerCase()}`}
        key={_id}
        // galleryName={removeDiacritics(path).toLowerCase()}
        render={render}
        component={component}
      />
    );
  });

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
            {routeComponents}
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
