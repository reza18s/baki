

import { gql, useMutation } from '@apollo/client';


export const SigninMutation = gql`
 mutation Signin($phoneNumber: String!) {
  Signin(phoneNumber: $phoneNumber)
}
`;