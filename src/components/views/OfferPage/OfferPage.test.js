import { React } from 'react';
import { shallow } from 'enzyme';
import { OfferPageComponent } from './OfferPage';

describe(`Component OfferPage`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<OfferPageComponent />);
    expect(component).toBeTruthy();
  });
});
