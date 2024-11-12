'use client'
import React, { useEffect, useState } from 'react'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
//after a user signs in with Google (via NextAuth), Firebase recognizes the user as authenticated.
import { useSession } from "next-auth/react";
import { getAuth, signInWithCustomToken } from "firebase/auth";

export default function Feed() {
  //after a user signs in with Google (via NextAuth), Firebase recognizes the user as authenticated.
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authenticateWithFirebase = async () => {
      if (session?.user) {
        try {
          // Get the custom token from your API
          const response = await fetch("/api/createCustomToken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: session.user.uid }),
          });
          const data = await response.json();
          const customToken = data.customToken;

          // Sign in with the custom token
          const auth = getAuth();
          await signInWithCustomToken(auth, customToken);
          console.log("Successfully signed in with Firebase using custom token");
          setIsAuthenticated(true)
        } catch (error) {
          console.error("Error signing in with Firebase:", error);
        }
      }
    };

    if (status === "authenticated") {
      authenticateWithFirebase();
    }
  }, [session, status, isAuthenticated]);

  if (status === "loading") return <p>Loading...</p>;

  //*****************************************************************************************************
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto'>
        {/* posts left */}
        <section className='md:col-span-2'>
            <Posts/>
        </section>


        {/* Mini profile rightside */}
        <section className='hidden md:inline-grid md:col-span-1'>
            <div className='fixed w-[380px]'>
             <MiniProfile/>
            </div>
        </section>
    </main>
  )
}
