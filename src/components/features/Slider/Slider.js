import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/captioned.css';
import styles from './Slider.module.scss';

const Component = ({ className }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const Homepage = useSelector((state) => state.Homepage);

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.container}>
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
      </Container>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   someProp: reduxSelector(state);
// })

// const mapDispatchToProps = (dispatch) => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),

//   const container = connect(mapStateToProps, mapStateToProps)(Component);
// })

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Slider,
  // Container as Slider,
  Component as SliderComponent,
};
