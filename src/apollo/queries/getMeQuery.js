import gql from 'graphql-tag';

export const GET_USER = gql`
  query {
    getMe {
      user {
        firstName
        secondName
        middleName
        email
        birthday
        accountStatus
        profilePicture
      }
    }
  }
`;
