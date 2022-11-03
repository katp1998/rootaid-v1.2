import { gql, useMutation } from '@apollo/client'

function login() {

    const REGISTER_QUERY = gql`
        mutation Register($name: String!, $email: String!, $password: String!) {
            register(name: $name, email: $email, password: $password) {
                token,
                id
            }
        }
    ` 

    const [registerUser, {data, loading, error}] = useMutation(REGISTER_QUERY)

  return (
    <div>login</div>
  )
}
export default login