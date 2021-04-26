export interface Auth {
  isAuthenticated: boolean,
  error: string,
  email: string,
  token: string,
  user: {
    userType?: string;
  };
}

export interface Iblog {
  _id:string, title:string, body:string, created_at:string, updated_at:string
}
export interface Store {
  auth: Auth;
  blogs: { blogs: Iblog[] };
}

const mapStoreToProps = (store: Store): Record<string, unknown> => ({
  auth: store.auth,
  blogs: store.blogs.blogs,
});
export default mapStoreToProps;
