import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { ResumeProvider } from "ResumeContext";
import { DarkModeProvider } from "job-board/DarkModeContext";
import { CSPostHogProvider } from "./provider";
import { FilterProvider } from "FilterDataProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body>
          <FilterProvider>
            <DarkModeProvider>
              <ResumeProvider>{children}</ResumeProvider>
            </DarkModeProvider>
          </FilterProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
