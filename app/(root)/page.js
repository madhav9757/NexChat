"use client";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome back 👋</h1>
          <UserButton />
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          You are signed in and ready to chat.
        </p>
      </div>
    </main>
  );
}
