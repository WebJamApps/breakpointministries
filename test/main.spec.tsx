
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { MainStack, renderMain } from '../src/main';
import renderer, { act } from 'react-test-renderer';

// jest.mock('../src/providers/Songs.provider', () => function MockedProvider(props: any) {
//   return (<div id="mockWrapper" />);
// });

describe('Main', () => {
  it('renders correctly', () => {
    act(() => {
      const mainStack = renderer.create(<MainStack/>).toJSON();
      expect(mainStack).toMatchSnapshot();
    });
  });
});
