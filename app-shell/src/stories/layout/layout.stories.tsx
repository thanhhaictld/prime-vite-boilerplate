import { LayoutProvider, MenuProvider } from "@components/layout";
import DashboardLayout from "@components/layout/DashboardLayout";
import { Meta, StoryObj } from "@storybook/react";
import { useMemo } from "react";

const meta: Meta = {
	title: "UI Kit / Layout",
	tags: ["autodocs"],
	excludeStories: /.*Data$/,
	args: {},
};

export default meta;

export const AppShell: StoryObj<any> = {
    render: () => {
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
            ];
        }, []);
        
        return (
            <LayoutProvider>
                <MenuProvider menuItems={menuItems}>
                    <DashboardLayout currentPath={"/user"}>
                        <div>Body App</div>
                    </DashboardLayout>
                </MenuProvider>
            </LayoutProvider>
        );
    }
}  
