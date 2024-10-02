

import Index from "../pages";
import login from "../pages/login";
const routes = {
  home: {
    path: "/",
    component: Index
  },
    login: {
      path: '/login',
      component: login,
    }
  };
  
  export default routes;