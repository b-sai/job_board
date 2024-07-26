"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/icon.png";
import { cx } from "lib/cx";
import { useDarkMode } from "job-board/DarkModeContext";
import { Sun, Moon } from "lucide-react";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 dark:border-gray-800 lg:px-12",
        isHomePage && "dark:bg-dot-dark bg-dot",
        "bg-white dark:bg-gray-900"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <span className="sr-only">Job Board</span>
          <Image src={logoSrc} alt="Logo" width={90} height={45} priority />
        </Link>
        <button
          onClick={toggleDarkMode}
          className="rounded-full p-2 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
