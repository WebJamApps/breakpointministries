
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MainStack } from '../src/main';

describe('Main', () => {
  it('renders correctly', () => {
    act(() => {
      const mainStack = renderer.create(<MainStack />).toJSON();
      expect(mainStack).toMatchSnapshot();
    });
  });
});
