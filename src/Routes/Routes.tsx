import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Index from '../pages';
import Profile from '../pages/Profile/profile';
import Signup from '../pages/signup';
import ComplateProfile from '../pages/Profile/ComplateProfile';
import { Route, Switch } from 'react-router-dom';
import ProfileLayout from '../components/layout/Profile/Layout';

export default function Routes() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/complate_profile" component={ComplateProfile} />
          
          {/* Profile Routes with Layout */}
          {/* <Route 
            path="/profile"
            render={({ match }) => (
              <ProfileLayout>
                <Switch>
                  <Route exact path={match.path} component={Profile} />
                  <Route 
                    exact 
                    path={`${match.path}/complate_profile`} 
                    component={ComplateProfile} 
                  />
                </Switch>
              </ProfileLayout>
            )}
          /> */}
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
}