"use client";

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import Moment from 'react-moment'

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [comment, setComment] = useState("");
  const [allcomments, setAllcomments] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments"), orderBy('timestamp', 'desc')), (snapshot) => {
      setAllcomments(snapshot.docs);
    });
  }, [db, id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    //add comment to firestore
    const commentToPost = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToPost,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div>
      {allcomments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll">
          {allcomments.map((comment, index) => (
            <div key={index} className="flex justify-between items-center space-x-2 mb-2">
              <img
                src={comment.data().userImage}
                alt="userimage"
                className="h-7 rounded-full object-cover border p-[2px]"
              />
              <p className="text-sm flex-1 truncate">
                <span className="font-bold text-gray-700">{comment.data().username}{':  '}</span>
                <span className="text-xs">{comment.data().comment}</span>
             </p>
             <Moment fromNow className="text-xs text-gray-400 pr-2">
                {comment.data().timestamp?.toDate()}
             </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center p-4 gap-2"
        >
          <img
            className="h-10 w-10 rounded-full object-cover border p-[4px]"
            src={session.user.image}
            alt="user-image"
          />
          <input
            className="border-none flex-1 focus:ring-0 outline-none"
            onChange={(e) => setComment(e.target.value)}
            type="text"
            value={comment}
            placeholder="Add a comment..."
          />
          <button
            className="text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400"
            type="submit"
            disabled={!comment.trim()}
          >
            post
          </button>
        </form>
      )}
    </div>
  );
}
