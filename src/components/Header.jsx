"use client";
import Modal from "antd/es/modal/Modal";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { HiCamera } from "react-icons/hi";

export default function Header() {
  const [isopen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <div>
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
          <div className="flex justify-center items-center py-10">
            <HiCamera className="text-7xl text-gray-300" />
          </div>
          <input
            className="border-none outline-none w-full text-center h-8 mb-5"
            type="text"
            placeholder="please enter your caption "
          />
          <button
            disabled
            className="w-full bg-red-500 text-white p-2 rounded-lg shadow-md hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            type="button"
          >
            Upload Post
          </button>
        </Modal>
      )}
    </div>
  );
}
