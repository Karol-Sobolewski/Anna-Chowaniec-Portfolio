import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { useSelector } from 'react-redux';

import styles from './App.module.scss';
import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/views/Home/Home';
import Wedding from './components/views/Wedding/Wedding';

function App() {
  // const Menu = useSelector((state) => state.Menu);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={styles.switchWrapper}
          >
            <Route exact path="/" component={Home} />
            <Route exact path="/slub" component={Wedding} />
            {/* Menu.items.map((item) => (
              <Route
                key={item.id}
                exact path={`/${item.src}`} //eslint-disable-line
                component={item.component}
              />
            )) */}
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
