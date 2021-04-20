import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/bootstrap.scss';
import styles from './App.module.scss';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import { fetchMenu } from './redux/menuRedux';
import { fetchCategories } from './redux/categoryRedux';
import { fetchDescriptions } from './redux/descriptionRedux';
import { fetchPhotos } from './redux/photoRedux';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
import { Loader } from './components/common/Loader/Loader';
import { Photos } from './components/features/Photos/Photos';
import { OfferPage } from './components/views/OfferPage/OfferPage';
import { Contact } from './components/views/Contact/Contact';
import { Dashboard } from './components/views/Dashboard/Dashboard';
import { NotFound } from './components/views/NotFound/NotFound';

import ProtectedRoute from './auth/protected-route';
import history from './utils/history';

const removeDiacritics = require(`diacritics`).remove;

const App = () => {
  // const {
  //   getAccessTokenSilently,
  //   loginWithPopup,
  //   getAccessTokenWithPopup,
  //   user,
  //   isAuthenticated,
  //   loginWithRedirect,
  //   logout,
  //   isLoading,
  //   error,
  // } = useAuth0();

  // const { apiOrigin = `http://localhost:8000`, audience } = getConfig();
  // const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useAuth0();

  // console.log(`isAuthenticated`, isAuthenticated);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.data);
  const descriptions = useSelector((state) => state.descriptions.data);
  const categories = useSelector((state) => state.categories.data);

  useEffect(() => {
    dispatch(fetchPhotos());
    dispatch(fetchDescriptions());
    dispatch(fetchCategories());
    dispatch(fetchMenu());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!isLoading && menu.length !== 0) {
  //     setLoaded(true);
  //     // setTimeout(() => {}, 500);
  //     console.log(`loaded`, loaded);
  //   }
  // }, [isLoading]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      menu.length !== 0 &&
      descriptions.length !== 0 &&
      categories.length !== 0
    ) {
      setLoaded(true);
    }
  });

  const filtered = menu.filter((item) => item.component === `GalleryPage`);

  const routeComponents = filtered.map(({ _id, shortName }) => (
    <Route
      exact
      path={`/${removeDiacritics(shortName).toLowerCase()}`}
      key={_id}
      component={() => <Photos galleryName={shortName} />}
    />
  ));

  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  // if (isLoading) {
  //   return <p>loading</p>;
  // }

  return (
    <>
      {loaded ? (
        <div className={styles.app}>
          <BrowserRouter history={history}>
            <MainLayout>
              <ScrollToTop />
              {/* <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className={styles.switchWrapper}
              > */}
              <Switch>
                <Route exact path="/" component={() => <HomePage />} />
                {routeComponents}
                <Route exact path="/oferta" component={() => <OfferPage />} />
                <Route exact path="/kontakt" component={() => <Contact />} />
                <ProtectedRoute path="/login" component={<Dashboard />} />
                <Route path="*" component={() => <NotFound />} />
              </Switch>
              {/* </AnimatedSwitch> */}
            </MainLayout>
          </BrowserRouter>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default App;
