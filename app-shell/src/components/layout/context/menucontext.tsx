import { AppMenuItem } from "@app/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface MenuContextProps {
	menuItems: AppMenuItem[];
}

export interface MenuContextData {
	activeMenu: string;
	setActiveMenu: Dispatch<SetStateAction<string>>;
	menuItems: AppMenuItem[];
}

export const MenuContext = createContext<MenuContextData>({
	menuItems: [],
	activeMenu: "",
	setActiveMenu: () => {},
});

export const MenuProvider: React.FC<
	MenuContextProps & React.PropsWithChildren
> = ({ children, menuItems }) => {
	const [activeMenu, setActiveMenu] = useState("");
	return (
		<MenuContext.Provider
			value={{
				activeMenu,
				setActiveMenu,
				menuItems,
			}}
		>
			{children}
		</MenuContext.Provider>
	);
};
