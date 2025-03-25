'use client';

import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../Header/Header';

export default function ProtectedRoutes({ children }) {
  // How useSession() Handles Requests
  // 📌 First Visit (Initial Page Load)

  // When useSession() runs for the first time, it fetches the session from /api/auth/session.
  // You can see this request in the Network tab in DevTools.
  // NextAuth then caches the session in memory.
  // 📌 Subsequent Route Changes

  // When Does NextAuth Fetch /api/auth/session Again?

  // If the page is reloaded (F5 or direct visit).
  // If the session expires.
  // If you manually call update() to refresh the session.
  // If staleTime expires (default: 0, meaning no caching by default).
  // When navigating between pages using client-side routing (Next.js useRouter() or <Link />), useSession() does not make another request.
  // Instead, it reads from the cached session.
  // ok at app renderd for first time layout show header and then protected component run so user is not login yet so i redirect to /login and when user loged and navigate to anthor route the state of usesession changed so when state change the protected component run again and make check again . so with every route nextauth update session state to know is session expired or not for example
  //Yes! NextAuth checks the session on every page where you use useSession() at request from network when .
  //i means at first visit usesession make request to auth/session  which i can see at network and then with every routing it use cache of session not make another request
  const { data: session, status } = useSession(); // Get session data and status
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  useEffect(() => {
    if (status === 'loading') return; // Wait until session is checked

    // ✅ Redirect to login if no session & not already on /login
    if (!session) {
      router.replace('/login');
    }

    // ✅ Redirect to home if logged in & currently on /login
    if (session && pathname === '/login') {
      router.replace('/');
    }
  }, [session, status]);
  console.log(session);
  return (
    <>
      {' '}
      {/* <Header /> */}
      {children}
    </>
  );
}

// Since your About page is a Server Component but wrapped by a Client Component (ProtectedRoutes) that uses useSession(), NextAuth will NOT make another request to /api/auth/session when navigating to it.

// 🔹 Why?
// First Page Load

// useSession() in ProtectedRoutes makes a request to /api/auth/session to fetch the session.
// The session is cached in memory.
// Navigating to Another Page (Client-Side Routing)

// If you navigate with <Link /> or useRouter(), the cached session is used.
// No additional request is made to /api/auth/session unless the session expires.
// What Happens When Visiting an SSR Page?

// Normally, SSR pages do not have access to the client-side session cache.
// But since your Server Component is wrapped by a Client Component (ProtectedRoutes), useSession() is used only on the client side.
// This means the session does NOT refetch on every navigation—it relies on the cached session.

//try is also
// 'use client';
// import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// const ProtectedRoutes = ({ children }) => {
//   const { status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'authenticated') {
//       router.push('/category1/test');
//     }
//   }, [status, router]);

//   return children;
// };

// export default ProtectedRoutes;
