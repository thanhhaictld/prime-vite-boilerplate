import { MultiSelectPassThroughOptions } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { TRANSITIONS } from "./transition";
import Tailwind from "primereact/passthrough/tailwind";

export const multiselect: MultiSelectPassThroughOptions = {
    ...Tailwind.multiselect,
	root: ({ props }: any) => ({
		className: classNames(
			"inline-flex cursor-pointer select-none",
			"bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 ease-in-out rounded-md",
			"w-full",
			{
				"opacity-60 select-none pointer-events-none cursor-default":
					props?.disabled,
			}
		),
	}),
    label: ({ props }: any) => ({
        className: classNames(
			'font-sans',
			'block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis', 'text-gray-600 dark:text-white/80', 'p-2 transition duration-200', {
            '!p-2': props.display !== 'chip' && (props.value == null || props.value == undefined),
            '!py-1.5 px-3': props.display === 'chip' && props.value !== null
        })
    }),
	//@ts-ignore
	checkbox: ({ context }: any) => ({
		...Tailwind.checkbox
	}),
	headerCheckbox: Tailwind.checkbox,
	transition: TRANSITIONS.overlay,
};
