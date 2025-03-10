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
import { useEffect, useLayoutEffect, useState } from 'react';
import { App as IApp } from '@capacitor/app';
import Modal from './components/base/Modal/Modal';
import Button from './components/base/Button/Button';
import { IcCrownStar } from './components/icons/IcCrownStar';

setupIonicReact();

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<'update' | 'exit' | undefined>();

  useEffect(() => {
    const backButtonListener = IApp.addListener('backButton', (e) => {
      if (!e.canGoBack) {
        setIsOpen('exit');
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
        isOpen={isOpen === 'exit'}
        onRequestClose={() => setIsOpen(undefined)}
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
            onClick={() => setIsOpen(undefined)}
          >
            نه می‌خوام بمونم
          </Button>
        </div>
      </Modal>
      <Modal
        className="flex w-[85%] flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-4"
        isOpen={isOpen === 'update'}
        onRequestClose={() => setIsOpen(undefined)}
      >
        <div className="flex items-center justify-center rounded-full bg-brand-yellow p-4">
          <IcCrownStar className="size-8 fill-none stroke-black"></IcCrownStar>
        </div>

        <h1 className="text-center text-lg font-bold">آپدیت جدید منتشر شد!</h1>
        <span className="text-center text-sm text-gray-500">
          برای استفاده از آخرین ویژگی‌های باکی لطفا اقدام به بروزرسانی کنید.
        </span>
        <div className="flex w-full gap-2">
          <Button className="h-10 w-full" onClick={() => {}}>
            بروزرسانی
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-black"
            onClick={() => setIsOpen(undefined)}
          >
            بعدا یادآوری کن
          </Button>
        </div>
      </Modal>
    </IonApp>
  );
};

export default App;
