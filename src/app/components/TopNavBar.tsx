"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cx } from "lib/cx";
import { useDarkMode } from "job-board/DarkModeContext";
import { Sun, Moon } from "lucide-react";
import FilterButtonWithModal from "job-board/FilterButton";
import { useMediaQuery } from "react-responsive"; // Add this import
import AuthButton from "auth/AuthButton";
import SignOutButton from "auth/signOutButton";
import { useSession } from "next-auth/react";


export const TopNavBar = ({
  showTracker = true,
  showFilter = true,
}: {
  showTracker?: boolean;
  showFilter?: boolean;
}) => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const { darkMode, toggleDarkMode } = useDarkMode();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const session = useSession();
  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 dark:border-gray-800 lg:px-12",
        isHomePage && "dark:bg-dot-dark bg-dot",
        "bg-white dark:bg-black"
      )}
    >
      <div className="flex h-10 w-full items-center justify-end">
        <a
          href="/"
          onClick={() => window.location.reload()}
          className="mr-auto"
        >
          <span className="sr-only">Job Board</span>
          <Image src="/icon.png" alt="Logo" width={90} height={45} priority />
        </a>

        <div className="mx-1">
          {showTracker && (
            <Link
              href="/tracker"
              className="mr-auto rounded-full p-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              View Applied Jobs
            </Link>
          )}
        </div>
        {session.status === "authenticated" ? (
          <SignOutButton />
        ) : (
          <AuthButton />
        )}
        <div className="flex items-center space-x-4">
          {showFilter && isMobile && <FilterButtonWithModal />}
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
