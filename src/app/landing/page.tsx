"use client";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GradualSpacing from "@/components/ui/gradual-spacing";
import RetroGrid from "@/components/ui/retro-grid";
import ShimmerButton from "@/components/ui/shimmer-button";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { TopNavBar } from "components/TopNavBar";
import ShinyButton from "@/components/ui/shiny-button";

export default function AnimatedGridPatternDemo() {
  return (
    <>
      <TopNavBar />
      <div className="bg-white-500">
        <RetroGrid angle={45} className="h-full w-full" />
        <div className="relative w-full  p-20">
          <div className="relative flex flex-col gap-8">
            {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"> */}
            {/* <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={1}
                repeatDelay={1}
                className={cn(
                  "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                  "inset-x-0 inset-y-[-80%] h-[200%] skew-y-12"
                )}
              /> */}
            {/* </div> */}
            <div className="relative z-10 flex flex-col gap-2 pb-5">
              <p className="whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
                Get Jobs Tailored to Your Resume
              </p>
            </div>

            {/* Move the AnimatedGridPattern before the image and add z-index */}
            <div className="relative z-10 flex w-full justify-center pb-5 pt-5">
              <ShinyButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium capitalize leading-none tracking-tight text-black dark:from-white dark:to-slate-900/10">
                  Try Rocket Jobs, it's 100% free no ads &gt;
                </span>
              </ShinyButton>
            </div>
            <div className="relative z-10 flex  w-full justify-center rounded-xl">
              <div className="absolute inset-x-0 bottom-0 z-20 h-96 bg-gradient-to-t from-white to-transparent" />
              <Image
                src="./image_dock.png"
                height={1024}
                width={1024}
                alt="Background"
                className="blur-50 overflow-hidden filter"
              />
            </div>
            <div className="flex w-full flex-col gap-4  lg:flex-row">
              <MagicCard
                className="w-full cursor-pointer flex-col items-start justify-start rounded-lg bg-white p-6 text-black shadow-lg"
                gradientColor={"#D9D9D955"}
              >
                <span className="text-xl font-bold">2k+ US SWE & ML Jobs</span>
                <p className="mt-2 break-words text-sm">
                  Jobs are sourced directly from career pages of top tech
                  companies and startups
                </p>
              </MagicCard>
              <MagicCard
                className="w-full cursor-pointer flex-col items-start justify-start rounded-lg bg-white p-6 text-black shadow-lg"
                gradientColor={"#D9D9D955"}
              >
                <span className="text-xl font-bold">Get Relevant Jobs</span>
                <p className="mt-2 break-words text-sm">
                  AI that looks at not just keywords but the content of your
                  resume to suggest jobs with similar work requirements
                </p>
              </MagicCard>
              <MagicCard
                className="w-full cursor-pointer flex-col items-start justify-start rounded-lg bg-white p-6 text-black shadow-lg"
                gradientColor={"#D9D9D955"}
              >
                <span className="text-xl font-bold">
                  Job Tracker that just works
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

// export default function EmailClient() {
//   return (
//     <div className="min-h-screen">
//       <section className="px-4 py-20 text-center">
//         <div className="mx-auto max-w-3xl space-y-6">
//           <GradualSpacing
//             className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white dark:text-white"
//             text="Magic UI is the new"
//           />

//           <GradualSpacing
//             className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white dark:text-white"
//             text="way to build landing pages."
//           />
//           <div className="flex justify-center">
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
