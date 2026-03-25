import React from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes  from './AppRoutes'
import './style.scss'
import { AuthProvider } from './Features/auth/auth.context'
function App() {


  return (
    
    <>
    <AuthProvider>
   <AppRoutes />
   </AuthProvider>
    </>
  )
}

export default App
