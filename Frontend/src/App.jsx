import './Shared/global.scss';
import router from './AppRoutes';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './features/auth.context';


function App() {


  return (
    
    <>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    </>
  )
}

export default App
