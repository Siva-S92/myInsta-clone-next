
'use client'
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  collection,
  getFirestore,
  onSnapshot, // Import onSnapshot
  orderBy,
  query,
} from "firebase/firestore";
import Post from "./Post";

export default function Posts() {
  const [data, setData] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const db = getFirestore(app);
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let datas = [];
      querySnapshot.forEach((doc) => {
        datas.push({ id: doc.id, ...doc.data() });
      });
      setData(datas);
      console.log("Posts updated in real-time:", datas);
    }, (error) => {
      // This is where the permission error will be caught cleanly
      console.error("Error listening to posts:", error);
    });

    // Cleanup: Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Use an empty dependency array to run only once on mount

  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
