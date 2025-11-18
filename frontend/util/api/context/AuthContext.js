import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export default function useAuth(){
    return useContext(AuthContext)
}


 

export   function AuthContextProvider({children}) {
const [user,setUser] = useState({email:"",token:"",role:""})


   useEffect(()=>{
    const token = localStorage.getItem("token") 
    if(token){
        setUser({email:"",token:"",role:""})
    }
   },[])


    return (
     <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
  )
}
