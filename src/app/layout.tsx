import "globals.css";
import { ResumeProvider } from "ResumeContext";
import { DarkModeProvider } from "job-board/DarkModeContext";
import { CSPostHogProvider } from "./provider";
import { FilterProvider } from "FilterDataProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { TrackerProvider } from "./TrackerProvider";

export const metadata = {
  title: "Rocket Jobs | Find Jobs Personalized to Your Resume",
  description:
    "Find jobs tailored to your resume using AI. Stop sifting through irrelevant jobs and get more interviews to land your dream job.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <CSPostHogProvider>
        <body>
          <SessionProvider>
            <FilterProvider>
              <DarkModeProvider>
                <TrackerProvider>
                  <ResumeProvider>{children}</ResumeProvider>
                </TrackerProvider>
              </DarkModeProvider>
            </FilterProvider>
          </SessionProvider>
          <Toaster />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
