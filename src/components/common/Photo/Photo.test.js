import { React } from 'react';
import { shallow } from 'enzyme';
import { PhotoComponent } from './Photo';

describe(`Component Photo`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<PhotoComponent />);
    expect(component).toBeTruthy();
  });
});
