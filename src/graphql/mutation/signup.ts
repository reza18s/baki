

import { gql, useMutation } from '@apollo/client';


export const SIGNUP_MUTATION = gql`
  mutation Signup($phoneNumber: String!) {
    Signup(phoneNumber: $phoneNumber)
  }
`;