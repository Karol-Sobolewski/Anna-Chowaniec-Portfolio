import { React } from 'react';
import { shallow } from 'enzyme';
import { DashboardComponent } from './Dashboard';

describe(`Component Dashboard`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<DashboardComponent />);
    expect(component).toBeTruthy();
  });
});
