import React, { RefObject } from 'react';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import Superagent from 'superagent';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { withResizeDetector } from 'react-resize-detector';
import CommonUtils from '../../lib/commonUtils';
import mapStoreToProps from '../../redux/mapStoreToProps';
import BlogEditor from '../../components/BlogEditor';
import DefaultFooter from '../../App/Footer';

export interface IBlog { created_at?: string; _id: string; title: string, body: string }

type HomepageProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
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

  constructor(props: HomepageProps) {
    super(props);
    this.parentRef = React.createRef();
    // eslint-disable-next-line react/no-unused-state
    this.state = { editBlog: { title: '', body: '', _id: '' }, referrer: '' };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
    const params = new URLSearchParams(window.location.search);
    this.checkBlogId(params);
  }

  handleEditorChange(body: string): void {
    const { editBlog } = this.state;
    const newEditBlog = { ...editBlog, body };
    // eslint-disable-next-line react/no-unused-state
    this.setState({ editBlog: newEditBlog });
  }

  // TODO here is example for building the link for the share buttons
  // http://localhost:9000/?id=6043ee1df6a24931fd372290

  // eslint-disable-next-line class-methods-use-this
  checkBlogId(params: URLSearchParams): void {
    const myId = params.get('id');
    if (myId) {
      const blog = document.getElementById(myId);
      if (blog)blog.scrollIntoView();
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
    } catch (e) { return `${e.message}`; }
    return this.finishAPI('delete', r);
  }

  async putAPI(): Promise<string> {
    const { editBlog } = this.state;
    const { auth } = this.props;
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/blog/${editBlog._id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ body: editBlog.body, title: editBlog.title });
    } catch (e) { return `${e.message}`; }
    return this.finishAPI('update', r);
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
          {// TODO remove process.env check when feature is working
      /* istanbul ignore next */process.env.NODE_ENV !== 'production' ? this.socialMedia(blog._id) : null
          }
        </div>
      </div>
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

  makeBlogArticle(): JSX.Element {
    const { targetRef, blogs } = this.props;
    console.log(blogs);
    return (
      <>
        <div className="blog-container">
          <div className="blog" ref={targetRef}>
            {blogs && blogs.length > 0 ? blogs.map((blog) => (
              <div key={`blog_entry${blog._id}`} className="blog__entry">
                <section className="blog__entry--body">
                  <h2 className="blog__entry--header" id={blog._id}>
                    {ReactHtmlParser(blog && blog.title ? blog.title : '')}
                  </h2>
                  <div className="blog__entry--button-container">
                    {this.createBlogButtons(blog)}
                  </div>
                  <div className="blog__entry--paragraph">
                    {ReactHtmlParser(blog && blog.body ? blog.body : '')}
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

  // eslint-disable-next-line class-methods-use-this
  makeLink(id: string, type: string): JSX.Element {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
        <li key={`${type}${id}`}>
          <a href="#" className={`blog__social-media--link ${type}`} aria-label={`Link to ${type} page`}>
            <i key={id} className={`fab fa-${type}`} />
          </a>
        </li>
    );
  }

  facebookButton(id: string) {
    return(
      <FacebookShareButton
        url={process.env.NODE_ENV !== 'production' ? 'google.com' : `${process.env.BackendUrl}/blog/?id=${id}`}
      >
        <FacebookIcon round size={26} />
      </FacebookShareButton>
    )
  }

  twitterButton(id: string) {
    return (
      <TwitterShareButton
        url={process.env.NODE_ENV !== 'production' ? 'google.com' : `${process.env.BackendUrl}/blog/?id=${id}`}
      >
        <TwitterIcon round size={26} />
      </TwitterShareButton>
    )
  }

  linkedinButton(id: string) {
    return(
      <LinkedinShareButton
      url={process.env.NODE_ENV !== 'production' ? 'google.com' : `${process.env.BackendUrl}/blog/?id=${id}`}
      >
        <LinkedinIcon round size={26} />
      </LinkedinShareButton>
    )
  }

  socialMedia(id: string): JSX.Element {
    return (
      <div style={{ display: 'grid' }}>
        <ul className="blog__social-media">
          {this.facebookButton(id)}
          {this.twitterButton(id)}
          {this.linkedinButton(id)}
          <li key={`url${id}`}>
            {/*TODO: Add onClick function to copy url into clipboard, a link if need be after.*/}
            <a key={`urll${id}`} href={`/?id=${id}`} className="blog__social-media--link copylink" aria-label="Permanent link to blog posting">
              <i key={id} className="fas fa-link" />
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render(): JSX.Element {
    const { editBlog, referrer } = this.state;
    if (editBlog._id !== '') { return (<BlogEditor comp={this} editBlog={editBlog} />); }
    if (referrer !== '') return <Redirect to={referrer} />;
    return (this.makeBlogArticle());
  }
}

export default connect(mapStoreToProps, null)(withResizeDetector(Homepage));
