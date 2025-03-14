// remove auth options to anthor file so when i try it export it from route to customFunction it case error i search and this is the solution
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {checkUsers} from '../../users'
export  const authOptions   = {
    providers: [
      CredentialsProvider({
        name:'Signin credentails',
        credentials:{
          email:{label:'email',type:'email'},
          password:{label:'password',type:'password'}
        },
        // when use my custom form the object i pass to signin function from nextuth be passed as creadentials param to authorize function
        async authorize(credentials){
          // Call your backend API to authenticate the user
          //   const res = await fetch("http://localhost:5000/auth/login", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify(credentials),
          //   });
          // }
          //  const user = await res.json();
          // if (!res.ok || !user) {
          //   throw new Error("Invalid credentials");
          // }
    
          // // Return user with token
          // return { ...user, accessToken: user.token };
    
          // add now my logic
          const user = checkUsers(credentials.email);
          if (user) {
            return user; 
          } else {
            
            console.log(user,"Invalid email or password")
            return null
          }
        },
    }),
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      
    ],
    callbacks: {
      //user comes from the authorize function (for Credentials Provider) or from OAuth providers like GitHub.
      // The token parameter in the jwt function is a built-in object provided by NextAuth.js. It is part of the authentication lifecycle in NextAuth and is automatically managed for you.
      //The token object created in the jwt callback is stored in the session when using NextAuth.js.
      //saving user data to token of nextauth this token will be stored as jwt at cookies it stored as jwt based on strategy i have defined 
      async jwt({token,user}){
       if(user){
        token.id =user.id
        token.username= user.name
        token.email=user.email
        token.accessToken = user.token; // Save token
       }
       return token
      },
      //When you authenticate a user in NextAuth.js, the session object doesn't directly get user data. Instead, data flows through the jwt callback first before being passed to the session. so i should pass data first to token to pass it the session
      // session is a built-in object in NextAuth.js → It represents the user session that will be accessible on the frontend.
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name=token.username
        session.user.accessToken = token.accessToken; // Make token available in session
        return session;
      },
    },
    // This defines how session data is stored. "jwt" → The session data is stored in a signed JWT (JSON Web Token), instead of using a database.
    // To the frontend → it returns as an Object
    //To the backend → it is stored as a JWT inside a cookie
    session:{
      strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
  };