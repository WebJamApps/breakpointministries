import reducer from '../../src/redux/reducers/blogReducer';

describe('blog reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: '', data: [] })).toEqual(
      { blogs: [] },
    );
  });
  it('handles GOT_BLOGS', () => {
    const blogsArr = [{
      _id: 'asdfasf', title: '', body: '', created_at: '2021-04-26T11:04:45.120Z', updated_at: '',
    },
    {
      _id: 'bbbb', title: '', body: '', created_at: '2020-04-26T11:04:45.120Z', updated_at: '',
    },
    {
      _id: 'cccc', title: '', body: '', created_at: '2022-04-26T11:04:45.120Z', updated_at: '',
    },
    {
      _id: 'dddd', title: '', body: '', created_at: '2022-04-26T11:04:45.120Z', updated_at: '',
    },
    ];
    expect(reducer(undefined, { type: 'GOT_BLOGS', data: blogsArr }).blogs.length).toBe(4);
  });
});
