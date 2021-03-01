const initialState = {
  blogs: [],
};

const reducer = (state = initialState, action: { type: string; data: any[]; }): Record<string, unknown> => {
  switch (action.type) {
    case 'GOT_BLOGS':
      return {
        ...state,
        blogs: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
