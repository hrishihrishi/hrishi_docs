import { clerkMiddleware } from "@clerk/nextjs/server";

// Protect every matched route with Clerk session verification.
// No custom config needed — the default middleware enforces auth on all protected paths.
export default clerkMiddleware();

// Applies Clerk middleware to all user-facing pages and API routes while
// skipping Next.js internals and static assets for performance.
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
