// import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
// import { SignupFormSchema } from './definitions' 
import { cookies } from "next/headers";
// import { createSession } from '../actions/auth';
// import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    // .setExpirationTime('1d')
    .setExpirationTime('2m')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function login(payload: any) {
  const user = payload
  const expires = 72 * 1000; // Set session expiration time (10 seconds from now)
  // createSession(payload, expires)
}

export async function logout() {
  // Destroy the session by clearing the session cookie
  (await
    // Destroy the session by clearing the session cookie
    cookies()).set("session", "", { expires: new Date(0) });
}


export async function getSession() {
  const session = (await cookies()).get("session")?.value; // Retrieve the session cookie value
  if (!session) return null; // If session is not found, return null
  return await decrypt(session); // Decrypt and return the session payload
}

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get("session")?.value; // Retrieve the session cookie value from the request
//   if (!session) return; // If session is not found, return

//   // Refresh the session expiration time
//   const parsed = await decrypt(session); // Decrypt the session data
//   parsed.expires = new Date(Date.now() + 10 * 1000); // Set a new expiration time (10 seconds from now)
//   const res = NextResponse.next(); // Create a new response
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed), // Encrypt and set the updated session data
//     httpOnly: true,
//     expires: parsed.expires, // Set the expiration time
//   });
//   return res; // Return the response
// }