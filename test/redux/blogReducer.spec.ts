import reducer from '../../src/redux/reducers/blogReducer';

describe('blog reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: '', data: [] })).toEqual(
      { blogs: [] },
    );
  });
  it('handles GOT_BLOGS', () => {
    expect(
      reducer(undefined, { type: 'GOT_BLOGS', data: [{ _id: 'asdfasf' }] }),
    ).toEqual(
      { blogs: [{ _id: 'asdfasf' }] },
    );
  });
});
