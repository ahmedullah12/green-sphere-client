import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register"];

// Routes that are accessible to all authenticated users regardless of role
const COMMON_ROUTES = ["/", "/profile", "/news-feed"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  USER: [/^\/user-dashboard/],
  ADMIN: [/^\/admin-dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public assets and API routes to pass through
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Check if the route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  try {
    const user = await getCurrentUser();

    // If no user and trying to access public route, allow
    if (!user && isPublicRoute) {
      return NextResponse.next();
    }

    // If no user and trying to access protected route, redirect to login
    if (!user) {
      const loginUrl = new URL(
        `/login?redirect=${encodeURIComponent(pathname)}`,
        request.url
      );
      return NextResponse.redirect(loginUrl);
    }

    // If user exists but tries to access login/register, redirect to home
    if (user && isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow access to common routes for all authenticated users
    if (COMMON_ROUTES.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // Check role-based access for specific routes
    if (user?.role && roleBasedRoutes[user.role as Role]) {
      const allowedRoutes = roleBasedRoutes[user.role as Role];
      const hasAccess = allowedRoutes.some((route) => pathname.match(route));

      if (hasAccess) {
        return NextResponse.next();
      }
    }

    // If the route doesn't match any conditions above, redirect to home
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error checking auth status, redirect to login
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico).*)",
  ],
};