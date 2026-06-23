import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// ─── Route classification ─────────────────────────────────────────────────────

const publicRoutes = new Set(["/", "/recipes", "/premium"]);
const authRoutes = new Set(["/login", "/register"]);

const adminRoutes = [
  "/dashboard/manage-users",
  "/dashboard/manage-recipes",
  "/dashboard/reports",
  "/dashboard/transactions",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isPublicRoute = (p) => publicRoutes.has(p) || p.startsWith("/recipes/");
const isAuthRoute = (p) => authRoutes.has(p);
const isAdminRoute = (p) => adminRoutes.some((r) => p.startsWith(r));
const isApiRoute = (p) => p.startsWith("/api/");
const redirect = (url, req) => NextResponse.redirect(new URL(url, req.url));

// ─── Proxy ────────────────────────────────────────────────────────────────────

export const proxy = async (request) => {
  const { pathname } = request.nextUrl;

  if (isApiRoute(pathname)) return NextResponse.next();

  // Skip session fetch entirely for public/auth routes — avoids the
  // Better Auth JWT plugin throwing UNAUTHORIZED when no session cookie exists.
  if (isPublicRoute(pathname)) return NextResponse.next();

  let user = null;
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    user = session?.user ?? null;
  } catch {
    // No session cookie → treat as logged out, not an error
  }

  console.log("PROXY:", pathname, "| user:", user?.email ?? "none");

  // Blocked users — only allow login
  if (user?.role === "blocked") {
    return isAuthRoute(pathname)
      ? NextResponse.next()
      : redirect("/login", request);
  }

  // Auth pages — pass through when logged out, redirect to dashboard when logged in
  if (isAuthRoute(pathname)) {
    return user ? redirect("/dashboard", request) : NextResponse.next();
  }

  // Protected routes — require session
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/login") loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin gate
  if (isAdminRoute(pathname) && user.role !== "admin") {
    return redirect("/dashboard", request);
  }

  return NextResponse.next();
};

// ─── Matcher — stays here in Next.js 16+ ─────────────────────────────────────

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};
