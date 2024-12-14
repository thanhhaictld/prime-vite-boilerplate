import { useLocation } from "react-router";
import { LayoutProvider } from "./context/layoutcontext";
import DashboardLayout from "./DashboardLayout";
import { MenuProvider } from "./context/menucontext";
import { useMemo } from "react";

export type AppShellLayoutProps = {} & React.PropsWithChildren;

export function AppShellLayout(props: AppShellLayoutProps) {
	const location = useLocation();
	const menuItems = useMemo(() => {
		return [
			{
				label: "Home",
				items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
			},
			{
				label: "Features",
				items: [
					{ label: "Form", icon: "pi pi-fw pi-home", to: "/features/form" },
				],
			},
			{
				label: "Settings",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "Users", icon: "pi pi-fw pi-user", to: "/user" },
					{ label: "Roles", icon: "pi pi-fw pi-users", to: "/role" },
				],
			},
			{
				label: "My Preferences",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "My info", icon: "pi pi-fw pi-user", to: "/my-preferences" },
				],
			},
			{
				label: "Settings",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "Users", icon: "pi pi-fw pi-user", to: "/user" },
					{ label: "Roles", icon: "pi pi-fw pi-users", to: "/role" },
				],
			},
			{
				label: "My Preferences",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "My info", icon: "pi pi-fw pi-user", to: "/my-preferences" },
				],
			},
			{
				label: "Settings",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "Users", icon: "pi pi-fw pi-user", to: "/user" },
					{ label: "Roles", icon: "pi pi-fw pi-users", to: "/role" },
				],
			},
			{
				label: "My Preferences",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "My info", icon: "pi pi-fw pi-user", to: "/my-preferences" },
				],
			},
			{
				label: "Settings",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "Users", icon: "pi pi-fw pi-user", to: "/user" },
					{ label: "Roles", icon: "pi pi-fw pi-users", to: "/role" },
				],
			},
			{
				label: "My Preferences",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "My info", icon: "pi pi-fw pi-user", to: "/my-preferences" },
				],
			},
			{
				label: "Settings",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "Users", icon: "pi pi-fw pi-user", to: "/user" },
					{ label: "Roles", icon: "pi pi-fw pi-users", to: "/role" },
				],
			},
			{
				label: "My Preferences",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "My info", icon: "pi pi-fw pi-user", to: "/my-preferences" },
				],
			},
			{
				label: "Settings",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "Users", icon: "pi pi-fw pi-user", to: "/user" },
					{ label: "Roles", icon: "pi pi-fw pi-users", to: "/role" },
				],
			},
			{
				label: "My Preferences",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "My info", icon: "pi pi-fw pi-user", to: "/my-preferences" },
				],
			},
			{
				label: "Settings",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "Users", icon: "pi pi-fw pi-user", to: "/user" },
					{ label: "Roles", icon: "pi pi-fw pi-users", to: "/role" },
				],
			},
			{
				label: "My Preferences",
				icon: "pi pi-fw pi-cog",
				items: [
					{ label: "My info", icon: "pi pi-fw pi-user", to: "/my-preferences" },
				],
			},
		];
	}, []);

	return (
		<LayoutProvider>
			<MenuProvider menuItems={menuItems}>
				<DashboardLayout currentPath={location.pathname}>
					{props.children}
				</DashboardLayout>
			</MenuProvider>
		</LayoutProvider>
	);
}
