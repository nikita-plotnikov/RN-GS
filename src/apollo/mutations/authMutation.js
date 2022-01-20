import gql from 'graphql-tag';

export const AUTH_USER = gql`
  mutation authUser(
    $email: String!
    $uid: String!
    $deviceId: String!
    $accountStatus: StatusUserAccount = null
    $displayName: String = null
    $profilePicture: String = null
  ) {
    thirdPartyAuthentication(
      inputData: {
        email: $email
        uid: $uid
        deviceId: $deviceId
        accountStatus: $accountStatus
        displayName: $displayName
        profilePicture: $profilePicture
      }
    ) {
      status
      token
      tokenRefresh
    }
  }
`;
