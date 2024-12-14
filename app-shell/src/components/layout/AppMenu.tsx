/* eslint-disable @next/next/no-img-element */

import { AppMenuItem } from "@components/layout/types/layout";
import AppMenuitem from "./AppMenuitem";

export type AppMenuProps = {
	configMenus: AppMenuItem[]
	currentPath: string;
} 

const AppMenu: React.FC<AppMenuProps> = ({configMenus, currentPath}) => {
	return (
			<ul className="layout-menu">
				{configMenus.map((item, i) => {
					return !item?.seperator ? (
						<AppMenuitem
							item={item}
							root={true}
							index={i}
							key={item.label}
							currentPath={currentPath}
						/>
					) : (
						<li className="menu-separator"></li>
					);
				})}
			</ul>
	);
};

export default AppMenu;
