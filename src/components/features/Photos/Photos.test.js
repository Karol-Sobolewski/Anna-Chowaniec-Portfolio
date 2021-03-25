import { React } from 'react';
import { shallow } from 'enzyme';
import { PhotosComponent } from './Photos';

describe(`Component Photos`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<PhotosComponent />);
    expect(component).toBeTruthy();
  });
});
