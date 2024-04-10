"use client";
import Modal from "antd/es/modal/Modal";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { HiCamera } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function Header() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagefileUrl, setImagefileUrl] = useState(null);
  const [isopen, setIsOpen] = useState(false);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const filePickerRef = useRef(null);
  const { data: session } = useSession();
  const db = getFirestore(app);

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagefileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} done`);
      },
      (error) => {
        console.error(error);
        setImageFileUploading(false);
        setImagefileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImagefileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    setPostUploading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption,
      profileImg: session.user.image,
      image: imagefileUrl,
      timestamp: serverTimestamp(),
    });
    setPostUploading(false);
    setIsOpen(false);
    location.reload();
  };

  return (
    <>
      <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* logo */}
          <Link href={"/"} className="hidden lg:inline-flex">
            <Image
              src="/Instagram_logo_black.webp"
              width={96}
              height={96}
              alt="instagram logo"
            />
          </Link>

          <Link href={"/"} className="lg:hidden">
            <Image
              src="/800px-Instagram_logo_2016.webp"
              width={40}
              height={40}
              alt="instagram logo"
            />
          </Link>

          {/* serch input */}
          <input
            className="bg-gray-50 border border-gray-400 rounded text-sm w-full py-2 px-4 max-w-[210px]"
            type="text"
            placeholder="search"
          />

          {/* menuitems */}

          {session ? (
            <>
              <div className="flex items-center gap-2">
                <MdAddCircleOutline
                  onClick={() => setIsOpen(!isopen)}
                  className="text-2xl cursor-pointer transform hover:scale-125 transition duration-300 ease-in-out hover:text-red-500"
                />
                <img
                  onClick={signOut}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={session.user.image}
                  alt={session.user.name}
                />
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              type="button"
              className="text-sm font-semibold  text-blue-500"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {isopen && (
        <Modal
          open={isopen}
          title={"choose your file"}
          onCancel={() => setIsOpen(!isopen)}
        >
          <div className="flex flex-col justify-center items-center py-2">
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                className={`w-full max-h-[250px] object-cover ${
                  imageFileUploading ? "animate-pulse" : ""
                }`}
                src={imagefileUrl}
                alt="selected file"
              />
            ) : (
              <>
                <HiCamera
                  onClick={() => filePickerRef.current.click()}
                  className="text-7xl text-gray-300 cursor-pointer"
                />
                <input
                  className="hidden"
                  ref={filePickerRef}
                  onChange={addImageToPost}
                  type="file"
                  accept="image/*"
                />
              </>
            )}
          </div>
          <input
            onChange={(e) => setCaption(e.target.value)}
            className="border-none outline-none w-full text-center h-8 mb-5"
            type="text"
            placeholder="please enter your caption "
          />
          <button
            onClick={handleSubmit}
            disabled={
              !selectedFile ||
              caption.trim() === "" ||
              postUploading ||
              imageFileUploading
            }
            className="w-full bg-red-500 text-white p-2 rounded-lg shadow-md hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            type="button"
          >
            Upload Post
          </button>
          
        </Modal>
      )}
    </>
  );
}
