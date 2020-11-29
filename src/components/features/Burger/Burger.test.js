import { React } from 'react';
import { shallow } from 'enzyme';
import { BurgerComponent } from './Burger';

describe(`Component Burger`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<BurgerComponent />);
    expect(component).toBeTruthy();
  });
});
