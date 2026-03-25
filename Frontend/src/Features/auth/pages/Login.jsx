import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'



const Login = () => {
  
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  


  async function handleLogin(e) {
    
    e.preventDefault()
  axios.post("http://localhost:8080/api/auth/login", {
    username, password
  },{
    withCredentials: true
  }).then((res) => {
    console.log(res.data)
  })

  }

  return (
 <main>
  <div className="form-container">
    <h1>Login</h1>
<form onSubmit={(e)=>{
  handleLogin(e)
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