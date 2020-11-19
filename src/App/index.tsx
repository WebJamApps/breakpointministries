import superagent from 'superagent';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import commonUtils from '../lib/commonUtils';
import AdminDashboardDefault from '../containers/AdminDashboard';
import AppFourOhFour from './404';
import AppTemplateDefault from './AppTemplate';
import DefaultHome from '../containers/Homepage';
import mapStoreToProps from '../redux/mapStoreToProps';
import fetch from '../lib/fetch';
import { AppProps } from './AppTypes';

export class App extends Component<AppProps> {
  fetch: typeof fetch;

  superagent: superagent.SuperAgentStatic;

  static defaultProps = {
    dispatch: /* istanbul ignore next */(): void => { },
    auth: {
      isAuthenticated: false,
      user: { userType: '' },
      error: '',
      email: '',
      token: '',
    },
  };

  constructor(props: AppProps) {
    super(props);
    this.fetch = fetch;
    this.state = {};
    this.superagent = superagent;
  }

  componentDidMount(): void { // fetch the blogs to populate homepage content
    this.fetch.fetchGet(this, 'blog/', 'GOT_BLOGS');
  }

  render(): JSX.Element {
    const { auth } = this.props;
    const userRoles: string[] = commonUtils.getUserRoles();
    return (
      <div id="App" className="App">
        <Router>
          <AppTemplateDefault>
            <Switch>
              <Route exact path="/" component={DefaultHome} />
              {auth.isAuthenticated && auth.user.userType && userRoles.indexOf(auth.user.userType) !== -1
                ? <Route path="/admin" component={AdminDashboardDefault} /> : null}
              <Route component={AppFourOhFour} />
            </Switch>
          </AppTemplateDefault>
        </Router>
      </div>

    );
  }
}

export default connect(mapStoreToProps, null)(App);
