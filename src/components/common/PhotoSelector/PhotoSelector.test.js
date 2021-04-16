import { React } from 'react';
import { shallow } from 'enzyme';
import { PhotoSelectorComponent } from './PhotoSelector';

describe(`Component PhotoSelector`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<PhotoSelectorComponent />);
    expect(component).toBeTruthy();
  });
});
