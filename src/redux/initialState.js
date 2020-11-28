export default {
  Menu: {
    items: [
      { title: `Fotografia ślubna`, src: `slub`, component: `Wedding` },
      { title: `Fotografia dziecięca`, src: `dzieci`, component: `Children` },
      { title: `Fotografia portretowa`, src: `portret`, component: `Portrait` },
      { title: `Oferta`, src: `oferta`, component: `Offer` },
      { title: `Kontakt`, src: `kontakt`, component: `Contact` },
    ],
  },
  Homepage: {
    title: `Anna Chowaniec Portfolio`,
    images: [
      { src: `/images/photos/splash/DSC_0087.jpg`, title: `title photo 1` },
      { src: `/images/photos/splash/DSC_0901.jpg`, title: `title photo 2` },
      { src: `/images/photos/splash/DSC_1881.jpg`, title: `title photo 3` },
    ],
  },
  About: {
    image: { src: `/images/photos/me.jpg`, title: `Anna Chowaniec` },
    description: `Hej, nazywam się Anna Chowaniec i jestem fotografem.`,
  },
};
