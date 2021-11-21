import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { IUser } from "../data_models/user";
import { FBlogin, FBlogout, FBregister, setAuthListner } from "../network_services/firebase";

interface IAuthCtx{
    user:IUser|null,
    register:(
        username: string,
        password: string,
        firstName: string,
        lastName: string,
    ) => Promise<void>;
    login: (username:string, password:string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthCtx = React.createContext<IAuthCtx|undefined>(undefined);

export const AuthProvider:React.FC = ({children}) =>{
   const [user, setUser] = useState<IUser|null>(null);
    useEffect(() => {
        setAuthListner((user:IUser) => { setUser(user)})
        return () => {
        setAuthListner((user:IUser) => { setUser(user)})
        }
    }, [])

   const login = FBlogin;
   const logout = FBlogout;
   const register = FBregister;

    return (<AuthCtx.Provider value = {{user,register,login,logout}}>{children}</AuthCtx.Provider>)

}


