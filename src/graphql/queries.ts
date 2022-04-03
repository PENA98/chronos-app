/* tslint:disable */
/* eslint-disable */

export const login = /* GraphQL */ `
  mutation loginUser($LoginUserInput: LoginUserInput) {
    login(LoginUserInput: $LoginUserInput) {
      __typename
      accessToken
      user {
        _id
        username
      }
    }
  }
`;
