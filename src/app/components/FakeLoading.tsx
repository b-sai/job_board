import React, { useState, useEffect } from "react";

const FakeLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  const messages = [
    "Parsing education",
    "Parsing experience",
    "Parsing skills",
    "Parsing projects",
  ];

  useEffect(() => {
    const totalDuration = 15000; // 20 seconds total
    const five_percent = Math.floor(totalDuration * 0.05);
    const chunkInterval = 300; // Update every 200ms for chunky progress
    const pauseAt = 95; // Pause at 95%
    const chunkSize = 4; // Progress increases by 0-3% each chunk
    let timer: any;
    let messageTimer: any;
    let startTime = Date.now();

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const rawProgress = (elapsedTime / totalDuration) * 100;

      if (rawProgress >= pauseAt) {
        // Pause at 95% for the last 15 seconds
        if (elapsedTime >= totalDuration - five_percent) {
          setProgress(100);
          clearInterval(timer);
          clearInterval(messageTimer);
        } else {
          setProgress(pauseAt);
        }
      } else {
        // Chunky progress
        setProgress((prev) => {
          const increment = Math.random() * chunkSize;
          return Math.min(pauseAt, prev + increment);
        });
      }
    };

    const updateMessage = () => {
      setText(messages[Math.floor(Math.random() * messages.length)]);
    };

    timer = setInterval(updateProgress, chunkInterval);
    messageTimer = setInterval(updateMessage, 4000); // Change message every second

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="mb-2 h-4 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-center text-sm font-medium">
        {Math.round(progress)}%
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">{text}</div>
    </div>
  );
};

export default FakeLoadingBar;
