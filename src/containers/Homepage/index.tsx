import React, { RefObject } from 'react';
import Superagent from 'superagent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { withResizeDetector } from 'react-resize-detector';
import CommonUtils from '../../lib/commonUtils';
import mapStoreToProps from '../../redux/mapStoreToProps';

type HomepageProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
  blogs: any[];
  auth: any;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomepageState {

}

export class Homepage extends React.Component<HomepageProps, HomepageState> {
  public commonUtils: typeof CommonUtils = CommonUtils;

  public superagent: Superagent.SuperAgentStatic = Superagent;

  parentRef: React.RefObject<unknown>;

  constructor(props: HomepageProps) {
    super(props);
    this.parentRef = React.createRef();
    // eslint-disable-next-line react/no-unused-state
    this.state = { };
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
  }

  async deleteBlog(id:string): Promise<string> {
    const { auth } = this.props;
    let r;
    try {
      r = await this.superagent.delete(`${process.env.BackendUrl}/blog/${id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json');
    } catch (e) { return `${e.message}`; }
    if (r.status === 200) {
      window.location.reload();
      return `${r.status}`;
    }
    return `Failed to delete blog, ${r.body ? r.body.message : ''}`;
  }

  deleteBlogButton(id:string):JSX.Element {
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

  blogEnder(blog: { dateOfPub: React.ReactNode; _id: string; }, auth: { isAuthenticated: boolean; }):JSX.Element {
    return (
      <div className="blog__ender">
        <div style={{ display: 'inline-block' }}>
          <div className="blog__time-stamp">{blog.dateOfPub}</div>
          <div style={{ display: 'inline-block', marginRight: '20px', marginTop: '10px' }}>
            {auth.isAuthenticated
              ? this.deleteBlogButton(blog._id)
              : null}
          </div>
          {// TODO remove process.env check when feature is working
      /* istanbul ignore next */process.env.NODE_ENV !== 'production' ? this.socialMedia(blog._id) : null
      }
        </div>
      </div>
    );
  }

  makeBlogArticle(): JSX.Element {
    const { targetRef, blogs, auth } = this.props;
    return (
      <div className="blog" ref={targetRef}>
        {blogs && blogs.length > 0 ? blogs.map((blog) => (
          <div key={`blog_entry${blog._id}`} className="blog__entry">
            <section className="blog__entry--body">
              <h2 className="blog__entry--header">
                <Link key={blog._id} to={blog._id} className="blog__link">{ReactHtmlParser(blog && blog.title ? blog.title : '')}</Link>
              </h2>
              {ReactHtmlParser(blog && blog.body ? blog.body : '')}
              {this.blogEnder(blog, auth)}
            </section>
          </div>
        ))
          : (
            <div className="blog__entry">
              <section className="blog__entry--body">
                <p>There are no blog entries at this time.</p>
              </section>
            </div>
          )}
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  makeLink(id:string, type:string): JSX.Element {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      <li key={`${type}${id}`}>
        <Link to="#" className={`blog__social-media--link ${type}`} aria-label={`Link to ${type} page`}>
          <i key={id} className={`fab fa-${type}`} />
        </Link>
      </li>
    );
  }

  socialMedia(id:string): JSX.Element {
    return (
      <div style={{ display: 'inline-block' }}>
        <ul className="blog__social-media">
          {this.makeLink(id, 'facebook')}
          {this.makeLink(id, 'twitter')}
          {this.makeLink(id, 'linkedin')}
          <li key={`url${id}`}>
            <Link key={`urll${id}`} to="#" className="blog__social-media--link copylink" aria-label="Permanent link to blog posting">
              <i key={id} className="fas fa-link" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  render(): JSX.Element {
    return (this.makeBlogArticle());
  }
}

export default connect(mapStoreToProps, null)(withResizeDetector(Homepage));
