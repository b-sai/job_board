import { useState } from "react";
import { X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

import React from "react";

const GoogleSignInButton = ({ handleSignIn }: { handleSignIn: () => void }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleSignIn}
        className="flex w-2/3 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
          <path fill="none" d="M1 1h22v22H1z" />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};
import Image from "next/image";
export default function SignInModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <button onClick={openModal} className="authButton">
        Sign in
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mb-6 flex justify-center">
              <Image
                src="icon_rocket.png"
                alt="Rocket Jobs Logo"
                width={100}
                height={100}
                className="h-16 w-auto"
              />
            </div>

            <h2 className="mb-2 text-center text-lg font-medium text-gray-900">
              Sign up on Rocket Jobs
            </h2>
            <p className="mb-4 text-center text-sm text-gray-500">
              Sign up to track jobs you've applied to and save your resume
            </p>
            <div className="pb-4 pt-2">
              <GoogleSignInButton
                handleSignIn={async () => {
                  try {
                    const result = await signIn("google", {
                      callbackUrl: "/handleAuth",
                    });
                  } catch (error) {
                    console.error("error123", error);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
