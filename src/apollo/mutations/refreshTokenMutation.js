import gql from 'graphql-tag';

export const REFRESH_TOKEN = gql`
  mutation refreshToken($token: String!) {
    refreshToken(inputData: { token: $token }) {
      accessToken
      refreshToken
      error {
        message
        code
      }
    }
  }
`;
