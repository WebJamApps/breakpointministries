/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import authUtils from '../../src/App/authUtils';
import commonUtils from '../../src/lib/commonUtils';

describe('authUtils', () => {
  const vStub: any = {
    props: { auth: { token: 'token' }, dispatch: () => Promise.resolve(true) },
  };
  it('is defined', () => {
    expect(authUtils).toBeDefined();
  });
  it('logs out when not /dashboard', () => {
    const r = authUtils.responseGoogleLogout(() => { });
    expect(r).toBe('reload');
  });
  it('handles failed login', () => {
    const result = authUtils.responseGoogleFailLogin('no way');
    expect(result).toBe('no way');
  });
  it('handles google login with bad token', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.resolve({ body: '123' }) }) });
    superagent.post = jest.fn(() => postReturn);
    const res = await authUtils.responseGoogleLogin({ code: '' }, vStub);
    expect(res).toBe('jwt malformed');
  });
  it('handles google login with authenticate error', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) });
    superagent.post = jest.fn(() => postReturn);
    const res = await authUtils.responseGoogleLogin({ code: '' }, vStub);
    expect(res).toBe('bad');
  });
  it('sets the user', async () => {
    const verifyMock:any = jest.fn(() => ('123'));
    jwt.verify = verifyMock;
    const returnBody: Record<string, unknown> = { body: { userType: commonUtils.getUserRoles()[0] } };
    const sa: any = superagent;
    sa.get = () => ({ set: () => ({ set: () => Promise.resolve(returnBody) }) });
    const result = await authUtils.setUser(vStub);
    expect(result).toBe('user set');
  });
  it('does not set the user when userType is not correct', async () => {
    const verifyMock:any = jest.fn(() => ('123'));
    jwt.verify = verifyMock;
    const returnBody: Record<string, unknown> = { body: { userType: 'bogus' } };
    const sa: any = superagent;
    sa.get = () => ({ set: () => ({ set: () => Promise.resolve(returnBody) }) });
    const result = await authUtils.setUser(vStub);
    expect(result).toBe('invalid userType');
  });
  it('sets the user fails to decode the token', async () => {
    jwt.verify = jest.fn(() => { throw new Error('bad'); });
    vStub.props.auth = {};
    const result = await authUtils.setUser(vStub);
    expect(result).toBe('bad');
    vStub.props.auth = { token: 'token' };
  });
  it('sets the user to the already decoded user', async () => {
    const verify: any = jest.fn(() => ({ user: { userType: JSON.parse(process.env.userRoles || '{}').roles[0] }, sub: '' }));
    jwt.verify = verify;
    window.location.reload = jest.fn();
    const cStub3: any = {
      props: { auth: { token: 'token' }, dispatch: (obj: any) => { expect(obj.type).toBe('SET_USER'); } },
    };
    const result = await authUtils.setUser(cStub3);
    expect(result).toBe('user set');
  });
  it('catches fetch user error when sets the user', async () => {
    const verifyMock:any = jest.fn(() => ('123'));
    jwt.verify = verifyMock;
    const sa: any = superagent;
    sa.get = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    const res = await authUtils.setUser(vStub);
    expect(res).toBe('bad');
  });
  it('logs out when /admin', () => {
    Object.defineProperty(window, 'location', { value: { reload: jest.fn(), assign: jest.fn(), href: '/admin' }, writable: true });
    const r = authUtils.responseGoogleLogout(() => { });
    expect(r).toBe('assign');
  });
});
