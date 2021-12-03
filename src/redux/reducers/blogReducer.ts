import type { Iblog } from '../mapStoreToProps';

const initialState = {
  blogs: [],
};

const sortBlogs = (blogs:Iblog[]) => {
  let sortedBlogs = blogs;
  try {
    sortedBlogs = blogs.sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      if (aTime > bTime) return -1;
      if (aTime < bTime) return 1;
      return 0;
    });
  } catch (err) {
    console.log(err);
  }
  return sortedBlogs;
};

const reducer = (action: { type: string; data: Iblog[]; }, state = initialState): { blogs:Iblog[] } => {
  switch (action.type) {
    case 'GOT_BLOGS':
      return {
        ...state,
        blogs: sortBlogs(action.data),
      };
    default:
      return state;
  }
};

export default reducer;
