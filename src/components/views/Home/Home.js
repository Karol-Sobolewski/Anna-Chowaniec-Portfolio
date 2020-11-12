import React from 'react';
import { useSelector } from 'react-redux';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
// import withCaption from 'react-awesome-slider/dist/captioned';

import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/captioned.css';
import Section from '../../layout/Section/Section';
import styles from './Home.module.scss';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Home = () => {
  const Homepage = useSelector((state) => state.Homepage);
  return (
    <Section>
      <AutoplaySlider
        play
        cancelOnInteraction={false}
        interval={6000}
        className={styles.slider}
        cssModule={styles}
        bullets={false}
        fillParent
      >
        {Homepage.images.map((image) => (
          <div key={image.id} data-src={image.src}>
            <div className={styles.caption}>
              <p>{image.title}</p>
            </div>
          </div>
        ))}
      </AutoplaySlider>
      {/* Homepage.images.map(image => (
        <img key={image.id} src={image.src} title={image.title} />
      )) */}
    </Section>
  );
};

export default Home;
