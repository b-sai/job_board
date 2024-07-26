import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { ResumeProvider } from "ResumeContext";
import { DarkModeProvider } from "job-board/DarkModeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <ResumeProvider>{children}</ResumeProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
