import { React } from 'react';
import { shallow } from 'enzyme';
import { ImageUploadFormComponent } from './ImageUploadForm';

describe(`Component ImageUploadForm`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<ImageUploadFormComponent />);
    expect(component).toBeTruthy();
  });
});
