import React, { Component, Dispatch } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';
import AdminController from './AdminController';
import commonUtils from '../../lib/commonUtils';

export interface PicData {
  buttonId: string; buttonClick: (e: React.ChangeEvent<EventTarget>) => Promise<string>; title: string; nameId: string;
}
export interface DashboardProps extends RouteComponentProps {
  dispatch: Dispatch<unknown>;
  auth: { token: string };
}
type DashboardState = {
  title: string;
  blogContent: string;
};
export class AdminDashboard extends Component<DashboardProps, DashboardState> {
  commonUtils: { setTitleAndScroll: (pageTitle: string, width: number) => void; };

  controller: AdminController;

  forms: typeof forms;

  constructor(props: DashboardProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.controller = new AdminController(this);
    this.state = {
      title: '', blogContent: '',
    };
    this.forms = forms;
    this.onChange = this.onChange.bind(this);
    this.changeHomepage = this.changeHomepage.bind(this);
  }

  componentDidMount(): void { this.commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width); }

  onChange(evt: React.ChangeEvent<HTMLInputElement>): string { // This is the blog title change event
    evt.persist();
    this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value }));
    return evt.target.id;
  }

  postBlogButton(title: string, blogContent: string): JSX.Element {
    return (
      <div style={{ marginLeft: '2px', marginTop: '10px' }}>
        <button
          className="btn"
          type="button"
          id="c-h"
          disabled={this.controller.validateBlogPost(title, blogContent)}
          onClick={this.controller.createBlogAPI}
        >
          Post Blog
        </button>
      </div>
    );
  }

  changeHomepage(): JSX.Element {
    const { title, blogContent } = this.state;
    const inputParams = {
      type: 'text', label: 'Title', isRequired: false, onChange: this.onChange, value: title, width: '280px',
    };
    return (
      <div className="changeHomepage">
        <form
          id="post-blog"
          style={{
            textAlign: 'left', marginLeft: '4px', maxWidth: '100%',
          }}
        >
          {this.forms.makeInput(inputParams)}
          <p>&nbsp;</p>
          <label className="contentLabel" htmlFor="content">
            Content
            <br />
            {this.controller.editor(blogContent)}
          </label>
          {this.postBlogButton(title, blogContent)}
        </form>
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <div className="page-content">
        <h1 className="admin--header">
          Post A New Blog
        </h1>
        {this.changeHomepage()}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, null)(AdminDashboard));
