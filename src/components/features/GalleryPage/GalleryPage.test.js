import { React } from 'react';
import { shallow } from 'enzyme';
import { GalleryPageComponent } from './GalleryPage';

describe(`Component GalleryPage`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<GalleryPageComponent />);
    expect(component).toBeTruthy();
  });
});
