import { useContext } from "react";
import AppMenu from "./AppMenu";
import { MenuContext } from "./context/menucontext";

type AppSidebarProps = {
	currentPath: string;
};

const AppSidebar: React.FC<AppSidebarProps> = ({ currentPath }) => {
	//can filter authorization here or get config from rest api
	const { menuItems: configMenus } = useContext(MenuContext);

	return <AppMenu currentPath={currentPath} configMenus={configMenus} />;
};

export default AppSidebar;
