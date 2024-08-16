import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await signOut({ callbackUrl: "/handleSignOut" });
      }}
      className="mr-2 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Sign Out
    </button>
  );
}
