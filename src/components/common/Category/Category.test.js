import { React } from 'react';
import { shallow } from 'enzyme';
import { CategoryComponent } from './Category';

describe(`Component Category`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<CategoryComponent />);
    expect(component).toBeTruthy();
  });
});
