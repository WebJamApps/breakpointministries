/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard } from '../../../src/containers/AdminDashboard';

describe('Dashboard Container', () => {
  let props: any, wrapper: any;
  const history: any = {};
  const location: any = {};
  const match: any = {};
  const editPic:any = {
    title: '', _id: '', type: '', created_at: '',
  };
  beforeEach(() => {
    props = {
      auth: { token: 'token' },
      books: [{ _id: '123' }],
      youthPics: [{ _id: '456' }],
      familyPics: [{ _id: '789' }],
      otherPics: [{ _id: '999' }],
      homeContent: { title: '', comments: '' },
    };
    wrapper = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      auth={props.auth}
      books={props.books}
      homeContent={props.homeContent}
      showTable
      editPic={editPic}
      history={history}
      location={location}
      match={match}
      youthPics={[]}
      familyPics={[]}
      otherPics={[]}
      musicPics={[]}
    />);
  });
  it('renders correctly', () => { expect(wrapper).toMatchSnapshot(); });

  it('uses the stateValue on change', () => {
    const result = wrapper.instance().onChange({ persist: jest.fn(), target: {} }, 'stateValue');
    expect(result).toBe('stateValue');
  });
});
