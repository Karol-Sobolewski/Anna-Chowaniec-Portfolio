import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { userContext } from './userContext';
// import { useSelector } from 'react-redux';
import './styles/bootstrap.scss';

import styles from './App.module.scss';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { fetchMenu } from './redux/menuRedux';
import { fetchCategories } from './redux/categoryRedux';
import { fetchDescriptions } from './redux/descriptionRedux';
import { fetchPhotos } from './redux/photoRedux';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
import { GalleryPage } from './components/common/GalleryPage/GalleryPage';
import { Offer } from './components/views/Offer/Offer';
import { Contact } from './components/views/Contact/Contact';
import { Dashboard } from './components/views/Dashboard/Dashboard';
import ProtectedRoute from './auth/protected-route';

const removeDiacritics = require(`diacritics`).remove;

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [auth, setAuth] = useState(true);
  const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.data);
  const descriptions = useSelector((state) => state.descriptions.data);
  const categories = useSelector((state) => state.categories.data);
  useEffect(() => {
    dispatch(fetchDescriptions());
    dispatch(fetchPhotos());
    dispatch(fetchCategories());
    dispatch(fetchMenu());
    if (menu && descriptions && categories) {
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
                <userContext.Provider value={providerValue}>
                  <Route exact path="/" component={() => <HomePage />} />
                  {routeComponents}
                  <Route exact path="/oferta" component={() => <Offer />} />
                  <Route exact path="/kontakt" component={() => <Contact />} />
                  <Route exact path="/panel" component={() => <Dashboard />} />
                </userContext.Provider>
                {/* <ProtectedRoute path="/dash" component={Dashboard} /> */}
              </AnimatedSwitch>
            </MainLayout>
          </BrowserRouter>
        </div>
      ) : null}
    </>
  );
};

export default App;
