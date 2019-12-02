import App from '../containers/app';
import About from '../containers/about';

export default {
  root: {
    path: '/',
    exact: true,
    component: App,
  },
  home: {
    path: '/home',
    component: App,
    navTitle: 'Home',
  },
  about: {
    path: '/about',
    component: About,
    navTitle: 'About',
    routes: [
      {
        path: '/about/sub?title=About-sub-route',
        component: About,
        navTitle: 'about sub page',
      },
    ],
  },
};
