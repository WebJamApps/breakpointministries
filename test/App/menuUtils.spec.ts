/* eslint-disable @typescript-eslint/no-explicit-any */
import menuUtils from '../../src/App/menuUtils';
import { Auth } from '../../src/redux/mapStoreToProps';

describe('menuUtils', () => {
  let r: JSX.Element | null;
  const viewStub: any = {
    googleButtons: () => true,
    makeMenuLink: () => true,
    props: {
      location: { pathname: '/' },
      auth: { token: 'token', isAuthenticated: true, user: { userType: 'Developer' } },
      dispatch: () => Promise.resolve(true),
    },
  };
  it('handles menuItem for GoogleLogin', () => {
    viewStub.props.location.pathname = '/staff';
    const auth: Auth = {
      isAuthenticated: false, email: '', token: '', user: { userType: 'Developer' }, error: '',
    };
    r = menuUtils.continueMenuItem({
      link: '', type: 'googleLogin', auth: true, classname: '', iconClass: '', name: '',
    },
    1, auth, viewStub);
    expect(r).toBe(true);
  });
  it('handles menuItem for GoogleLogout', () => {
    const auth: Auth = {
      isAuthenticated: true, error: '', email: '', token: '', user: { userType: '' },
    };
    r = menuUtils.continueMenuItem({
      link: '', type: 'googleLogout', auth: true, classname: '', iconClass: '', name: '',
    },
    1, auth, viewStub);
    expect(r).toBe(true);
  });
  it('Prevents access to Admin Dashboard when auth user userType is incorrect', () => {
    viewStub.props.auth = { isAuthenticated: true, token: '', user: { userType: 'booya' } };
    r = menuUtils.menuItem({
      name: 'Admin Dashboard', link: '/admin', type: '', auth: true, classname: '', iconClass: '',
    },
    1, viewStub);
    expect(r).toBe(null);
  });
  it('does not display the home page link when on the home page already', () => {
    window.location.pathname = '/';
    viewStub.props.auth = { isAuthenticated: false, token: '', user: { userType: 'booya' } };
    r = menuUtils.menuItem({
      name: 'Home', link: '/', type: '', auth: false, classname: '', iconClass: '',
    },
    1, viewStub);
    expect(r).toBe(null);
  });
});
