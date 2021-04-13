import { React } from 'react';
import { shallow } from 'enzyme';
import { SliderSelectorComponent } from './SliderSelector';

describe(`Component SliderSelector`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<SliderSelectorComponent />);
    expect(component).toBeTruthy();
  });
});
