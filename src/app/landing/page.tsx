"use client";
import RetroGrid from "@/components/ui/retro-grid";
import Image from "next/image";
import { MagicCard } from "@/components/ui/magic-card";
import { TopNavBar } from "components/TopNavBar";
import ShinyButton from "@/components/ui/shiny-button";
import WordFadeIn from "@/components/ui/word-fade-in";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export default function AnimatedGridPatternDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 767);
  }, []);

  console.log(isMobile);
  return (
    <>
      <TopNavBar showTracker={false} showFilter={false} />
      <div className="bg-white dark:bg-black">
        <RetroGrid angle={19} className="h-full w-full" />
        <div className={`relative w-full ${isMobile ? "p-5" : "p-5 lg:p-20"}`}>
          <div className="relative flex flex-col gap-8">
            <div className="relative z-10 flex flex-col">
              <WordFadeIn
                words="Get Jobs Tailored to Your Resume"
                delay={0.1}
              />
            </div>

            <div className="relative z-10 flex w-full justify-center pb-5 pt-5">
              <ShinyButton
                className="shadow-2xl"
                onClick={() => {
                  return (window.location.href = "https://rocketjobs.app/");
                }}
              >
                <span className="whitespace-pre-wrap text-center text-sm font-medium capitalize leading-none tracking-tight text-black dark:text-white">
                  Try Rocket Jobs, it's 100% free no ads &gt;
                </span>
              </ShinyButton>
            </div>

            <div className="flex justify-center">
              <div
                className={`relative z-10 flex ${
                  isMobile ? "w-full" : "w-[75%]"
                } rounded-xl`}
              >
                <div
                  className={`absolute inset-x-0 bottom-0 z-20 ${
                    isMobile ? "h-40" : "h-96"
                  } bg-gradient-to-t from-white to-transparent dark:from-gray-900`}
                />
                <Image
                  src="./image_dock.png"
                  height={1024}
                  width={1024}
                  alt="Background"
                  className="blur-50 w-full overflow-hidden filter"
                  style={{ width: "auto" }} // Maintain aspect ratio
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 lg:flex-row">
              <MagicCard
                className="w-full cursor-pointer flex-col items-start justify-start rounded-lg bg-white p-6 text-black shadow-lg dark:bg-gray-800 dark:text-white"
                gradientColor={"#D9D9D955"}
              >
                <span className="text-xl font-bold">Get Relevant Jobs</span>
                <p className="mt-2 break-words text-sm">
                  AI that looks at not just keywords but also the content of
                  your resume to suggest jobs with similar work requirements
                </p>
              </MagicCard>
              <MagicCard
                className="w-full cursor-pointer flex-col items-start justify-start rounded-lg bg-white p-6 text-black shadow-lg dark:bg-gray-800 dark:text-white"
                gradientColor={"#D9D9D955"}
              >
                <span className="text-xl font-bold">
                  2k+ SWE & ML Jobs in US Added Daily
                </span>
                <p className="mt-2 break-words text-sm">
                  Jobs are sourced directly from career pages of top tech
                  companies and startups
                </p>
              </MagicCard>
              <MagicCard
                className="w-full cursor-pointer flex-col items-start justify-start rounded-lg bg-white p-6 text-black shadow-lg dark:bg-gray-800 dark:text-white"
                gradientColor={"#D9D9D955"}
              >
                <span className="text-xl font-bold">
                  Job Tracker That Just Works
                </span>
                <p className="mt-2 break-words text-sm">
                  Job Tracker automatically tracks all applied jobs without a
                  single click
                </p>
              </MagicCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
