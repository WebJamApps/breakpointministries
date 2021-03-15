/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { Homepage } from '../../../src/containers/Homepage';
import BlogEditor from '../../../src/components/BlogEditor';

const testBlogs = [
  { _id: '1', title: 'title1', body: 'body1' }, { _id: '2', title: 'title2', body: 'body2' }, { _id: '3', title: 'title3', body: 'body3' },
  { _id: 'badBlog' },
];
const targetRef:any = {};
const wrapper = shallow<Homepage>(<Homepage targetRef={targetRef} width={1000} height={800} blogs={testBlogs} auth={{ isAuthenticated: false }} />);

describe('Home', () => {
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('renders when authenticated and clicks button to deleteBlog', () => {
    const wrapper2 = shallow<Homepage>(<Homepage
      targetRef={targetRef}
      width={1000}
      height={800}
      blogs={testBlogs}
      auth={{ isAuthenticated: true }}
    />);
    wrapper2.instance().deleteBlog = jest.fn();
    wrapper2.find('#deleteBlogButton1').simulate('click');
    expect(wrapper2.instance().deleteBlog).toHaveBeenCalledWith('1');
  });
  it('renders when authenticated and clicks button to editBlog', () => {
    const wrapper2 = shallow<Homepage>(<Homepage
      targetRef={targetRef}
      width={1000}
      height={800}
      blogs={testBlogs}
      auth={{ isAuthenticated: true }}
    />);
    const testBlog:any = { _id: '123' };
    const editButton = wrapper2.instance().editBlogButton(testBlog);
    editButton.props.onClick();
    expect(wrapper2.contains(<BlogEditor editBlog={testBlog} comp={wrapper2.instance()} />)).toBe(true);
  });
  it('deleteBlog successfully', async () => {
    const saDelete:any = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 200 }) }) }));
    wrapper.instance().superagent.delete = saDelete;
    const r = await wrapper.instance().deleteBlog('1');
    expect(r).toBe('200');
  });
  it('deleteBlog catch  error', async () => {
    const saDelete:any = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    wrapper.instance().superagent.delete = saDelete;
    const r = await wrapper.instance().deleteBlog('1');
    expect(r).toBe('bad');
  });
  it('deleteBlog returns wrong status', async () => {
    const saDelete:any = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 400 }) }) }));
    wrapper.instance().superagent.delete = saDelete;
    const r = await wrapper.instance().deleteBlog('1');
    expect(r).toBe('Failed to delete blog, ');
  });
  it('deleteBlog returns wrong status with message', async () => {
    const saDelete:any = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 400, body: { message: 'id does not exist' } }) }) }));
    wrapper.instance().superagent.delete = saDelete;
    const r = await wrapper.instance().deleteBlog('1');
    expect(r).toBe('Failed to delete blog, id does not exist');
  });
});
