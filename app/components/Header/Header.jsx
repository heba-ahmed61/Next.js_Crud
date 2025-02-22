'use client'
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from 'react';
import './header.css'
const Header = () => {
    //Yes! NextAuth checks the session on every page where you use useSession().
    const { data: session, status } = useSession(); // Get session data and status
    const router = useRouter();
    const pathname = usePathname(); // Get current route
    useEffect(() => {
        if (status === "loading") return; // Wait until session is checked

        // ✅ If no session & not already on /login → Redirect to login
        if (!session ) {
            router.replace('/login');
        }

        // ✅ If there is a session & user has NOT been redirected before → Redirect to home
        if (session && pathname=='/login') {
            router.replace('/');
           
        }

    }, [session, status, pathname]);
    if (status === "loading") {
        return <p>Loading...</p>; // Prevent flickering while session is being checked
    }

    return (
        <>
            <div className="blogs_header">
                <div className="blogs_header_layout"></div>
            </div>
            <h3>{session ? `User Name: ${session.user.name}` : 'Please login first to access the Posts App'}</h3>
            {session && <button onClick={() => signOut()} style={{ cursor: 'pointer' }}>Sign Out</button>}
        </>
    );
};

export default Header;


    //Yes! NextAuth checks the session on every page where you use useSession().
