'use client'
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import Post from "./Post";

export default function Posts() {
  const [data, setData] = useState([])
  const fetchData = async () => {
    const db = getFirestore(app);
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    let datas = [];
    querySnapshot.forEach((doc) => {
      datas.push({ id: doc.id, ...doc.data() });
    });
    setData(datas)
  };

  useEffect(()=> {
    fetchData()
  },[])

  return (
    <div>{data && data.map((post) => <Post key={post.id} post={post} />)}</div>
  );
}
