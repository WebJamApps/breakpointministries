import React from 'react';
import {
  FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon,
} from 'react-share';
import Superagent from 'superagent';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HtmlReactParser from 'html-react-parser';
import CommonUtils from '../../lib/commonUtils';
import mapStoreToProps from '../../redux/mapStoreToProps';
import BlogEditor from '../../components/BlogEditor';
import DefaultFooter from '../../App/Footer';
import utils from './HomepageUtils';

export interface IBlog { created_at?: string; _id: string; title: string, body: string }

type HomepageProps = {
  blogs: any[];
  auth: any;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomepageState {
  editBlog: IBlog;
  referrer: string;
}

export class Homepage extends React.Component<HomepageProps, HomepageState> {
  public commonUtils: typeof CommonUtils = CommonUtils;

  public superagent: Superagent.SuperAgentStatic = Superagent;

  parentRef: React.RefObject<unknown>;

  utils: typeof utils;

  constructor(props: HomepageProps) {
    super(props);
    this.parentRef = React.createRef();
    // eslint-disable-next-line react/no-unused-state
    this.state = { editBlog: { title: '', body: '', _id: '' }, referrer: '' };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.utils = utils;
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
    const params = new URLSearchParams(window.location.search);
    this.checkBlogId(params);
  }

  async componentDidUpdate(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    this.checkBlogId(params);
  }

  handleEditorChange(body: string): void {
    const { editBlog } = this.state;
    const newEditBlog = { ...editBlog, body };
    // eslint-disable-next-line react/no-unused-state
    this.setState({ editBlog: newEditBlog });
  }

  // eslint-disable-next-line class-methods-use-this
  checkBlogId(params: URLSearchParams): void {
    const myId = params.get('id');
    if (myId) {
      const blog = document.getElementById(myId);
      /*istanbul ignore else*/if (blog)blog.scrollIntoView();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  finishAPI(type: string, r: Superagent.Response):string {
    if (r.status === 200) {
      window.location.reload();
      return `${r.status}`;
    }
    return `Failed to ${type} blog, ${r.body ? r.body.message : ''}`;
  }

  async deleteBlog(id:string): Promise<string> {
    const { auth } = this.props;
    let r;
    try {
      r = await this.superagent.delete(`${process.env.BackendUrl}/blog/${id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json');
    } catch (e: any) { return `${e.message}`; }
    return this.finishAPI('delete', r);
  }

  makeEditBlogSection(blog: IBlog): void { this.setState({ editBlog: blog }); }

  editBlogButton(blog: IBlog): JSX.Element {
    return (
      <button
        id={`editBlogButton${blog._id}`}
        style={{ width: '50px' }}
        type="button"
        onClick={() => this.makeEditBlogSection(blog)}
      >
        Edit
      </button>
    );
  }

  deleteBlogButton(id: string): JSX.Element {
    return (
      <button
        id={`deleteBlogButton${id}`}
        style={{ width: '50px' }}
        type="button"
        onClick={() => this.deleteBlog(id)}
      >
        Delete
      </button>
    );
  }

  addBlogButton(): JSX.Element {
    return (
      <button type="button" id="addBlogButton" onClick={() => this.setState({ referrer: '/admin#admin-top' })}>
        <i className="fa fa-plus" />
      </button>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  blogNotFound(): JSX.Element {
    return (
      <div className="blog__entry">
        <section className="blog__entry--body">
          <p className="blog__entry--no-blogs">There are no blog entries at this time.</p>
        </section>
      </div>
    );
  }

  createBlogButtons(blog: IBlog): JSX.Element {
    const { auth } = this.props;
    const valid = auth.isAuthenticated && auth.user && auth.user.userType;
    return (
      <>
        <span className="blog__entry--button-container__add-blog">{valid ? this.addBlogButton() : null}</span>
        <span className="blog__entry--button-container__delete-blog">
          {valid ? this.deleteBlogButton(blog._id) : null}
        </span>
        <span className="blog__entry--button-container__edit-blog">{valid ? this.editBlogButton(blog) : null}</span>
      </>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  makeSocialMediaButton(TagName: typeof FacebookShareButton | typeof TwitterShareButton | typeof LinkedinShareButton,
    TagIcon: typeof FacebookIcon | typeof TwitterIcon | typeof LinkedinIcon, id:string):JSX.Element {
    const URL = `https://www.changeinchrist.org/?id=${id}`;
    return (
      <TagName
        url={URL}
        style={{ paddingLeft: '.2rem' }}
      >
        <TagIcon round size={26} />
      </TagName>
    );
  }

  socialMedia(id: string): JSX.Element {
    return (
      <ul className="blog__social-media">
        {this.makeSocialMediaButton(FacebookShareButton, FacebookIcon, id)}
        {this.makeSocialMediaButton(TwitterShareButton, TwitterIcon, id)}
        {this.makeSocialMediaButton(LinkedinShareButton, LinkedinIcon, id)}
        {/* <li key={`url${id}`}>
            <a key={`urll${id}`} href={`/?id=${id}`} className="blog__social-media--link copylink" aria-label="Permanent link to blog posting">
              <i key={id} className="fas fa-link" />
            </a>
        </li> */}
      </ul>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  blogEnder(blog: IBlog): JSX.Element {
    let newTime;
    // eslint-disable-next-line prefer-destructuring
    if (blog.created_at !== undefined && blog.created_at !== null) {
      newTime = <Moment format="MM/DD/YYYY hh:mm">{blog.created_at}</Moment>;
    }
    return (
      <div className="blog__ender">
        <div style={{ display: 'inline-block' }}>
          <div className="blog__time-stamp">
            <span>
              Posted: &nbsp;
              {newTime}
            </span>
          </div>
        </div>
      </div>
    );
  }

  makeBlogArticle(): JSX.Element {
    const { blogs } = this.props;
    return (
      <>
        <div className="blog-container">
          <div className="blog">
            {blogs && blogs.length > 0 ? blogs.map((blog) => (
              <div key={`blog_entry${blog._id}`} className="blog__entry">
                <section className="blog__entry--body">
                  <h2 className="blog__entry--header" id={blog._id}>
                    <span style={{ paddingRight: '10px' }}>{HtmlReactParser(blog && blog.title ? blog.title : '')}</span>
                    {this.socialMedia(blog._id)}
                  </h2>
                  <div className="blog__entry--button-container">
                    {this.createBlogButtons(blog)}
                  </div>
                  <div className="blog__entry--paragraph">
                    {HtmlReactParser(blog && blog.body ? blog.body : '')}
                  </div>
                  {this.blogEnder(blog)}
                </section>
              </div>
            ))
              : (
                this.blogNotFound()
              )}
          </div>
        </div>
        <DefaultFooter />
      </>
    );
  }

  render(): JSX.Element {
    const { editBlog, referrer } = this.state;
    if (editBlog._id !== '') { return (<BlogEditor comp={this} editBlog={editBlog} />); }
    if (referrer !== '') return <Redirect to={referrer} />;
    return (this.makeBlogArticle());
  }
}

export default connect(mapStoreToProps, null)(Homepage);
