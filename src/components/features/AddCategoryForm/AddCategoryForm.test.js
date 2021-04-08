import { React } from 'react';
import { shallow } from 'enzyme';
import { AddCategoryFormComponent } from './AddCategoryForm';

describe(`Component AddCategoryForm`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<AddCategoryFormComponent />);
    expect(component).toBeTruthy();
  });
});
