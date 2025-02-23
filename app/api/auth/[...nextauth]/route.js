import NextAuth from "next-auth";
import {authOptions} from '../authOptions'
// You use CredentialsProvider to manually authenticate users f authentication is successful, NextAuth creates a session and stores user data (like email, id, and accessToken).


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };




// Breakdown of what happens at credentials provider:
// You call an external API to authenticate the user and get an access token.
// You store this access token inside NextAuth’s token inside the jwt callback.
// NextAuth stores its own JWT (which now includes your access token) in an HTTP-only cookie.
// The Next.js server automatically sends this cookie to the browser.
// On each request, the browser sends this cookie back, so you don’t need to manually attach the access token in every request.
// This means you do not need to manually include the access token in each request—NextAuth's session management takes care of it.