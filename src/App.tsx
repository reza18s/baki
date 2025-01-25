import { IonApp, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Toaster } from 'react-hot-toast';
import Routes from './routes/routes';
import { IonRouterOutlet, IonToast, useIonViewWillEnter } from '@ionic/react';

/* Import CSS files */
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
import 'swiper/css';
import 'swiper/css/pagination';
import './theme/variables.css';
import './theme/main.css';
import './theme/iransans.css';
import './theme/Yekan.css';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  // const history = useHistory();
  // const [showToast, setShowToast] = useState(false);
  const hs = useHistory();

  // Custom Back Button Handler
  useEffect(() => {
    const backAction = (event: Event) => {
      event.preventDefault();
      hs.goBack();
    };

    // Add listener for hardware back button
    document.addEventListener('ionBackButton', backAction);
    document.addEventListener('backButton', backAction);

    return () => {
      // Clean up listener on component unmount
      document.removeEventListener('ionBackButton', backAction);
      document.removeEventListener('backButton', backAction);
    };
  }, [hs]);

  // useEffect(() => {
  //   const onBackButtonEvent = (event: any) => {
  //     event.preventDefault(); // Prevent default behavior
  //     if (history.length > 1) {
  //       history.goBack(); // Navigate back
  //     } else {
  //       setShowToast(true); // Optional: Show "Press again to exit" message
  //       setTimeout(() => setShowToast(false), 2000); // Reset toast visibility
  //     }
  //   };

  //   document.addEventListener('ionBackButton', onBackButtonEvent);

  //   return () => {
  //     document.removeEventListener('ionBackButton', onBackButtonEvent);
  //   };
  // }, [history]);
  return (
    <IonApp>
      <IonReactRouter>
        <Routes />
      </IonReactRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '20px' }}
        toastOptions={{
          duration: 1500,
        }}
      />
    </IonApp>
  );
};

export default App;
