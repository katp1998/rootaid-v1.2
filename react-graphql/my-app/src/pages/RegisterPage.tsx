import React, {useState} from 'react'
import { gql, useMutation } from '@apollo/client'

export default function RegisterPage() {

    const [user,setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChange = (event : any ) =>{
        setUser({...user, [event.target.name]: event.target.value});
    }

    const [addUser, { loading}] = useMutation(REGISTER_QUERY, {
        update(proxy, result){
            console.log(result)
        },
        variables: user
    })



    const onSubmit = (event :any )=>{
        event.preventDefault(); 
        addUser();
    }
  


  return (
    <div className="create">
        <h2>Register Form </h2>
        <form onSubmit={onSubmit}>
            <label>Name</label>
            <input 
                type="text"
                required
                name="name"
                value={user.name}
                onChange={onChange}
             />
            <label>Email</label>     
            <input
                type="email"
                required
                name="email"
                value={user.email}
                onChange={onChange}
            />
            <label>Password</label>
            <input
                type="password"
                required
                name="password"
                value={user.password}
                onChange={onChange}
            />
            <button type="submit">Register</button>

        </form>
    </div>
  )
}


const REGISTER_QUERY = gql`
mutation Register(
    $name: String!,
    $email: String!,
    $password: String!
    ) {
    register(
        name: $name,
        email: $email,
        password: $password
        ){
        token,
        id
    }
}` 

