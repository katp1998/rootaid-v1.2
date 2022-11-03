import { gql, useLazyQuery } from '@apollo/client'

function login() {

    const LOGIN_QUERY = gql`
      query Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
              token,
              id
          }
      }
    `

    const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_QUERY);

  return (
    <div>login</div>
  )
}
export default login