import { expect } from 'chai';

// eslint-disable-next-line import/prefer-default-export
export const click = (wrapper, elementName) => {
  const selector = `.${elementName.replace(/ /g, '-')}`;
  wrapper.find(selector).first().simulate('click');
};

export const containsMessage = (wrapper, elementName, message) => {
  const selector = `.${elementName.replace(/ /g, '-')}`;
  expect(wrapper.find(selector).first().text()).to.contain(message);
};

export const fillInputField = (wrapper, value, field) => {
  wrapper.find(`.${field} input`).first().simulate('change', { target: { value } });
};

export const selectOptionItem = (wrapper, optionIndex, field) => {
  const selector = `.${field.replace(/ /g, '-')} ul li`;
  wrapper.find(selector).at(parseInt(optionIndex, 10) - 1).simulate('click');
};
