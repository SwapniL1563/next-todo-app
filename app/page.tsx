"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-100 text-blue-900 px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-700">Welcome to TodoApp</h1>
        <p className="text-lg text-blue-800">
          Organize your tasks efficiently. Sign up to get started or sign in if you already have an account.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => router.push("/signin")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="border border-blue-600 text-blue-700 hover:bg-blue-100 font-semibold px-6 py-2 rounded-lg shadow"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}

