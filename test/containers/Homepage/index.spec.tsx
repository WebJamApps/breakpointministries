/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { Homepage } from '../../../src/containers/Homepage';

const testBlogs = [
  { _id: '1', title: 'title1', body: 'body1' }, { _id: '2', title: 'title2', body: 'body2' }, { _id: '3', title: 'title3', body: 'body3' },
  { _id: 'badBlog' },
];
const targetRef:any = {};
const wrapper = shallow<Homepage>(<Homepage targetRef={targetRef} width={1000} height={800} blogs={testBlogs} auth={{ isAuthenticated: false }} />);

describe('Home', () => {
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
});
