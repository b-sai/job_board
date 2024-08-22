import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await signOut({ callbackUrl: "/handleSignOut" });
      }}
      className="authButton"
    >
      Sign Out
    </button>
  );
}
