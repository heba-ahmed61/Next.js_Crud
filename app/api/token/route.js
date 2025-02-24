

export async function GET(req,res) {
  const cookies = req.cookies;
  // console.log(req.cookies)
  const sessionToken = cookies['next-auth.session-token'];
  console.log('Session Token:', sessionToken);
  return new Response('hello world', { status: 200 });
}


// import { getSession } from 'next-auth/react';

// export async function GET(req, res) {
//   // Retrieve the session associated with the request
//   const session = await getSession({ req });

//   if (session) {
//     console.log('Session:', session);
//   } else {
//     console.log('No session found');
//   }

//   return new Response('hello world', { status: 200 });
// }


