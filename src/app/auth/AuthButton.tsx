"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSignIn = async () => {
    await signIn("google");
    try {
      const result = await signIn("google", { redirect: false });
      console.log(result, "signed in");
      if (result?.error) {
        console.error("Sign-in error:", result.error);
        // Handle error (e.g., show error message to user)
      } else if (result?.ok) {
        console.log("Sign-in successful");
        // Handle successful sign-in (e.g., redirect or update UI)
      }
    } catch (error) {
      console.error("Unexpected error during sign-in:", error);
      // Handle unexpected errors
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
