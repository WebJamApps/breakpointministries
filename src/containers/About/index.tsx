import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';
import mapStoreToProps from '../../redux/mapStoreToProps';

type AboutProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
};

export class About extends React.Component<AboutProps> {
  commonUtils: typeof commonUtils;

  parentRef: React.RefObject<unknown>;

  constructor(props: AboutProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('About', window.screen.width);
  }

  render(): JSX.Element {
    const { width, targetRef } = this.props;
    return (
      <div ref={targetRef}>
        {width >= 900
          ? (
            <div className="page-content">
              <h1 style={{ marginLeft: '1rem' }}>About Me</h1>
              <p style={{ fontSize: '1.6rem', marginLeft: '1rem', marginBottom: '0' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              &nbsp;
              <p style={{ fontSize: '1.6rem', marginLeft: '1rem', marginBottom: '0' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              &nbsp;
              <p style={{ fontSize: '1.6rem', marginLeft: '1rem', marginBottom: '0' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          )
          : (
            <div className="page-content">
              <hr />
              <p style={{ fontSize: '.8rem', marginBottom: '0' }}>&nbsp;</p>
              <p style={{ fontSize: '.8rem', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )}
      </div>
    );
  }
}

export default connect(mapStoreToProps, null)(withResizeDetector(About));
