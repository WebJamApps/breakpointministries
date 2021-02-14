import React, { Dispatch } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  GoogleLogin, GoogleLogout, GoogleLoginResponseOffline, GoogleLoginResponse,
} from 'react-google-login';
import { connect } from 'react-redux';
import authUtils from './authUtils';
import mapStoreToProps, { Auth } from '../redux/mapStoreToProps';
import menuUtils from './menuUtils';
import menuItems, { MenuItem } from './menuItems';

interface AppMainProps extends RouteComponentProps {
  children: React.ReactNode;
  auth: Auth;
  dispatch: Dispatch<unknown>;
}

interface CurrentStyles {
  headerClass: string,
  sidebarClass: string,
  sidebarImagePath: string
}

interface AppMainState { menuOpen: boolean }
export class AppTemplate extends React.Component<AppMainProps, AppMainState> {
  static defaultProps = {
    dispatch: /* istanbul ignore next */(): void => { },
    auth: {
      isAuthenticated: false, user: { userType: '' }, email: '', error: '', token: '',
    },
  };

  menuUtils: typeof menuUtils;

  authUtils: typeof authUtils;

  menus: MenuItem[];

  constructor(props: AppMainProps) {
    super(props);
    this.menus = menuItems;
    this.menuUtils = menuUtils;
    this.state = { menuOpen: false };
    this.close = this.close.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyMenu = this.handleKeyMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.navLinks = this.navLinks.bind(this);
    this.responseGoogleLogin = this.responseGoogleLogin.bind(this);
    this.responseGoogleLogout = this.responseGoogleLogout.bind(this);
    this.googleButtons = this.googleButtons.bind(this);
    this.authUtils = authUtils;
  }

  get currentStyles(): CurrentStyles { // eslint-disable-line class-methods-use-this
    const result = {
      headerClass: 'home-header',
      sidebarClass: 'sidebar',
      sidebarImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Lutherrose.svg/800px-Lutherrose.svg.png',
    };
    return result;
  }

  toggleMobileMenu(): void {
    const { menuOpen } = this.state;
    const mO = !menuOpen;
    this.setState({ menuOpen: mO });
  }

  responseGoogleLogin(response: GoogleLoginResponseOffline | GoogleLoginResponse): Promise<string> {
    return this.authUtils.responseGoogleLogin(response, this);
  }

  responseGoogleLogout(): string { const { dispatch } = this.props; return this.authUtils.responseGoogleLogout(dispatch); }

  close(): boolean {
    this.setState({ menuOpen: false });
    return true;
  }

  handleKeyPress(e: { key: string; }): (void | null) {
    if (e.key === 'Escape') return this.setState({ menuOpen: false });
    return null;
  }

  handleKeyMenu(e: { key: string; }): (void | null) {
    if (e.key === 'Enter') return this.toggleMobileMenu();
    return null;
  }

  googleButtons(type: string, index: string | number | undefined): JSX.Element {
    const cId = process.env.GoogleClientId || /* istanbul ignore next */'';
    if (type === 'login') {
      return (
        <div key={index} className="menu-item googleLogin">
          <GoogleLogin
            responseType="code"
            clientId={cId}
            buttonText="Login"
            accessType="offline"
            onSuccess={this.responseGoogleLogin}
            onFailure={this.authUtils.responseGoogleFailLogin}
            cookiePolicy="single_host_origin"
          />
        </div>
      );
    } return (
      <div key={index} className="menu-item googleLogout">
        <GoogleLogout clientId={cId} buttonText="Logout" onLogoutSuccess={this.responseGoogleLogout} />
      </div>
    );
  }

  makeMenuLink(menu: MenuItem, index: number): JSX.Element {
    return (
      <div key={index} className="nav">
        <Link to={menu.link} className="nav__link" onClick={this.close}>
          <i className={`${menu.iconClass}`} />
          &nbsp;
          <span className="nav-item">{menu.name}</span>
        </Link>
      </div>
    );
  }

  navLinks(): JSX.Element {
    return (
      <div className="navigation">
        {this.menus.map((menu, index) => (this.menuUtils.menuItem(menu, index, this)))}
      </div>
    );
  }

  drawerContainer(className: string): JSX.Element {
    return (
      <div className={className}>
        <header className="header">
          <div className="header__border" />
          <div className="header__logo">
            <img
              className="header__logo--picture"
              src="https://dl.dropboxusercontent.com/s/ojwr69z0gbi0zw8/Christ-the-redeemer.png?dl=0"
              alt="A statue of jesus"
            />
            <span className="header__mobile-menu">
              <button className="mobile-menu-btn" onClick={this.close} onKeyPress={this.handleKeyPress} tabIndex={0} type="button">
                <i
                  className="fas fa-bars"
                />
              </button>
            </span>
          </div>
        </header>
        <div className="sidebar__functions">
          <div className="search">
            <h2 className="search__heading heading-2">
              Search
            </h2>
            <form className="search__form" action="get">
              <input className="search__form--input" type="text" role="searchbox" defaultValue="" placeholder="Search..." />
              <input className="btn search__form--btn" type="submit" value="Search" />
            </form>
          </div>
          <div className="subscribe">
            <h2 className="subscribe__heading heading-2">
              Subscribe
            </h2>
            <form className="subscribe__form" action="get">
              <input
                className="subscribe__form--input"
                type="text"
                aria-label="subscribe: Email input"
                defaultValue=""
                placeholder="Email..."
              />
              <input className="btn subscribe__form--btn" type="submit" value="Subscribe" />
            </form>
          </div>
        </div>
        {this.navLinks()}
      </div>
    );
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { menuOpen } = this.state;
    const style = `${this.currentStyles.sidebarClass} ${menuOpen ? 'open' : 'close'}`;
    return (
      <div className="container">
        {this.drawerContainer(style)}
        {children}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, null)(AppTemplate));
