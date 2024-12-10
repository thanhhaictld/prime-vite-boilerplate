/* eslint-disable @next/next/no-img-element */

import { AppTopbarRef } from "@app/types";
import { classNames } from "primereact/utils";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { LayoutContext } from "./context/layoutcontext";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
	const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
	const menubuttonRef = useRef(null);
	const topbarmenuRef = useRef(null);
	const topbarmenubuttonRef = useRef(null);

	useImperativeHandle(ref, () => ({
		menubutton: menubuttonRef.current,
		topbarmenu: topbarmenuRef.current,
		topbarmenubutton: topbarmenubuttonRef.current,
	}));

	return (
		<div
			className={classNames("layout-topbar bg-slate-50", {
				"layout-topbar-toggled": layoutState.staticMenuDesktopInactive,
				"layout-topbar-mobile": layoutState.isMobile,
			})}
		>
			<button
				ref={menubuttonRef}
				type="button"
				className="p-link layout-menu-button layout-topbar-button"
				onClick={onMenuToggle}
			>
				<i className="pi pi-bars" />
			</button>

			<button
				ref={topbarmenubuttonRef}
				type="button"
				className="p-link layout-topbar-menu-button layout-topbar-button"
				onClick={showProfileSidebar}
			>
				<i className="pi pi-ellipsis-v" />
			</button>

			<div
				ref={topbarmenuRef}
				className={classNames("layout-topbar-menu", {
					"layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
				})}
			>
				<button type="button" className="p-link layout-topbar-button">
					<i className="pi pi-calendar"></i>
					<span>Calendar</span>
				</button>
				<button type="button" className="p-link layout-topbar-button">
					<i className="pi pi-user"></i>
					<span>Profile</span>
				</button>
				<a href="/documentation">
					<button type="button" className="p-link layout-topbar-button">
						<i className="pi pi-cog"></i>
						<span>Settings</span>
					</button>
				</a>
			</div>
		</div>
	);
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
