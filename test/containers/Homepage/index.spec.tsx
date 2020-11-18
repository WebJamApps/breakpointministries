/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { Homepage } from '../../../src/containers/Homepage';

const targetRef:any = {};
const wrapper = shallow<Homepage>(<Homepage targetRef={targetRef} width={1000} height={800} />);

describe('Home', () => {
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
});
