import { IonApp, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Toaster } from 'react-hot-toast';
import Routes from './routes/routes';
import { PushNotifications } from '@capacitor/push-notifications';

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
import { useEffect } from 'react';
import { customToast } from './components/base/toast';
import {
  useAddDeviceTokenMutation,
  useGetMeQuery,
} from './graphql/generated/graphql.codegen';
import { App as IApp } from '@capacitor/app';

setupIonicReact();

const App: React.FC = () => {
  const hs = useHistory();
  const { data } = useGetMeQuery();
  const [addDeviceToken] = useAddDeviceTokenMutation();

  // Custom Back Button Handler
  useEffect(() => {
    console.log('err');
    const backButtonListener = IApp.addListener('backButton', (e) => {
      customToast('ddd', 'error');
    });

    // Cleanup listener on component unmount
    return () => {
      backButtonListener.then((listener) => listener.remove());
    };
  }, []);
  useEffect(() => {
    const initializePushNotifications = async () => {
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive === 'granted') {
        await PushNotifications.register();
      }

      // Handle token
      PushNotifications.addListener('registration', (token) => {
        localStorage.setItem('deviceToken', token.value);
        if (data?.getMe) {
          addDeviceToken({
            variables: {
              token: token.value,
            },
          });
        }
      });

      // Handle notification received
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          // customToast(`Notification Rceived: ${notification}`, 'warning');
        },
      );

      // Handle notification action
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (action) => {
          customToast(`Notification Ation: ${action}`, 'warning');
        },
      );
    };

    initializePushNotifications();
  }, []);
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
