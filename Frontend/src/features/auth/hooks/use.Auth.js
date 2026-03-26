import { use, useContext } from 'react';
import { login,register,getMe } from '../services/auth.api.js';
import { AuthContext } from '../../auth.context.jsx';


const useAuth=()=>{

 const context=useContext(AuthContext);
    
const {user,setUser,loading,setLoading}=context;



//handle login function
const handleLogin=async (username,password)=>{

setLoading(true);

const response=await login(username,password);

setUser(response.user);

setLoading(false);

}


//handle register function

const handleRegister=async (username,email,password)=>{
    setLoading(true);

    const response=await register(username,email,password);

    setUser(response.user);

    setLoading(false);  

}


return{
    user,loading,handleLogin,handleRegister
}


}

export default useAuth;