import {
  AnimationBuilder,
  createAnimation,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import MainLayout from './MainLayout';
import { paths } from './paths';
import Explore from '@/pages/Explore';
import Welcome from '@/pages/welcome';
import Signup from '@/pages/signup';
import EditProfile from '@/pages/Profile/editProfile';
import Filter from '@/pages/Explore/Filter';
import CompleteProfile from '@/pages/Profile/ComplateProfile';
import AppGuard from './AppGaurd';
import { Notifications } from '@/pages/notifications/notifications';
import IdentityVerification from '@/components/Profile/IdentityVerification';
import CompletePictures from '@/components/Profile/CompletePictures';
import CompleteTravelInterests from '@/components/Profile/CompleteTravelInterests';
import CompletePersonalInterests from '@/components/Profile/CompletePersonalInterests';
import CompleteProvinces from '@/components/Profile/CompleteProvinces';
import CompleteSpecialty from '@/components/Profile/CompleteSpecialty';
import BasicInformations from '@/components/Profile/BasicInformations/BasicInformations';
import { Profile } from '@/pages/Profile/profile';
import { Settings } from '@/pages/settings/settings';
import { Support } from '@/pages/settings/support/support';
import { Bills } from '@/pages/settings/bills';
import { Questions } from '@/pages/settings/support/questions';
import { LoaderPage } from '@/components/base/Loader/LoaderPage';
import { ContactSupport } from '@/pages/settings/support/contactSupport';
import { AboutUs } from '@/pages/settings/support/aboutUs';
import { Guide } from '@/pages/settings/guide/guide';
import { SearchTypeGuide } from '@/pages/settings/guide/SearchTypeGuide';
import { CommunicationGuide } from '@/pages/settings/guide/communicationGuide';
import { Plans } from '@/pages/plans/plans';
import { Confirm } from '@/pages/plans/confirm';
import { FreePlan } from '@/pages/plans/freePlan';
import { Chat } from '@/pages/chat/chat';
import { Blocked } from '@/pages/blocked/blocked';
import { Favorite } from '@/pages/favorite/favorite';
import { Search } from '@/pages/chat/search';
import { ContactPage } from '@/pages/chat/contact';
import { UserProfile } from '@/pages/Profile/UserProfile';
import { Subs } from './subs';
export const zoomInAnimation: AnimationBuilder = (baseEl, opts) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo('transform', 'scale(0.9)', 'scale(1)')
    .fromTo('opacity', 0.01, 1);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo('transform', 'scale(1)', 'scale(0.9)')
    .fromTo('opacity', 1, 0);

  const animation = createAnimation()
    .duration(300)
    .addAnimation([enteringAnimation, leavingAnimation]);

  return animation;
};
export default function Routes() {
  return (
    <IonReactRouter>
      {/* <Suspense fallback={<LoaderPage></LoaderPage>}> */}
      <IonRouterOutlet animated={true} animation={zoomInAnimation} mode="md">
        <AppGuard>
          <Switch>
            {/* Login */}
            <Route exact path={paths.welcome.main} component={Welcome} />
            <Route exact path={paths.signup.main} component={Signup} />

            <MainLayout>
              <Route exact path={paths.main.main} component={Explore} />
              <Route exact path={paths.main.profile} component={Profile} />
              <Route
                exact
                path={paths.main.notifications}
                component={Notifications}
              />
              <Route exact path={paths.main.chat} component={Chat} />
            </MainLayout>
          </Switch>
        </AppGuard>
      </IonRouterOutlet>
      {/* </Suspense> */}
    </IonReactRouter>
  );
}
