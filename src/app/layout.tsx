import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { ResumeProvider } from "ResumeContext";
import { DarkModeProvider } from "job-board/DarkModeContext";
import { CSPostHogProvider } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body>
          <DarkModeProvider>
            <ResumeProvider>{children}</ResumeProvider>
          </DarkModeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
