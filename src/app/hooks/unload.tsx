import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

const useTrackExit = (
  userId: string | undefined,
  viewedJobs: Set<number>,
  appliedJobs: Set<number>
) => {
  const session = useSession();
  useEffect(() => {
    console.log("HERE UNLOAD", session.status);
    if (session.status !== "authenticated") return;
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        userId &&
        session.status === "authenticated"
      ) {
        trackExit();
      }
    };

    const handleRouteChange = () => {
      if (userId && session.status === "authenticated") {
        trackExit();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [session]);

  const viewedSetRef = useRef(viewedJobs);
  const appliedSetRef = useRef(appliedJobs);
  useEffect(() => {
    viewedSetRef.current = viewedJobs;
    appliedSetRef.current = appliedJobs;
  }, [viewedJobs, appliedJobs]);

  const trackExit = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}trackings/`;
    console.log("VIEWED", viewedSetRef.current);
    const interactionsData = {
      viewed: Array.from(viewedSetRef.current),
      applied: Array.from(appliedSetRef.current),
    };
    const data = JSON.stringify({
      user_id: userId,
      viewed: interactionsData.viewed,
      applied: interactionsData.applied,
    });
    console.log("DATA", data);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
      keepalive: true,
    }).catch((error) => console.error("Error tracking exit:", error));
  };
};

export default useTrackExit;
