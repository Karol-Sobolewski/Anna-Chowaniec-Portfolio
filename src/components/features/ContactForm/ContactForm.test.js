import { React } from 'react';
import { shallow } from 'enzyme';
import { ContactFormComponent } from './ContactForm';

describe(`Component ContactForm`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<ContactFormComponent />);
    expect(component).toBeTruthy();
  });
});
