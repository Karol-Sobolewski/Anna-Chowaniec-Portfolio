import { React } from 'react';
import { shallow } from 'enzyme';
import { AddOfferFormComponent } from './AddOfferForm';

describe(`Component AddOfferForm`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<AddOfferFormComponent />);
    expect(component).toBeTruthy();
  });
});
