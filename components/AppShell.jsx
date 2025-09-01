"use client";

import ConvexClientProvider from "@/provider/ConvexClientProvider";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import LoadingLogo from "@/components/shared/LoadingLogo";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AppShell({ children }) {
  return (
    <ConvexClientProvider>
      {/* Loading State */}
      <AuthLoading>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingLogo />
        </div>
      </AuthLoading>

      {/* Authenticated State */}
      <Authenticated>{children}</Authenticated>

      {/* Unauthenticated State */}
      <Unauthenticated>
        <main className="flex items-center justify-center min-h-screen px-4">
          <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                Please sign in to continue
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
              <SignInButton>
                <Button className="w-full sm:w-auto">Sign In</Button>
              </SignInButton>

              <SignUpButton>
                <Button variant="outline" className="w-full sm:w-auto">
                  Sign Up
                </Button>
              </SignUpButton>
            </CardContent>
          </Card>
        </main>
      </Unauthenticated>
    </ConvexClientProvider>
  );
}
