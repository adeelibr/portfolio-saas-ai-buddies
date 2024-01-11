import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: [
    "/chat",
    "/chat/:id*",
    "/register",
    "/dashboard",
    "/dashboard/:allPaths*",
    "/dashboard/companion/:companionId*",
    "/dashboard/companion/:companionId*/chat",
  ],
};
