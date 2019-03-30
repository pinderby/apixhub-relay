import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App.js';
import Splash from '../Splash/Splash.js';
import Login from '../Splash/Login.js';
import Signup from '../Splash/Signup.js';

// Splash.js
describe('Splash Component', () => {

  // Initialize wrapper
  const wrapper = mount(<Splash />);

  // App renders without crashing
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // Renders App-header without crashing
  it('Renders App-header without error', () => {
    expect(wrapper.find('.App-header').exists()).toBe(true);
  });

  //////////////
  /// LOG IN ///
  //////////////

  // Initialize wrapper
  const loginWrapper = mount(<Login />);

  // Typing form fields properly updates props
  // it('Typing form fields properly updates props', () => {
  //   // console.log(loginWrapper.find('input[type=\'username\']').debug());
  //   // console.log(loginWrapper.find('input[type=\'username\']').instance());

  //   // loginWrapper.find('input[type=\'username\']').simulate('change', {target: {value: 'hi'}});
  //   // console.log(loginWrapper.find('input[type=\'username\']').get(0).props);
  //   // expect(loginWrapper.state().username).toEqual('hi');
  // });
});