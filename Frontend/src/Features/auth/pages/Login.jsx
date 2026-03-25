import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
  
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  
  const {handleLogin,loading} = useAuth();
  const naigate = useNavigate();


if(loading){
  return <h1>Loading...</h1>
}


  async function handleSubmit(e) {
    
    e.preventDefault()

    handleLogin(username,password).then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    })  
  
  }

  return (
 <main>
  <div className="form-container">
    <h1>Login</h1>
<form onSubmit={(e)=>{
  handleSubmit(e)
  naigate('/home');
}}>
  <input onInput={(e)=>{
    setUsername(e.target.value);
  }} 
  type="text" placeholder="Username" />
  <input onInput={(e)=>{
    setPassword(e.target.value);
  }} 
  type="password" placeholder="Password" />
  <button type="submit">Login</button>
</form>
<p>Don't have an account? <Link className="toggleAuthForm" to="/register">Register here</Link></p>
  </div>
 </main>
  )
}

export default Login