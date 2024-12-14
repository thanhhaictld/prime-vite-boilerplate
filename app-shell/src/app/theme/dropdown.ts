import { DropdownPassThroughOptions } from "primereact/dropdown";
import Tailwind from "primereact/passthrough/tailwind";
import { classNames } from "primereact/utils";

export const dropdown: DropdownPassThroughOptions = {
	...Tailwind.dropdown,
	root: ({ props }: any) => {
		return {
			className: classNames(
				"cursor-pointer inline-flex relative select-none",
				"bg-white border border-gray-300 transition-colors duration-200 ease-in-out rounded-md",
				"dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300",
				"w-full",
				"hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
				{
					"opacity-60 select-none pointer-events-none cursor-default":
						props.disabled,
				}
			),
		};
	},
	input: (options) => {
		return ({
			className: classNames(
				"cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative",
				"bg-transparent border-0 text-gray-600",
				"dark:text-white/80",
				"p-2 transition duration-200 bg-transparent rounded appearance-none font-sans text-base",
				"focus:outline-none focus:shadow-none",
				{ "pr-7": options?.props.showClear }
			),
		});
	},
};
