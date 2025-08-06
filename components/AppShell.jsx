"use client";

import ConvexClientProvider from "@/provider/ConvexClientProvider";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import LoadingLogo from "@/components/shared/LoadingLogo";

export default function AppShell({ children }) {
  return (
    <ConvexClientProvider>
      <AuthLoading>
        <div className="flex justify-center">
          <LoadingLogo />
        </div>
      </AuthLoading>

      <Authenticated>
        {children}
      </Authenticated>

      <Unauthenticated>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center space-y-4">
          <h2 className="text-xl font-semibold">Please sign in to continue</h2>
          <SignInButton>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </ConvexClientProvider>
  );
}
