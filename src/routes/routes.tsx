import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Suspense, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import { paths } from './paths';
import Explore from '@/pages/Explore';
import Index from '@/pages';
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
        <IonRouterOutlet>
          <Switch>
            {/* Home */}
            <Route exact path={paths.home.main} component={Index} />

            {/* Signup */}
            <Route exact path={paths.signup.main} component={Signup} />

            {/* Profile Routes */}
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

            {/* Explore Routes */}
            <Route exact path={paths.explore.filter} component={Filter} />
            <Route
              path={paths.explore.main}
              render={({ match }) => (
                <MainLayout>
                  <Switch>
                    <Route exact path={match.path} component={Explore} />
                    <Route
                      exact
                      path={paths.explore.completeProfile}
                      component={CompleteProfile}
                    />
                    <Route exact path={paths.explore.chat} component={Chat} />
                  </Switch>
                </MainLayout>
              )}
            />
          </Switch>
        </IonRouterOutlet>
      </Suspense>
    </IonReactRouter>
  );
}
