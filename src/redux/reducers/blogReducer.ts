import type { Iblog } from '../mapStoreToProps';

const initialState = {
  blogs: [],
};

const sortBlogs = (blogs:Iblog[]) => {
  const sortedBlogs = blogs.sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    if (aTime > bTime) return -1;
    if (aTime < bTime) return 1;
    return 0;
  });
  return sortedBlogs;
};

const reducer = (state = initialState, action: { type: string; data: Iblog[]; }): Record<string, unknown> => {
  switch (action.type) {
    case 'GOT_BLOGS':
      return {
        ...state,
        // blogs: action.data,
        blogs: sortBlogs(action.data),
      };
    default:
      return state;
  }
};

export default reducer;
