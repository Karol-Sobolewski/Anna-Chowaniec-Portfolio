import { React } from 'react';
import { shallow } from 'enzyme';
import { LoaderComponent } from './Loader';

describe(`Component Loader`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<LoaderComponent />);
    expect(component).toBeTruthy();
  });
});
