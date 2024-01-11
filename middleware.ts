import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:allPaths*",
    "/dashboard/companion/:companionId*",
    "/dashboard/companion/:companionId*/chat",
  ],
};
