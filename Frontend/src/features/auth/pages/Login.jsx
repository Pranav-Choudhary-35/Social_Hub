import React from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/use.Auth'
import { useState } from 'react'
import { Navigate } from 'react-router'



const Login = () => {

const {user,loading,handleLogin}=useAuth();

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();
async function FormSubmitHander(e){


e.preventDefault()

await handleLogin(username,password);


console.log("submit ho gya bhai");

navigate('/')

}

if(loading){
    return(
        <main><h1>Loading.....</h1></main>
    )
}


  return (
 <main>
    <h1>Login</h1>
    <div className="form-container">
        <form onSubmit={FormSubmitHander}>
            <input onInput={(e)=>{
                setUsername(e.target.value);
            }} 
            type="text" placeholder='Username' />
            <input onInput={(e)=>{
            setPassword(e.target.value);
            }}
            type="password" placeholder='Password' />
            <button
             type='submit'>Login</button>
        </form>
    </div>
<p>Don't have an account? <Link className='togglebtn' to="/register">Register</Link></p>
 </main>
  )
}

export default Login