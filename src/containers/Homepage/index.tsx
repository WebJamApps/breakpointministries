/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';
import mapStoreToProps from '../../redux/mapStoreToProps';

type HomepageProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
};

interface HomepageState {
  blogs:[]
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

  render(): JSX.Element {
    const { width, targetRef } = this.props;
    return (
      <div className="blog" ref={targetRef}>
        {width >= 900
          ? (
              <div className="blog__entry">
                <section className="blog__entry--body">
                  <h2 className="blog__entry--header heading-2 heading-2">
                    <a href="blog_entry.html" className="blog__link">A Generic Title</a>
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam earum voluptate? Nostrum et fugit
                    possimus cum ratione temporibus aspernatur?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id libero temporibus, at neque facere fugiat.
                  </p>
                  <div className="blog__ender">
                    <div className="blog__time-stamp">1/21/2021</div>
                    <ul className="blog__social-media">
                      <li>
                        <a href="#" className="blog__social-media--link facebook" aria-label="Link to [site] facebook page">
                          <i
                            className="fab fa-facebook"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="blog__social-media--link twitter" aria-label="Link to [site] twitter account">
                          <i
                            className="fab fa-twitter"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="blog__social-media--link linkedin">
                          <i
                            className="fab fa-linkedin"
                            aria-label="Link to [site] linkedin page"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="blog__social-media--link copylink" aria-label="Permanent link to blog posting">
                          <i
                            className="fas fa-link"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
          )
          : (
              <div className="blog__entry">
                <section className="blog__entry--body">
                  <h2 className="blog__entry--header heading-2 heading-2">
                    <a href="blog_entry.html" className="blog__link">A Generic Title</a>
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam earum voluptate? Nostrum et fugit
                    possimus cum ratione temporibus aspernatur?
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id libero temporibus, at neque facere fugiat.
                  </p>
                  <div className="blog__ender">
                    <div className="blog__time-stamp">1/21/2021</div>
                    <ul className="blog__social-media">
                      <li>
                        <a href="#" className="blog__social-media--link facebook" aria-label="Link to [site] facebook page">
                          <i
                            className="fab fa-facebook"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="blog__social-media--link twitter" aria-label="Link to [site] twitter account">
                          <i
                            className="fab fa-twitter"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="blog__social-media--link linkedin">
                          <i
                            className="fab fa-linkedin"
                            aria-label="Link to [site] linkedin page"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="blog__social-media--link copylink" aria-label="Permanent link to blog posting">
                          <i
                            className="fas fa-link"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
          )}
      </div>
    );
  }
}

export default connect(mapStoreToProps, null)(withResizeDetector(Homepage));
