import React, { Component, Dispatch } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';
import AdminController from './AdminController';
import commonUtils from '../../lib/commonUtils';

export interface PicData {
  buttonId: string; buttonClick: (e: React.ChangeEvent<EventTarget>) => Promise<string>; title: string; nameId: string;
}
export interface DashboardProps extends RouteComponentProps {
  dispatch: Dispatch<unknown>;
  homeContent: Ibook;
  auth: { token: string };
  books: Record<string, string>[];
  showTable: boolean;
  editPic: Ibook;
  youthPics: Ibook[];
  familyPics: Ibook[];
  otherPics: Ibook[];
  musicPics: Ibook[];
}
type DashboardState = {
  type: string;
  title: string;
  homePageContent: string;
  announcementtitle: string;
  announcementurl: string;
  youthName: string;
  youthURL: string;
  forumId: string;
  showCaption: string;
  firstEdit: boolean;
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
      type: '',
      title: props.homeContent.title || '',
      homePageContent: props.homeContent.comments || '',
      announcementtitle: '',
      announcementurl: '',
      youthName: '',
      youthURL: '',
      forumId: '',
      showCaption: '',
      firstEdit: true,
    };
    this.forms = forms;
    this.onChange = this.onChange.bind(this);
    this.changeHomepage = this.changeHomepage.bind(this);
  }

  componentDidMount(): void { this.commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width); }

  onChange(evt: React.ChangeEvent<HTMLInputElement>): string {
    evt.persist();
    this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value, firstEdit: false }));
    return evt.target.id;
  }

  changeHomepage(): JSX.Element {
    const { title, homePageContent } = this.state;
    const inputParams = {
      type: 'text', label: 'Title', isRequired: false, onChange: this.onChange, value: title, width: '280px',
    };
    return (
      <div className="horiz-scroll">
        <div className="material-content elevation3" style={{ width: '100%', margin: '30px auto' }}>
          <form
            id="post-blog"
            style={{
              textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
            }}
          >
            {this.forms.makeInput(inputParams)}
            <p>&nbsp;</p>
            <label htmlFor="content" style={{ fontSize: '12pt', fontWeight: 'bold' }}>
              Content
              <br />
              {this.controller.editor(homePageContent)}
            </label>
            <div style={{ marginLeft: '2px', marginTop: '10px' }}>
              <button className="btn" style={{ padding: '4px' }} type="button" id="c-h" disabled={false} onClick={this.controller.createBlogAPI}>
                Post Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <div className="page-content" style={{ margin: 'auto', width: '79vw' }}>
        <h1 style={{ textAlign: 'center', marginTop: '10px' }}>
          Post A New Blog
        </h1>
        {this.changeHomepage()}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, null)(AdminDashboard));
