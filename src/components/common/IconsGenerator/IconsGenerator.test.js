import { React } from 'react';
import { shallow } from 'enzyme';
import { IconsGeneratorComponent } from './IconsGenerator';

describe(`Component IconsGenerator`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<IconsGeneratorComponent />);
    expect(component).toBeTruthy();
  });
});
