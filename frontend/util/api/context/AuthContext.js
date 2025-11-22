import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export default function useAuth(){
    return useContext(AuthContext)
}

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({email:"", token:"", role:""})

    useEffect(() => {
        // Load token from localStorage on mount
        const token = localStorage.getItem("token");
        
        if (token) {
            // You can decode the JWT token to get user info if needed
            // For now, we'll just set the token and mark as logged in
            setUser({
                email: "", 
                token: token, 
                role: "" // You can decode JWT to get role
            });
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}