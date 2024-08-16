// handleAuth/ClientUpdateUser.tsx
"use client";
import { Session } from "next-auth";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { usePostHog } from "posthog-js/react";
export default function ClientUpdateUser({ session }: { session: Session }) {
  const posthog = usePostHog();
  function updateUser(session: Session) {
    console.log("in userUpsert");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const user_id =
      posthog.get_distinct_id() || process.env.NEXT_PUBLIC_USER_ID || null;
    const formData = new FormData();
    if (user_id !== null) formData.append("user_id", user_id);
    if (session?.user?.email) formData.append("email", session.user.email);
    if (session?.user?.name) formData.append("name", session.user.name);

    fetch(`${baseUrl}upsert_user/`, {
      method: "POST",
      body: formData,
    });
  }

  useEffect(() => {
    updateUser(session);
    redirect("/");
  }, []);

  return null;
}
