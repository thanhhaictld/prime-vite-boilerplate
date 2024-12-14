import React, {
	Dispatch,
	HTMLAttributeAnchorTarget,
	MutableRefObject,
	ReactNode,
	SetStateAction,
} from "react";

/* Breadcrumb Types */
export interface AppBreadcrumbProps {
	className?: string;
}

export interface Breadcrumb {
	labels?: string[];
	to?: string;
}

export interface BreadcrumbItem {
	label: string;
	to?: string;
	items?: BreadcrumbItem[];
}

/* Context Types */
export type LayoutState = {
	staticMenuDesktopInactive: boolean;
	overlayMenuActive: boolean;
	profileSidebarVisible: boolean;
	configSidebarVisible: boolean;
	staticMenuMobileActive: boolean;
	menuHoverActive: boolean;
	isMobile: boolean;
};

export type LayoutConfig = {
	ripple: boolean;
	inputStyle: string;
	menuMode: string;
	colorScheme: string;
	theme: string;
	scale: number;
	configMenus: [],
};

export interface LayoutContextProps {
	layoutConfig: LayoutConfig;
	setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>;
	layoutState: LayoutState;
	setLayoutState: Dispatch<SetStateAction<LayoutState>>;
	onMenuToggle: () => void;
	showProfileSidebar: () => void;
}



/* AppConfig Types */
export interface AppConfigProps {
	simple?: boolean;
}

/* AppTopbar Types */
export type NodeRef = MutableRefObject<ReactNode>;
export interface AppTopbarRef {
	menubutton?: HTMLButtonElement | null;
	topbarmenu?: HTMLDivElement | null;
	topbarmenubutton?: HTMLButtonElement | null;
}

type MenuModelItem = {}

/* AppMenu Types */
type CommandProps = {
	originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
	item: MenuModelItem;
};

export interface MenuProps {
	model: MenuModel[];
}

export interface MenuModel {
	label: string;
	icon?: string;
	items?: MenuModel[];
	to?: string;
	url?: string;
	target?: HTMLAttributeAnchorTarget;
	seperator?: boolean;
}

export interface AppMenuItem extends MenuModel {
	items?: AppMenuItem[];
	badge?: "UPDATED" | "NEW";
	badgeClass?: string;
	class?: string;
	preventExact?: boolean;
	visible?: boolean;
	disabled?: boolean;
	replaceUrl?: boolean;
	command?: ({ originalEvent, item }: CommandProps) => void;
}

export interface AppMenuItemProps {
	item?: AppMenuItem;
	parentKey?: string;
	index?: number;
	root?: boolean;
	className?: string;
	currentPath: string;
}
