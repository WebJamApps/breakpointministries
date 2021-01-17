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
      <div ref={targetRef}>
        {width >= 900
          ? (
            <div className="page-content">
              <p style={{ fontSize: '.8rem', marginBottom: '0' }}>&nbsp;</p>
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

export default connect(mapStoreToProps, null)(withResizeDetector(Homepage));
