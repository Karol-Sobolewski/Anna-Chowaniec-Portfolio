import { React } from 'react';
import { shallow } from 'enzyme';
import { WorkComponent } from './Work';

describe(`Component Work`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<WorkComponent />);
    expect(component).toBeTruthy();
  });
});
