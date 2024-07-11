import "globals.css";
import { TopNavBar } from "components/TopNavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
