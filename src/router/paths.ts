

import Index from "../pages";
import signup from "../pages/signup";
const routes = {
  home: {
    path: "/",
    component: Index
  },
  signup: {
    path: '/signup',
    component: signup,
  }
};

export default routes;