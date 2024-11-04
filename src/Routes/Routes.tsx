import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Index from "../pages";
import Profile from "../pages/Profile/profile";
import Signup from "../pages/signup";
import ComplateProfile from "../pages/Profile/ComplateProfile";
import { Route, Switch } from "react-router-dom";
import IdentityVerification from "../components/layout/Profile/IdentityVerification";
import ComplatePictures from "../components/layout/Profile/ComplatePictures";
import ComplateGeneralInterests from "../components/layout/Profile/ComplateGeneralInterests";
import ComplatePersonalInterests from "../components/layout/Profile/ComplatePersonalInterests";
import ComplateResidenceCity from "../components/layout/Profile/ComplateResidenceCity";
import ComplateSpecialty from "../components/layout/Profile/ComplateSpecialty";
import BasicInformations from "../components/layout/Profile/BasicInformations/BasicInformations";
import Explore from "../pages/Explore.tsx/Explore";
import MailLayout from "../components/layout/Main/MainLayout";

export default function Routes() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
          <Route
            exact
            path="/profile/complate_profile"
            component={ComplateProfile}
          />
          <Route
            exact
            path="/profile/complate_profile/identify_verification"
            component={IdentityVerification}
          />
          <Route
            exact
            path="/profile/complate_profile/complate_pictures"
            component={ComplatePictures}
          />
          <Route
            exact
            path="/profile/complate_profile/complate_generalinterests"
            component={ComplateGeneralInterests}
          />
          <Route
            exact
            path="/profile/complate_profile/complate_personalInterests"
            component={ComplatePersonalInterests}
          />
          <Route
            exact
            path="/profile/complate_profile/complate_residencecity"
            component={ComplateResidenceCity}
          />
          <Route
            exact
            path="/profile/complate_profile/complate_specialty"
            component={ComplateSpecialty}
          />
          <Route
            exact
            path="/profile/complate_profile/complate_basicinformations"
            component={BasicInformations}
          />

          {/* Explore Routes with Layout */}
          <Route
            path="/explore"
            render={({ match }) => (
              <MailLayout>
                <Switch>
                  <Route exact path={match.path} component={Explore} />
                  <Route
                    exact
                    path={`${match.path}/complate_profile`}
                    component={ComplateProfile}
                  />
                </Switch>
              </MailLayout>
            )}
          />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
}
