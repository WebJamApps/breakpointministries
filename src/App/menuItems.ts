export interface MenuItem {
  classname: string,
  type: string,
  iconClass: string,
  link: string,
  name: string,
  auth?: boolean,
}
const menuItems = [{
  classname: 'dashboard',
  type: 'link',
  iconClass: 'fas fa-user-secret',
  link: 'admin',
  name: 'Admin Dashboard',
  auth: true,
},
{
  classname: 'home',
  type: 'link',
  iconClass: 'fas fa-home',
  link: '/',
  name: 'Home',
},
{
  classname: 'login',
  type: 'googleLogin',
  iconClass: 'fas fa-login',
  link: '',
  name: 'Login',
},
{
  classname: 'logout',
  type: 'googleLogout',
  iconClass: 'fas fa-logout',
  link: '',
  name: 'Logout',
  auth: true,
},
];
export default menuItems;
