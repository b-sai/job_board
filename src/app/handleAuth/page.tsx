"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePostHog } from "posthog-js/react";

export default function HandleAuth() {
  const posthog = usePostHog();
  const { data: session, status } = useSession();

  async function updateUser(session: any) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(
      `${baseUrl}user_exists/${session?.user?.email}`
    );
    const data = await response.json();
    const isOldUser = data.user_exists; // returns true
    let user_id;
    if (isOldUser) {
      console.log("Old user");
      user_id = data.user_id; // not null
    } else {
      console.log("New user");
      user_id = posthog.get_distinct_id() || process.env.NEXT_PUBLIC_USER_ID; // use new generated user ID
    }
    const formData = new FormData();
    if (user_id !== null) formData.append("user_id", user_id || "");
    if (session?.user?.email) formData.append("email", session.user.email);
    if (session?.user?.name) formData.append("name", session.user.name);
    posthog.identify(user_id, {
      email: session?.user?.email,
      name: session?.user?.name,
    });

    fetch(`${baseUrl}upsert_user/`, {
      method: "POST",
      body: formData,
    });
  }

  useEffect(() => {
    if (status === "loading") return; // Don't do anything while loading

    if (status === "authenticated") {
      console.log("User is signed in");
      updateUser(session);
    } else {
      console.log("User is not signed in");
    }
    redirect("/");
  }, [status, session]);

  if (status === "loading") {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return null; // This component doesn't render anything
}
