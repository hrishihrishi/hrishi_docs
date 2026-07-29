"use client";

import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { FullscreenLoader } from "./fullscreen-loader";

// Singleton Convex client — instantiated once outside the component tree
// so it's not recreated on every render.
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Wires up Clerk auth with the Convex real-time client.
 * Shows a sign-in modal for unauthenticated users and a fullscreen spinner
 * while Clerk is resolving the session, so children never render without a valid identity.
 * 
 * How does ConvexProviderWithClerk works:
 * @param useAuth={useAuth}: Passes Clerk's authentication hook so Convex can automatically extract and send the current user's JWT token with every database request.
 * @param client={convex}: Connects to your Convex backend instance.
 */
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk 
        useAuth={useAuth} 
        client={convex}
      >
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* hash routing avoids a full page reload when the sign-in modal closes */}
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
         <FullscreenLoader label="Auth loading..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
};
