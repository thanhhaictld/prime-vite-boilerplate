import { AppShellLayout } from "@components/layout/AppShell";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router";

export const ROUTE_MAP = {
	Root: "/",
	HomePage: "/home",
	Dashboard: "/dashboard",
	Settings: {
		Root: "/settings",
		User: "user",
	},
	Features: {
		Root: "/features",
		Form: "form",
	},
};

const router = createBrowserRouter([
	{
	  path: "/",
	  element: (
		<AppShellLayout>
			<Outlet />
		</AppShellLayout>
	  ),
	  children: [
		{
			index: true,
			element: <Navigate to={ROUTE_MAP.Dashboard} />
		},
		{
			path: ROUTE_MAP.Dashboard,
			element: <div>Dashboard</div>
		},
		{
			path: `${ROUTE_MAP.Settings.Root}`,
			element: <Outlet />,
			children: [
				{
					path: ROUTE_MAP.Settings.User,
					element: <div>User Manager</div>
				}
			]
		},
		{
			path: `${ROUTE_MAP.Features.Root}`,
			element: <Outlet />,
			children: [
			]
		},
		{
			path: "*",
			element: "Not found"
		}
	  ]
	},
	{
	  path: "about",
	  element: <div>About</div>,
	},
  ]);

export const AppRouter: React.FC = () => {
	return (
		<RouterProvider router={router} />
	);
};
