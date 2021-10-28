/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import BlogEditor from '../../../src/components/BlogEditor';
import { IBlog } from '../../../src/containers/Homepage';

describe('Dashboard Container', () => {
  let wrapper:ShallowWrapper<any>, compStub: any, editBlog:IBlog;
  beforeEach(() => {
    editBlog = { title: '', _id: '123', body: '' };
    compStub = {
      setState: jest.fn(),
      utils: { putAPI: jest.fn() },
    };
    wrapper = shallow<typeof BlogEditor>(<BlogEditor
      comp={compStub}
      editBlog={editBlog}
    />);
  });
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('handles onChange for blog title', () => {
    const myForm = wrapper.find('#update-blog123');
    myForm.find('#blogtitle').simulate('change', { target: { value: 'howdy' } });
    expect(compStub.setState).toHaveBeenCalledWith({ editBlog: { title: 'howdy', _id: '123', body: '' } });
  });
  it('handles click for update-blog-button', () => {
    const myForm = wrapper.find('#update-blog123');
    const buttonDiv = myForm.find('#update-blog-button-div');
    buttonDiv.find('#update-blog-button').simulate('click');
    expect(compStub.utils.putAPI).toHaveBeenCalled();
  });
  it('handles click for cancel-blog-update-button', () => {
    const myForm = wrapper.find('#update-blog123');
    const buttonDiv = myForm.find('#update-blog-button-div');
    buttonDiv.find('#cancel-blog-update-button').simulate('click');
    expect(compStub.setState).toHaveBeenCalled();
  });
});
