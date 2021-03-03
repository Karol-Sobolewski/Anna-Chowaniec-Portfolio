import { React } from 'react';
import { shallow } from 'enzyme';
import { EditButtonComponent } from './EditButton';

describe(`Component EditButton`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<EditButtonComponent />);
    expect(component).toBeTruthy();
  });
});
