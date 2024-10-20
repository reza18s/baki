

import Index from "../pages";
import ComplateProfile from "../pages/Profile/ComplateProfile";
import Profile from "../pages/Profile/profile";
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
  complate_profile: {
    path: '/profile/complate_profile',
    component: ComplateProfile,
  },
};

export default routes;