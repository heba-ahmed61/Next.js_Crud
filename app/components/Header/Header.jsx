'use client'
import { signOut, useSession } from 'next-auth/react'
import './Header.css'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
const Header = () => {
    const session= useSession()
    const router =useRouter()
    console.log(session)
    useEffect(() => {
    
     if(session?.data){
        router.push('/')
     }else{
        router.push('/login')
     }
    },[session.data])
    return(
<><div className="blogs_header"><div className="blogs_header_layout"></div> </div>
<h3>{session.data ? `userName: ${session.data.user.name}` : 'PLease Login First To Can Access Posts App' }</h3>
{session.data && (<button onClick={(e) => signOut()} style={{cursor:'pointer'}}>SignOut From Github</button>)}
</>

    )
}
export default Header