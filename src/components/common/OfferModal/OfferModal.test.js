import { React } from 'react';
import { shallow } from 'enzyme';
import { OfferModalComponent } from './OfferModal';

describe(`Component OfferModal`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<OfferModalComponent />);
    expect(component).toBeTruthy();
  });
});
