import { getServerSession } from "next-auth";
import { authOptions } from "./auth/authOptions";
export const customFetch = async (url, options = {}) => {
    // adding getserversession to access token from session will make all my routes which contains this custom fetch dynamic and will not work at client components
    const session= await getServerSession(authOptions)
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

