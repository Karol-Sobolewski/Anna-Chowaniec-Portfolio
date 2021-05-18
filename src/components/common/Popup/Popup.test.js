import { React } from 'react';
import { shallow } from 'enzyme';
import { PopupComponent } from './Popup';

describe(`Component Popup`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<PopupComponent />);
    expect(component).toBeTruthy();
  });
});
