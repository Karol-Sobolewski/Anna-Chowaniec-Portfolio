import { React } from 'react';
import { shallow } from 'enzyme';
import { ChildrenComponent } from './Children';

describe('Component Children', () => {
  it('should render without crashing', () => {
    const component = shallow(<ChildrenComponent />);
    expect(component).toBeTruthy();
  });
});
