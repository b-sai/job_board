import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

// Add duration prop with a default value
const FakeLoadingBar = ({ duration = 10 }: { duration?: number }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  const messages = ["Please Wait, It's taking longer than expected"];

  useEffect(() => {
    const progressTimer = startProgress();
    const messageTimer = startMessageCycle();

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  const startProgress = () => {
    const interval = 100; // Update every 100ms
    const steps = (duration * 500) / interval;
    const increment = 100 / steps;

    return setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);
  };

  const startMessageCycle = () => {
    return setInterval(() => {
      setText(messages[Math.floor(Math.random() * messages.length)]);
    }, 5000);
  };

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <Progress value={progress} className="mb-2 w-full" />
      <div className="text-center text-sm font-medium">
        {Math.round(progress)}%
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">{text}</div>
    </div>
  );
};

export default FakeLoadingBar;
