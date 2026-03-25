import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import  { useState } from 'react';


const Register = () => {

const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

async function handleSubmit(e){
  e.preventDefault();

  axios.post('http://localhost:8080/api/auth/register',{
    username,email,password,
  },
    {
      withCredentials:true
  }).then((res)=>{
    console.log(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}

return (
<main>
  <div className="form-container">
    <h1>Register</h1>
<form onSubmit={(e)=>{
    handleSubmit(e);
  }}>
  <input  onInput={(e)=>{
setUsername(e.target.value);

  }}
   type="text" placeholder="Username"  value={username} />

  <input onInput={(e)=>{
    setEmail(e.target.value);
  }}
   type="email" placeholder="Email" value={email}/>
    
    <input onInput={(e)=>{
      setPassword(e.target.value);
    }} type="password" placeholder="Password" value={password} />

  <button  type="submit">Register</button>
</form>
<p>Already have an account? <Link className='toggleAuthForm' to="/login">Login here</Link></p>
  </div>
</main>
  )
}

export default Register