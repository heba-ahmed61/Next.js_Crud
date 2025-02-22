'use client'
import {  signIn} from "next-auth/react";
const LoginPage = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const login = await signIn('credentials',{
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false // Prevent automatic redirection
        })
        if (login?.error) {
            console.log("Login failed:", login.error); // Handle login failure
        } else {
            console.log("Login successful:", login); // Handle login success
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <div style={{marginBottom:'20px'}}>
                <input type="email" placeholder="enter email" name="email" required/>
            </div>
            <div style={{marginBottom:'20px'}}>
                <input type="password" placeholder="enter password" name="password" required/>
            </div>
            <button type="submit" style={{marginBottom:'20px'}}>login</button>
        </form>
      
        <div>
            <button onClick={(e) => signIn('github')} style={{cursor:'pointer', marginRight:'20px'}}>Login With Github</button>
            
        </div>
        </>
    )
}
export default LoginPage