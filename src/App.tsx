import { IonApp, setupIonicReact } from '@ionic/react';
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
import { useEffect, useState } from 'react';
import { customToast } from './components/base/toast';
import {
  useAddDeviceTokenMutation,
  useGetMeQuery,
} from './graphql/generated/graphql.codegen';
import { App as IApp } from '@capacitor/app';
import Modal from './components/base/Modal/Modal';
import Button from './components/base/Button/Button';

setupIonicReact();

const App: React.FC = () => {
  const { data } = useGetMeQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addDeviceToken] = useAddDeviceTokenMutation();
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
        (action) => {},
      );
    };

    initializePushNotifications();
  }, []);

  useEffect(() => {
    const backButtonListener = IApp.addListener('backButton', (e) => {
      if (!e.canGoBack) {
        setIsOpen(true);
      }
    });

    // Cleanup listener on component unmount
    return () => {
      backButtonListener.then((listener) => listener.remove());
    };
  }, []);

  const exitApp = () => {
    IApp.exitApp(); // Exit the app
  };
  return (
    <IonApp>
      <Routes />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '20px' }}
        toastOptions={{
          duration: 1500,
        }}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="flex w-[90%] flex-col gap-6 rounded-3xl bg-white p-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-lg font-bold">
            از اپلیکیشن خارج می‌شوید؟
          </h1>
        </div>
        <div className="flex w-full gap-2">
          <Button
            variant="danger"
            className="h-10 w-full"
            onClick={() => {
              exitApp();
            }}
          >
            بله خارج میشوم
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-brand-black"
            onClick={() => setIsOpen(false)}
          >
            نه می‌خوام بمونم
          </Button>
        </div>
      </Modal>
    </IonApp>
  );
};

export default App;
