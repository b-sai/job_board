import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { ResumeProvider } from "ResumeContext";
import { DarkModeProvider } from "job-board/DarkModeContext";
import { CSPostHogProvider } from "./provider";
import { FilterProvider } from "FilterDataProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body>
          <SessionProvider>
            <FilterProvider>
              <DarkModeProvider>
                <ResumeProvider>{children}</ResumeProvider>
              </DarkModeProvider>
            </FilterProvider>
          </SessionProvider>
          <Toaster />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
