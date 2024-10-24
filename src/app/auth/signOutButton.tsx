import { signOut } from "next-auth/react";
import { useMediaQuery } from "react-responsive";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function SignOutButton() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <button
      onClick={async () => {
        await signOut({ callbackUrl: "/handleSignOut" });
      }}
      className="authButton"
    >
      {isMobile ? <LogOut size={20} /> : "Sign Out"}
    </button>
  );
}
