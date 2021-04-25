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

interface AppMainState { menuOpen: boolean, containerOpen: boolean }
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
    this.state = { menuOpen: false, containerOpen: true };
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

  toggleMobileMenu(): void {
    const { menuOpen, containerOpen } = this.state;
    const mO = !menuOpen;
    const cO = !containerOpen;
    this.setState({ menuOpen: mO, containerOpen: cO });
  }

  responseGoogleLogin(response: GoogleLoginResponseOffline | GoogleLoginResponse): Promise<string> {
    return this.authUtils.responseGoogleLogin(response, this);
  }

  responseGoogleLogout(): string { const { dispatch } = this.props; return this.authUtils.responseGoogleLogout(dispatch); }

  close(): boolean {
    this.setState({ menuOpen: false, containerOpen: true });
    return true;
  }

  handleKeyPress(e: { key: string; }): (void | null) {
    if (e.key === 'Escape') return this.setState({ menuOpen: false, containerOpen: true });
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
            icon={false}
            className="googleLoginButton"
            buttonText="Login"
            accessType="offline"
            onSuccess={this.responseGoogleLogin}
            onFailure={this.authUtils.responseGoogleFailLogin}
            cookiePolicy="single_host_origin"
          >
            <i className="fab fa-google"> Login</i>
          </GoogleLogin>
        </div>
      );
    } return (
      <div key={index} className="menu-item googleLogout">
        <GoogleLogout className="googleLogoutButton" clientId={cId} icon={false} buttonText="Logout" onLogoutSuccess={this.responseGoogleLogout}>
          <i className="fab fa-google"> Logout</i>
        </GoogleLogout>
      </div>
    );
  }

  makeMenuLink(menu: MenuItem, index: number): JSX.Element {
    return (
      <div key={index} className="nav">
        <Link to={menu.link} className="nav__link" onClick={this.close} style={{ padding: '0px' }}>
          <i className={`${menu.iconClass}`} />
          &nbsp;
          <span className="nav-item">{menu.name}</span>
        </Link>
      </div>
    );
  }

  navLinks(className: string): JSX.Element {
    return (
      <div className={`navigation ${className}`}>
        {this.menus.map((menu, index) => (this.menuUtils.menuItem(menu, index, this)))}
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  makeForm(h2Text: string): JSX.Element {
    const cN = h2Text.toLowerCase();
    const h2cN = `${cN}__heading heading-2`;
    const fcN = `${cN}__form`;
    const icN = `${cN}__form--input`;
    const iB = `btn ${cN}__form--btn`;
    const pH = `${h2Text}...`;
    return (
      <div className={cN}>
        <h2 className={h2cN}>{h2Text}</h2>
        <form className={fcN} action="get">
          <input className={icN} type="text" role="searchbox" defaultValue="" placeholder={pH} />
          <input className={iB} type="submit" value={h2Text} />
        </form>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  sidebar(className: string): JSX.Element {
    return (
      <div className={`${className} sidebar__functions`}>
        {// TODO remove process.env check when feature is working
        /* istanbul ignore next */process.env.NODE_ENV !== 'production'
        ? this.makeForm('Search') : null
        }
        {// TODO remove process.env check when feature is working
        /* istanbul ignore next */process.env.NODE_ENV !== 'production'
        ? this.makeForm('Subscribe') : null
        }
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  headerLogo2(): JSX.Element {
    return (
      <div className="header__logo--logo-2">
        <img
          className="header__logo--picture-2"
          src="https://dl.dropboxusercontent.com/s/0o9m9sggpgiooft/ChristTheRedeemerResized.png?dl=0"
          alt="A statue of jesus"
        />
      </div>
    );
  }

  drawerHeader(className: string): JSX.Element {
    return (
      <header className="header">
        <div className="header__logo">
          <img
            className="header__logo--picture"
            src="https://dl.dropbox.com/s/befh330hypey44l/fish%20with%20color.png?dl=0"
            alt="The Jesus Fish with a multi-coloured background"
          />
          <span
            className={`${className} header__mobile-menu`}
            onClick={this.toggleMobileMenu}
            onKeyPress={this.handleKeyMenu}
            tabIndex={0}
            role="button"
          >
            <span className="header__mobile-menu--icon" />
          </span>
          <span className="header__title">
            <h2>Change In Christ</h2>
          </span>
        </div>
      </header>
    );
  }

  drawerContainer(className: string): JSX.Element {
    const { menuOpen } = this.state; const style = `${menuOpen ? 'open' : 'close'}`;
    return (
      <div className={`${className} sidebar`}>
        <div className="sidebar__content">
          {this.drawerHeader(style)}
          {this.sidebar(style)}
          {this.navLinks(style)}
          {this.headerLogo2()}
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const { menuOpen, containerOpen } = this.state; const style = `${menuOpen ? 'open' : 'close'}`;
    const style2 = `${containerOpen ? 'open' : 'close'}`;
    const { children } = this.props;
    return (
      <div className={`${style2} container`}>
        {this.drawerContainer(style)}
        {children}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, null)(AppTemplate));
