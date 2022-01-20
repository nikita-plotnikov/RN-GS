import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
  fromPromise,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Observable } from 'apollo-link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFRESH_TOKEN } from './src/apollo/mutations/refreshTokenMutation';
// import { createUploadLink } from 'apollo-upload-client';

const URL =
  'https://gainsystems-dev.germanywestcentral.cloudapp.azure.com/graphql';

// const uploadLink = createUploadLink({
//   uri: 'http://gainsystems-dev.germanywestcentral.cloudapp.azure.com/graphql',
// });

const httpLink = new HttpLink({
  uri: URL,
});

const request = async operation => {
  const token = await AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `${token}` : '',
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) {
          handle.unsubscribe;
        }
      };
    }),
);

const getNewToken = async () => {
  const oldRefreshToken = await AsyncStorage.getItem('tokenRefresh');
  const newTokens = await client
    .mutate({ mutation: REFRESH_TOKEN, variables: { token: oldRefreshToken } })
    .then(response => {
      const { accessToken, refreshToken } = response.data.refreshToken;
      return { accessToken, refreshToken };
    });
  if (newTokens.accessToken && newTokens.refreshToken) {
    await AsyncStorage.setItem('token', newTokens.accessToken);
    await AsyncStorage.setItem('tokenRefresh', newTokens.refreshToken);
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        // switch (err.extensions.code) {
        // case 'UNAUTHENTICATED':
        console.log('ERR', err);
        return fromPromise(
          getNewToken().catch(error => {
            // Handle token refresh errors e.g clear stored tokens, redirect to login
            return;
          }),
        )
          .filter(value => Boolean(value))
          .flatMap(accessToken => {
            const oldHeaders = operation.getContext().headers;
            // modify the operation context with a new token
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${accessToken}`,
              },
            });

            // retry the request, returning the new observable
            return forward(operation);
          });
        // }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
);

const client = new ApolloClient({
  link: from([errorLink, requestLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
