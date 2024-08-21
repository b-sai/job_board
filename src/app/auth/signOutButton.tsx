import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await signOut({ callbackUrl: "/handleSignOut" });
      }}
      className="mb-2 mr-2 mt-2 rounded-md border border-gray-300 px-2 py-1 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-300"
    >
      Sign Out
    </button>
  );
}
