import gql from 'graphql-tag';

export const GET_BUSINESS_TYPES = gql`
  query {
    getScopedBusinessTypes {
      id
      name
      description
    }
  }
`;
