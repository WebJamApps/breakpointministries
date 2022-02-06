/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { act } from 'react-dom/test-utils';
import { renderMain } from '../src/main';

describe('Main', () => {
  it('renders correctly', () => {
    act(() => {
      renderMain();
    });
  });
});
