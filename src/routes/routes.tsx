import {
  AnimationBuilder,
  createAnimation,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Suspense, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import { paths } from './paths';
import Explore from '@/pages/Explore';
import Welcome from '@/pages/welcome';
import Signup from '@/pages/signup';
import EditProfile from '@/pages/Profile/editProfile';
import Filter from '@/pages/Explore/Filter';
import Chat from '@/pages/Chat/Chat';
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
import { Support } from '@/pages/settings/support';
import { Bills } from '@/pages/settings/bills';
import { Questions } from '@/pages/settings/questions';
import { LoaderPage } from '@/components/base/Loader/LoaderPage';
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
  const [isReload, setIsReload] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Detect page reload
    const handleReload = () => setIsReload(false);
    window.addEventListener('load', handleReload);

    // Clean up
    return () => {
      window.removeEventListener('load', handleReload);
    };
  }, []);
  return (
    <IonReactRouter>
      <Suspense
        fallback={
          isReload ? <LoaderPage></LoaderPage> : <LoaderPage></LoaderPage>
        }
      >
        <IonRouterOutlet animated={true} animation={zoomInAnimation} mode="md">
          <AppGuard>
            <Switch>
              {/* Login */}
              <Route exact path={paths.welcome.main} component={Welcome} />
              <Route exact path={paths.signup.main} component={Signup} />
              {/* profile */}
              <Route
                exact
                path={paths.profile.basicInformations}
                component={BasicInformations}
              />
              <Route
                exact
                path={paths.profile.editProfile}
                component={EditProfile}
              />
              <Route
                exact
                path={paths.profile.completeProfile}
                component={CompleteProfile}
              />
              <Route
                exact
                path={paths.profile.identityVerification}
                component={IdentityVerification}
              />
              <Route
                exact
                path={paths.profile.completePictures}
                component={CompletePictures}
              />
              <Route
                exact
                path={paths.profile.completeTravelInterests}
                component={CompleteTravelInterests}
              />
              <Route
                exact
                path={paths.profile.completePersonalInterests}
                component={CompletePersonalInterests}
              />
              <Route
                exact
                path={paths.profile.completeProvinces}
                component={CompleteProvinces}
              />
              <Route
                exact
                path={paths.profile.completeSpecialty}
                component={CompleteSpecialty}
              />
              {/* settings */}
              <Route exact path={paths.settings.main} component={Settings} />
              <Route exact path={paths.settings.support} component={Support} />
              <Route exact path={paths.settings.bills} component={Bills} />
              <Route
                exact
                path={paths.settings.questions}
                component={Questions}
              />
              {/* explore */}
              <Route exact path={paths.explore.filter} component={Filter} />
              <Route
                path={paths.main.main}
                render={({ match }) => (
                  <MainLayout>
                    <Switch>
                      <Route exact path={match.path} component={Explore} />
                      <Route
                        exact
                        path={paths.main.profile}
                        component={Profile}
                      />
                      <Route
                        exact
                        path={paths.main.notifications}
                        component={Notifications}
                      />
                      <Route exact path={paths.main.chat} component={Chat} />
                    </Switch>
                  </MainLayout>
                )}
              />
            </Switch>
          </AppGuard>
        </IonRouterOutlet>
      </Suspense>
    </IonReactRouter>
  );
}
