import React from 'react'
import { Link } from 'react-router'

const Login = () => {
  return (
 <main>
    <h1>Register</h1>
    <div className="form-container">
        <form>
            <input 
            type="text" placeholder='Username' required/>
            <input 
            type='text' placeholder='email' required />
            <input 
            type="password" placeholder='Password' required/>
            <button
             type='submit'>Login</button>
        </form>
    </div>
    <p>Already have an account ? <Link className='togglebtn' to={"/"}>Login</Link> </p>
 </main>
  )
}

export default Login