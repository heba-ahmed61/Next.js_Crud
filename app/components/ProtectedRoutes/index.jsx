"use client";

import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function ProtectedRoutes({ children }) {
  // ok at app renderd for first time layout show header and then protected component run so user is not login yet so i redirect to /login and when user loged and navigate to anthor route the state of usesession changed so when state change the protected component run again and make check again . so with every route nextauth update session state to know is session expired or not for example
  //Yes! NextAuth checks the session on every page where you use useSession().
  const { data: session, status } = useSession(); // Get session data and status
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  useEffect(() => {
    if (status === "loading") return; // Wait until session is checked

    // ✅ Redirect to login if no session & not already on /login
    if (!session) {
      router.replace("/login");
    }

    // ✅ Redirect to home if logged in & currently on /login
    if (session && pathname === "/login") {
      router.replace("/");
    }
  }, [session, status]);
 console.log(session)
  return <>{children}</>;
}