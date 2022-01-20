import gql from 'graphql-tag';

export const CREATE_BUISENESS = gql`
  mutation createBusinessMutation(
    $title: String!
    $scopeTypeId: Int!
    $typeBusiness: StatusUserForBusiness = null
    $description: String = null
    $address: String = null
    $services: String = null
    $region: String = null
    $city: String = null
    $latitude: Float = null
    $longitude: Float = null
    $email: String = null
    $phone: String = null
    $website: String = null
    $operationHours: String = null
  ) {
    createBusiness(
      inputData: {
        title: $title
        scopeTypeId: $scopeTypeId
        typeBusiness: $typeBusiness
        description: $description
        address: $address
        services: $services
        region: $region
        city: $city
        latitude: $latitude
        longitude: $longitude
        email: $email
        phone: $phone
        website: $website
        operationHours: $operationHours
      }
    ) {
      created
      error {
        message
      }
    }
  }
`;
