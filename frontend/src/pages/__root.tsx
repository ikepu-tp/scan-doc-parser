import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "../../libs/TanStackRouterDevtools";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
