import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageAuthorPage} from './ManageAuthorPage';

describe ('Manage Author Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      actions: { saveAuthor: () => { return Promise.resolve(); }},
      author: {authorId: '', firstName: '', lastName: ''}
    };

    const wrapper = mount(<ManageAuthorPage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.firstName).toBe('First Name must be at least 3 characters.');

  });
});
