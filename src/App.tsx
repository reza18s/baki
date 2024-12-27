import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Routes from './routes/routes';
import { socket } from './graphql/apollo/socket';
import {
  useMessageSentSubscription,
  useUserStatusSubscription,
} from './graphql/generated/graphql.codegen';
import { client } from './graphql/apollo/client';

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

setupIonicReact();

const App: React.FC = () => {
  const {
    data,
    restart,
    error: userStatusError,
  } = useUserStatusSubscription({
    client: socket,
  });
  const {
    data: messages,
    restart: restartMessages,
    error: messageError,
  } = useMessageSentSubscription({
    client: socket,
    shouldResubscribe: true,
  });

  useEffect(() => {
    if (userStatusError) {
      setTimeout(() => {
        restart();
      }, 1000);
    }
    if (messageError) {
      setTimeout(() => {
        console.log('err');
        restartMessages();
      }, 1000);
    }
  }, [userStatusError, messageError]);

  useEffect(() => {
    client.refetchQueries({ include: ['GetChats'] });
  }, [data, messages]);

  useEffect(() => {
    client.refetchQueries({ include: ['GetChat'] });
  }, [messages]);

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
