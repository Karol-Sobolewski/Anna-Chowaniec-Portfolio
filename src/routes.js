import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { HomePage } from './components/views/HomePage/HomePage';
import { GalleryPage } from './components/common/GalleryPage/GalleryPage';
// import { Contact } from "./components/views/Contact";
const routes = [
  {
    path: ``,
    component: HomePage,
  },
  // {
  //   path: `Oferta`,
  //   component: Offer,
  // },
  {
    path: `Śluby`,
    render: (props) => <GalleryPage {...props} galleryName="Śluby" />, //eslint-disable-line
  },
  {
    path: `Dzieci`,
    render: (props) => <GalleryPage {...props} galleryName="Dzieci" />, //eslint-disable-line
  },
  {
    path: `Oferta`,
    component: GalleryPage,
  },
  // {
  //   path: `Kontakt`,
  //   component: Contact,
  // },
];

export { routes };
