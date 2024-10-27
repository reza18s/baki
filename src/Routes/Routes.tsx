import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Index from '../pages';
import Profile from '../pages/Profile/profile';
import Signup from '../pages/signup';
import ComplateProfile from '../pages/Profile/ComplateProfile';
import IdentityVerification from '../components/layout/Profile/IdentityVerification';

export default function Routes() {
  return (
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile">
          <Route path="/complate_profile" element={<ComplateProfile />} />
          <Route path="/complate_profile">
            <Route path="/identity_verification" element={<IdentityVerification />} />
          </Route>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
}