import { React } from 'react';
import { shallow } from 'enzyme';
import { AboutComponent } from './About';

describe(`Component About`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<AboutComponent />);
    expect(component).toBeTruthy();
  });
});
