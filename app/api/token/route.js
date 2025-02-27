import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function GET(req) {
  // next auth encrypted jwt and  stores it in the cookie but cookie itself is not encrypted, 
  // so i use getToken to decrypt  the jwt at cookie and  to access token from it  .The JWT is encrypted using NEXTAUTH_SECRET.
  // and if i do not have nextauth secret at .env nextauth generate one Problem? This means the secret changes every time you restart 
  // the server → old JWTs become invalid because they were encrypted with a different secret so you must login again and i try it.
  // const cookieStore = cookies()
  // const sessionToken = cookieStore.get("next-auth.session-token")?.value;
  const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });;
  const token = jwt.accessToken
  if(!token){
    return Response.json('not found')
  }
 return Response.json({ token});
}





