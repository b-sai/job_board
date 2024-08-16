"use server";

import { auth } from "../../../auth";

export async function handleAuth() {
  const session = await auth();
  console.log("session123", session);
  if (session) {
    console.log("User is signed in:", session);
  } else {
    console.log("User is not signed in");
  }
}
