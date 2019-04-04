import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/*
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />); 
  if (state) wrapper.setState(state);
  return wrapper;
}

/*
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of dtat-test attribute for search.
 * @returns {ShallowWrapper}
*/
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`)

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('click button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

// Decrement Counter Button
test('render decrement button', () => {
  const wrapper = setup();
  const decButton = findByTestAttr(wrapper, 'decrement-button');
  expect(decButton.length).toBe(1);
});

test('error message not displayed initially', () => {
  const wrapper = setup();
  const errMsg = findByTestAttr(wrapper, 'error-msg');
  expect(errMsg.length).toBe(0);
});

test('decrement button decrements by 1', () => {
  const wrapper = setup(null, {
    counter: 7,
    error: null
  });
  const decButton = findByTestAttr(wrapper, 'decrement-button');
  decButton.simulate('click');
  expect(wrapper.state('counter')).toBe(6);
});

test('count still zero when error is displayed', () => {
  const wrapper = setup(null, {
    counter: 0,
    error: null
  });
  const decButton = findByTestAttr(wrapper, 'decrement-button');
  decButton.simulate('click');
  wrapper.update();
  expect(wrapper.state('counter')).toBe(0);
});

test('displays error when trying to decrement below zero', () => {
  const wrapper = setup(null, {
    counter: 0,
    error: null
  });
  const decButton = findByTestAttr(wrapper, 'decrement-button');
  decButton.simulate('click');
  wrapper.update();
  const errMsg = findByTestAttr(wrapper, 'error-msg');
  expect(errMsg.length).toBeGreaterThan(0);
});

test('removes error when incrementing from zero, given it is already displayed', () => {
  const wrapper = setup(null, {
    counter: 0,
    error: "You can't go below zero."
  });
  const incButton = findByTestAttr(wrapper, 'increment-button');
  incButton.simulate('click');
  wrapper.update();
  expect(wrapper.state("error")).toBeNull();
  const errMsg = findByTestAttr(wrapper, 'error-msg');
  expect(errMsg.length).toBe(0);
});