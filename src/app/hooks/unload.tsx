import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useTrackExit = (
  userId: string | undefined,
  viewedSet: Set<number>,
  appliedSet: Set<number>
) => {
  const session = useSession();
  console.log("HERE UNLOAD", session.status);
  useEffect(() => {
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
  }, []);

  const trackExit = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}trackings/`;
    const interactionsData = {
      viewed: Array.from(viewedSet),
      applied: Array.from(appliedSet),
    };
    const data = JSON.stringify({
      user_id: userId,
      interactions: [
        ...interactionsData.viewed.map((appId) => ({
          application_id: appId,
          interaction_type: "viewed",
        })),
        ...interactionsData.applied.map((appId) => ({
          application_id: appId,
          interaction_type: "applied",
        })),
      ],
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, data);
    } else {
      // Fallback to fetch for browsers that don't support sendBeacon
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        keepalive: true,
      }).catch((error) => console.error("Error tracking exit:", error));
    }
  };
};

export default useTrackExit;
