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
import Profile from '@/pages/Profile/profile';
import IdentityVerification from '@/components/layout/Profile/IdentityVerification';
import CompletePictures from '@/components/layout/Profile/CompletePictures';
import CompleteTravelInterests from '@/components/layout/Profile/CompleteTravelInterests';
import CompletePersonalInterests from '@/components/layout/Profile/CompletePersonalInterests';
import CompleteProvinces from '@/components/layout/Profile/CompleteProvinces';
import CompleteSpecialty from '@/components/layout/Profile/CompleteSpecialty';
import BasicInformations from '@/components/layout/Profile/BasicInformations/BasicInformations';
import LanguageKnow from '@/components/layout/Profile/LanguageKnow';
import Filter from '@/pages/Explore/Filter';
import Chat from '@/pages/Chat/Chat';
import CompleteProfile from '@/pages/Profile/ComplateProfile';
import AppGuard from './AppGaurd';
const zoomInAnimation: AnimationBuilder = (baseEl, opts) => {
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
          isReload ? (
            <div className="flex h-screen items-center justify-center">
              <p className="text-lg font-bold">
                Loading the app, please wait...
              </p>
            </div>
          ) : (
            <div className="flex h-screen items-center justify-center">
              <p className="text-lg font-bold">
                Navigating to the next page...
              </p>
            </div>
          )
        }
      >
        <AppGuard>
          <IonRouterOutlet
            animated={true}
            animation={zoomInAnimation}
            mode="md"
          >
            <Switch>
              <Route exact path={paths.welcome.main} component={Welcome} />
              <Route exact path={paths.signup.main} component={Signup} />
              <Route exact path={paths.profile.main} component={Profile} />
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
                path={paths.profile.completeGeneralInterests}
                component={CompleteTravelInterests}
              />
              <Route
                exact
                path={paths.profile.completePersonalInterests}
                component={CompletePersonalInterests}
              />
              <Route
                exact
                path={paths.profile.completeResidenceCity}
                component={CompleteProvinces}
              />
              <Route
                exact
                path={paths.profile.completeSpecialty}
                component={CompleteSpecialty}
              />
              <Route
                exact
                path={paths.profile.basicInformations}
                component={BasicInformations}
              />
              <Route
                exact
                path={paths.profile.languagesKnow}
                component={LanguageKnow}
              />
              <Route exact path={paths.explore.filter} component={Filter} />
              <Route
                path={paths.main.main}
                render={({ match }) => (
                  <MainLayout>
                    <Switch>
                      <Route exact path={match.path} component={Explore} />
                      <Route
                        exact
                        path={paths.main.completeProfile}
                        component={CompleteProfile}
                      />
                      <Route exact path={paths.main.chat} component={Chat} />
                    </Switch>
                  </MainLayout>
                )}
              />
            </Switch>
          </IonRouterOutlet>
        </AppGuard>
      </Suspense>
    </IonReactRouter>
  );
}
