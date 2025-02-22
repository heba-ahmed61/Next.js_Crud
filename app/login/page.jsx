'use client'
import {  signIn, signOut } from "next-auth/react";
const LoginPage = () => {
    
    return(
        <>
      
        <div>
            <button onClick={(e) => signIn('github')} style={{cursor:'pointer', marginRight:'20px'}}>Login With Github</button>
            
        </div>
        </>
    )
}
export default LoginPage