import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apollo/client';
import { socket } from './graphql/apollo/socket';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ApolloProvider client={socket}>
    <ApolloProvider client={client}>
      <div
        dir="rtl"
        className="bg-white font-iransans leading-tight text-brand-black"
        style={{ fontFamily: 'IRANSansX' }}
      >
        <App />
      </div>
    </ApolloProvider>
  </ApolloProvider>,
);
