// components/Navbar.tsx

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-6 py-4 bg-blue-100 text-blue-900 flex justify-between items-center shadow-md border-b border-blue-200">
      <Link href="/" className="text-3xl font-bold text-blue-700 hover:text-blue-900 transition">
        Next Todo
      </Link>

      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="hidden sm:inline text-sm text-blue-800">
              Hello, {session.user.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
               className="border border-blue-600 text-blue-700 hover:bg-blue-100 font-semibold px-6 py-2 rounded-lg shadow"
          >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
