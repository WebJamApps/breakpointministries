/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';

type HomepageProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
};

interface HomepageState {
  blogs: Ibook[];
}

export class Homepage extends React.Component<HomepageProps, HomepageState> {
  commonUtils: typeof commonUtils;

  parentRef: React.RefObject<unknown>;

  constructor(props: HomepageProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
    // eslint-disable-next-line react/no-unused-state
    this.state = { blogs: [] };
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
  }

  // eslint-disable-next-line class-methods-use-this
  makeBlogArticle(): JSX.Element {
    const { targetRef } = this.props;
    const { blogs } = this.state;
    return (
      <div className="blog" ref={targetRef}>
        {blogs.map((blog) => (
          <div className="blog__entry">
            <section className="blog__entry--body">
              <h2 className="blog__entry--header heading-2 heading-2">
                <Link to={blog._id} className="blog__link">{blog.title}</Link>
              </h2>
              {blog.body}
              <div className="blog__ender">
                <div className="blog__time-stamp">{blog.dateOfPub}</div>
                {this.socialMedia()}
              </div>
            </section>
          </div>
        ))}
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  socialMedia():JSX.Element {
    return (
      <ul className="blog__social-media">
        <li>
          <Link to="#" className="blog__social-media--link facebook" aria-label="Link to [site] facebook page">
            <i className="fab fa-facebook" />
          </Link>
        </li>
        <li>
          <Link to="#" className="blog__social-media--link twitter" aria-label="Link to [site] twitter account">
            <i className="fab fa-twitter" />
          </Link>
        </li>
        <li>
          <Link to="#" className="blog__social-media--link linkedin">
            <i className="fab fa-linkedin" aria-label="Link to [site] linkedin page" />
          </Link>
        </li>
        <li>
          <Link to="#" className="blog__social-media--link copylink" aria-label="Permanent link to blog posting">
            <i className="fas fa-link" />
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
