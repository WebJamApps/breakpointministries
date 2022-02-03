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
  }

  async createBlogAPI(evt: { preventDefault: () => void; }): Promise<string> {
    evt.preventDefault();
    const { auth } = this.view.props;
    const { title, blogContent } = this.view.state;
    let r;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/blog`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ title, body: blogContent });
    } catch (e: any) { return `${e.message}`; }
    if (r.status === 201) {
      window.location.assign('/');
      return `${r.status}`;
    }
    return 'Failed to create blog';
  }

  // eslint-disable-next-line class-methods-use-this
  validateBlogPost(title: string, blogContent: string): boolean {
    let disabled = true;
    if (title !== '' && blogContent !== '') { disabled = false; }
    return disabled;
  }

  handleEditorChange(blogContent: string): boolean { this.view.setState({ blogContent }); return true; }

  editor(blogContent: string): JSX.Element {
    // const blogC = blogContent || '';
    return (
      <Editor
        apiKey={process.env.TINY_KEY}
        value={blogContent}
        init={{
          height: 600,
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
