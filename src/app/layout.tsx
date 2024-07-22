import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { ResumeProvider } from "ResumeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
