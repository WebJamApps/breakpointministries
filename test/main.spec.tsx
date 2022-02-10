/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MainStack } from '../src/main';
import renderer, { act } from 'react-test-renderer';

describe('Main', () => {
  it('renders correctly', () => {
    act(() => {
      const mainStack = renderer.create(<MainStack/>).toJSON();
      expect(mainStack).toMatchSnapshot();
    });
  });
});