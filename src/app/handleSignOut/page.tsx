// handleAuth/page.tsx
"use client";
import { redirect } from "next/navigation";
import { usePostHog } from "posthog-js/react";
export default function HandleSignOut() {
  const posthog = usePostHog();
  posthog.reset();
  console.log("signed out 123123123");
  redirect("/");
}
