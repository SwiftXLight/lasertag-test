import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser(
    $first_name: String!
    $last_name: String
    $email: String
    $address: String
  ) {
    insert_user_one(object: {
      first_name: $first_name
      last_name: $last_name
      email: $email
      address: $address
    }) {
      id
      first_name
      last_name
      email
      address
      created_at
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: uuid!
    $first_name: String
    $last_name: String
    $email: String
    $address: String
  ) {
    update_user_by_pk(
      pk_columns: { id: $id }
      _set: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        address: $address
      }
    ) {
      id
      first_name
      last_name
      email
      address
      created_at
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_user_by_pk(id: $id) {
      id
    }
  }
`;
