/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminController from '../../../src/containers/AdminDashboard/AdminController';

describe('AdminController', () => {
  let r: any, controller: any,
    vStub: { setState: jest.Mock<any, any>;
      forms: { makeDropdown: () => any; };
      state: { title: string; homePageContent: string; youthURL: string; type: string; };
      props: { auth: { token: string; }; editPic: any; dispatch: (fun: any) => any; }; };
  beforeEach(() => {
    vStub = {
      setState: jest.fn(),
      forms: { makeDropdown: () => null },
      state: {
        title: 'Exciting News!', homePageContent: 'Lots of stuff here!', youthURL: 'url', type: 'youthPics',
      },
      props: { auth: { token: 'token' }, editPic: {}, dispatch: (fun) => fun },
    };
    controller = new AdminController(vStub as any);
  });

  it('creates a new blog', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 201 }) }) }) }));
    Object.defineProperty(window, 'location', { value: { assign: () => { } }, writable: true });
    window.location.assign = jest.fn();
    r = await controller.createBlogAPI({ preventDefault: () => { } });
    expect(r).toBe('201');
    expect(window.location.assign).toHaveBeenCalled();
  });

  it('catches error when creates a new blog', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
    r = await controller.createBlogAPI({ preventDefault: () => { } });
    expect(r).toBe('bad');
  });

  it('handles 300 res from creates a new blog', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 300 }) }) }) }));
    r = await controller.createBlogAPI({ preventDefault: () => { } });
    expect(r).toBe('Failed to create blog');
  });

  it('handles change within the tinymce editor', () => {
    r = controller.handleEditorChange('howdy');
    expect(r).toBe(true);
  });
  it('validateBlogPost', () => {
    expect(controller.validateBlogPost('howdy', 'hola')).toBe(false);
  });
});
