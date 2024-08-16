// handleAuth/page.tsx
"use server";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import ClientUpdateUser from "./userUpsert";
export default async function HandleAuth() {
  const session = await auth();

  if (session) {
    console.log("User is signed in");
    return <ClientUpdateUser session={session} />;
  } else {
    console.log("User is not signed in");
    redirect("/");
  }
}
