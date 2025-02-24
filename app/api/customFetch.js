 import { getServerSession } from "next-auth";
 import { authOptions } from "./auth/authOptions";
import { getSession } from "next-auth/react";
export const customFetch = async (url, options = {}) => {
    // 1-adding getserversession to access token from session will make all my routes which contains this custom fetch dynamic  
    // so add forc-static to route to keep it static if i want
    //  const session= await getServerSession(authOptions)

   

    //2- so another solution is make api route to fetch token from next server then make context client component at this
    // component i will make request to api route and store the token back from it to state then share this state between 
    // children which will wrapped by this context but usecontext will not be used at server components 
    // so i can pass token from context at client components and pass from getserversession at server components

   
    //  const tokenRes = await fetch('http://localhost:3002/api/token',{credentials:'include'})
    //  const token = await tokenRes()
    //  console.log('token',token)
     

    // check if component is server so get token from getServerSession and if client component use getSession
    let session
    if (typeof window === "undefined") {
      // Running on the server
      session = await getServerSession(authOptions);
    } else {
      // Running on the client
      session = await getSession();
    }
    const headers = {
      "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
    };
     console.log("Request Headers:", headers); // to insure that header contains access token i get from getsessionServer 
    try {
      const response = await fetch(url, { ...options, headers });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  };



