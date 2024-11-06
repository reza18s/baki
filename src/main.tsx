import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/main.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/apollo/client";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
    <div
      dir="rtl"
      className="bg-white font-iransans leading-tight text-brand-black"
    >
      <App />
    </div>
  </ApolloProvider>,
);
