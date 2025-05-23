import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    user(order_by: [{ first_name: asc }, { last_name: asc }]) {
      id
      first_name
      last_name
      email
      address
      created_at
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) {
    user_by_pk(id: $id) {
      id
      first_name
      last_name
      email
      address
      created_at
    }
  }
`;
