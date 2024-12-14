import Tailwind from "primereact/passthrough/tailwind";
import { PickListPassThroughOptions } from "primereact/picklist";
import { classNames } from "primereact/utils";

/**
 * picklist will disable layout vertical mode -> it suitable for use other component like multi select then this one
 */
export const picklist: PickListPassThroughOptions = {
	...Tailwind.picklist,
	root: {
		className: 'flex flex-row'
	},
	buttons: {
		className: 'flex flex-col justify-center p-2'
	},
	filter: {
		className: classNames("relative p-3 border border-gray-300"),
	},
	filterInput: {
		className: classNames(
			"w-full m-0 font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 border transition-colors duration-200 appearance-none rounded-lg focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] hover:border-blue-500 border-gray-300 dark:border-blue-900/40 p-3 text-base p-filled",
			"pl-6"
		),
	},
	filterIcon: {
		className: "absolute right-6 top-8",
	},
	moveToTargetButton: {
		root: {
			className: classNames(
				"relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0", // button component
				"text-white bg-blue-500 border border-blue-500 rounded-md",
				"transition duration-200 ease-in-out",
				"justify-center px-0 py-3", // icon only
				"mr-2 xl:mb-2", // orderlist button
				"dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900" //Dark Mode
			),
		},
		//@ts-ignore
		label: "flex-initial w-0",
	},
	moveAllToTargetButton: {
		root: {
			className: classNames(
				"relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0", // button component
				"text-white bg-blue-500 border border-blue-500 rounded-md",
				"transition duration-200 ease-in-out",
				"justify-center px-0 py-3", // icon only
				"mr-2 xl:mb-2", // orderlist button
				"dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900" //Dark Mode
			),
		},
		//@ts-ignore
		label: "flex-initial w-0",
	},
};
