import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri:
    "https://2avl7mnyd5apvpykm3xigvn7de.appsync-api.ap-south-1.amazonaws.com/graphql",
  headers: {
    "X-Api-Key": "da2-tchqvfvkg5d33dfcjozdwsig3y",
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer da2-tchqvfvkg5d33dfcjozdwsig3y`,
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
