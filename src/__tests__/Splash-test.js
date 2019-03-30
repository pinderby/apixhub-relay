import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App.js';
import Splash from '../Splash/Splash.js';

// Splash.js
describe('Splash Component', () => {

  // Initialize wrapper
  const wrapper = mount(<Splash />);

  // App renders without crashing
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // Renders App-header without crashing
  it('Renders App-header without error', () => {
    expect(wrapper.find('.App-header').exists()).toBe(true)
  });
});