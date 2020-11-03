import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';//eslint-disable-line

const MainLayout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
