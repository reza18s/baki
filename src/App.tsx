import { Route, Routes } from 'react-router-dom';
import { 
  IonApp, 
  IonRouterOutlet,
  setupIonicReact 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Import your components */
import Index from './pages';
import Signup from './pages/signup';
import Profile from './pages/Profile/profile';
import ComplateProfile from './pages/Profile/ComplateProfile';
import IdentityVerification from './components/layout/Profile/IdentityVerification';

/* Import your CSS files */
import '@ionic/react/css/core.css';
import "./assets/main.css"
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/complate_profile" element={<ComplateProfile />} />
            <Route path="/profile/complate_profile/identity_verification" element={<IdentityVerification />} />
          </Routes>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;