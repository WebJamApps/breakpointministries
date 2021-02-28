/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { withResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';
import mapStoreToProps from '../../redux/mapStoreToProps';

type HomepageProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
  blogs: any[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomepageState {

}

export class Homepage extends React.Component<HomepageProps, HomepageState> {
  commonUtils: typeof commonUtils;

  parentRef: React.RefObject<unknown>;

  constructor(props: HomepageProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
    // eslint-disable-next-line react/no-unused-state
    this.state = { };
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
  }

  // eslint-disable-next-line class-methods-use-this
  makeBlogArticle(): JSX.Element {
    const { targetRef, blogs } = this.props;
    return (
      <div className="blog" ref={targetRef}>
        {blogs && blogs.length > 0 ? blogs.map((blog) => (
          <div key={`blog_entry${blog._id}`} className="blog__entry">
            <section className="blog__entry--body">
              <h2 className="blog__entry--header heading-2 heading-2">
                <Link key={blog._id} to={blog._id} className="blog__link">{ReactHtmlParser(blog && blog.title ? blog.title : '')}</Link>
              </h2>
              {ReactHtmlParser(blog && blog.body ? blog.body : '')}
              <div className="blog__ender">
                <div className="blog__time-stamp">{blog.dateOfPub}</div>
                {this.socialMedia(blog._id)}
              </div>
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
    return (
      <li key={`${type}${id}`}>
        <Link to="#" className={`blog__social-media--link ${type}`} aria-label={`Link to [site] ${type} page`}>
          <i key={id} className={`fab fa-${type}`} />
        </Link>
      </li>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  socialMedia(id:string): JSX.Element {
    return (
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
    );
  }

  render(): JSX.Element {
    return (
      this.makeBlogArticle()
    );
  }
}

export default connect(mapStoreToProps, null)(withResizeDetector(Homepage));
