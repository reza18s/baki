import { Route } from 'react-router-dom';
import {
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Index from '../pages';
import Profile from '../pages/Profile/profile';
import Signup from '../pages/signup';
import ComplateProfile from '../pages/Profile/ComplateProfile';

export default function Routes() {
  return(
    <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/" component={Index} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile">
      <Route path="/complate_profile" component={ComplateProfile} />
      </Route>
    </IonRouterOutlet>
  </IonReactRouter>
  )
}