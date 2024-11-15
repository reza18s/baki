import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Import your CSS files */
import '@ionic/react/css/core.css';
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
import './theme/main.css';
import Routes from './routes/routes';
import { Toaster } from 'react-hot-toast';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Routes />
      </IonReactRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '45px' }}
        toastOptions={{
          duration: 1000,
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          className: 'mt-9',
        }}
      />
    </IonApp>
  );
};

export default App;
