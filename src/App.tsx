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
import 'swiper/css';
import 'swiper/css/pagination';
import './theme/variables.css';
import './theme/main.css';
import './theme/iransans.css';
import './theme/Yekan.css';
import Routes from './routes/routes';
import { Toaster } from 'react-hot-toast';
import { socket } from './graphql/apollo/socket';
import {
  useMessageSentSubscription,
  useUserStatusSubscription,
} from './graphql/generated/graphql.codegen';
import { useEffect } from 'react';
import { client } from './graphql/apollo/client';

setupIonicReact();

const App: React.FC = () => {
  const { data } = useUserStatusSubscription({ client: socket });
  const { data: messages } = useMessageSentSubscription({ client: socket });
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
