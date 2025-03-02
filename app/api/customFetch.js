import { getServerSession } from 'next-auth';
import { authOptions } from './auth/authOptions';
import { getSession } from 'next-auth/react';
export const customFetch = async (url, options = {}) => {
  // 1-adding getserversession to access token from session will make all my routes which contains this custom fetch dynamic
  // so add forc-static to route to keep it static if i want i use this solution
  // now getsession and usesession and getserversession get decrypted object from stored jwt first they read cookies which send by browser
  //  and send them to next server nextauth at server next decrypte jwt and return object
  //  const session= await getServerSession(authOptions)
  //check if component is server so get token from getServerSession and if client component use getSession
  let session;
  let cookieHeader;
  if (typeof window === 'undefined') {
    // Running on the server
    session = await getServerSession(authOptions); // use this to get session (first way) to get token or api route (third way)
    const { cookies } = await import('next/headers'); // to import only at server components
    const cookieStore = cookies();
    cookieHeader = cookieStore.toString();
  } else {
    // Running on the client
    session = await getSession();
  }

  //2- so another solution is make api route to fetch token from next server then make context client component at this
  // component i will make request to api route and store the token back from it to state then share this state between
  // children which will wrapped by this context but usecontext will not be used at server components
  // so i can pass token from context at client components and pass from getserversession at server components

  //3- i want use api route:
  // if i am at client component so browser will make request to next server and sent cookies and api route will extract it
  //so i not need to add credentials include.
  // at server component now next sever will make request to it self at api route so i need to get cookies from request header
  //which browser make first to add it manually to request from server to server so use cookies()(note cookies read the req header from browser to server so it will no work at client components)
  // so i add it at condition of window or not but third way need to remove export const dynamic = 'force-static' from about to cookies work

  const tokenRes = await fetch('http://localhost:3002/api/token', {
    headers: { Cookie: cookieHeader },
  });
  const res = await tokenRes.json();

  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${session?.user.accessToken}`, // if only use the first way
    Authorization: `Bearer ${res.token}`, // if use the third way
  };
  console.log('Request Headers:', headers); // to insure that header contains access token i get from getsessionServer
  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};
