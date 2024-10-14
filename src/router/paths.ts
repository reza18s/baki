

import Index from "../pages";
import Profile from "../pages/profile";
import Signup from "../pages/signup";
const routes = {
  home: {
    path: "/",
    component: Index
  },
  signup: {
    path: '/signup',
    component: Signup,
  },
  profile: {
    path: '/profile',
    component: Profile,
  },
};

export default routes;