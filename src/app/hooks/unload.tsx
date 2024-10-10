import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { apiWrapper } from "../../utils/apiWrapper";

const useTrackExit = (
  userId: string | undefined,
  viewedJobs: Set<number>,
  appliedJobs: Set<number>
) => {
  const session = useSession();
  useEffect(() => {
    if (session.status !== "authenticated") return;
    
    const handleExit = () => {
      if (userId && session.status === "authenticated") {
        trackExit();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleExit();
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      handleExit();
      // Uncomment the following lines if you want to show a confirmation dialog
      // event.preventDefault();
      // event.returnValue = '';
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handleExit);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handleExit);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [session, userId]);

  const viewedSetRef = useRef(viewedJobs);
  const appliedSetRef = useRef(appliedJobs);
  useEffect(() => {
    viewedSetRef.current = viewedJobs;
    appliedSetRef.current = appliedJobs;
  }, [viewedJobs, appliedJobs]);

  const trackExit = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}trackings/`;
    const interactionsData = {
      viewed: Array.from(viewedSetRef.current),
      applied: Array.from(appliedSetRef.current),
    };
    const data = JSON.stringify({
      user_id: userId,
      viewed: interactionsData.viewed,
      applied: interactionsData.applied,
    });

    apiWrapper("/trackings/", "POST", data).catch((error) =>
      console.error("Error tracking exit:", error)
    );
  };
};

export default useTrackExit;
