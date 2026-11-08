"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = (
    <>
      <li>
        <Link href="#">Features</Link>
      </li>
      <li>
        <Link href="#">Pricing</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
    </>
  );

  const { data, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const user = data?.user;

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <div>Logo</div>
          </div>
          <ul className="hidden items-center gap-4 md:flex">{menuLinks}</ul>
          <div>
            {user ? (
              <>{user.name}</>
            ) : (
              <>
                <Link href="/auth/signin">Login</Link>
              </>
            )}
          </div>
        </header>
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">{menuLinks}</ul>
            <div>
              {user ? (
                <>{user.name}</>
              ) : (
                <>
                  <Link href="/signin">Login</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
