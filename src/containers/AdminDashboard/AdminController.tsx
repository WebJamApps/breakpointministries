import superagent from 'superagent';
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import fetch from '../../lib/fetch';
import type { AdminDashboard } from './index';

class AdminController {
  view: AdminDashboard;

  fetch: typeof fetch;

  superagent: superagent.SuperAgentStatic;

  constructor(view: AdminDashboard) {
    this.fetch = fetch;
    this.view = view;
    this.superagent = superagent;
    this.createBlogAPI = this.createBlogAPI.bind(this);
    this.editor = this.editor.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    // this.createBook = this.createBook.bind(this);
  }

  // async createBook(data: { title: string, comments: string, type: string}, redirect: string): Promise<string> {
  //   const { auth } = this.view.props;
  //   let r;
  //   try { r = await this.fetch.fetchPost(this.superagent, auth, data); } catch (e) { return `${e.message}`; }
  //   if (r.status === 201) {
  //     window.location.assign(redirect);
  //     return `${r.status}`;
  //   }
  //   return 'Failed to create blog';
  // }

  async createBlogAPI(evt: { preventDefault: () => void; }): Promise<string> {
    evt.preventDefault();
    const { auth } = this.view.props;
    const { title, homePageContent } = this.view.state;
    let r;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/blog`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ title, body: homePageContent });
    } catch (e) { return `${e.message}`; }
    if (r.status === 201) {
      window.location.assign('/');
      return `${r.status}`;
    }
    return 'Failed to create blog';
  }

  handleEditorChange(homePageContent: string): boolean { this.view.setState({ homePageContent }); return true; }

  editor(homePageContent: string | undefined): JSX.Element {
    return (
      <Editor
        apiKey={process.env.TINY_KEY}
        initialValue={homePageContent}
        init={{
          height: 500,
          menubar: 'insert tools',
          menu: { format: { title: 'Format', items: 'forecolor backcolor' } },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor forecolor |'
            + 'alignleft aligncenter alignright alignjustify |'
            + 'bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}
export default AdminController;
