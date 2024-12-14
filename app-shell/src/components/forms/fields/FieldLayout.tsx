import React from "react";
import { FieldError } from "react-hook-form";
import { getFormErrorMessages } from "../helpers";
import { classNames } from "primereact/utils";
import { FieldSize } from "../form";

export type BaseFieldProps = React.PropsWithChildren & {
	labelText?: string;
	name: string;
	error?: FieldError;
	fieldSize: FieldSize;
};

const FieldLayout: React.FC<BaseFieldProps> = ({
	labelText,
	name,
	error,
	children,
	fieldSize,
}) => {
	return (
		<div className="flex flex-col">
			<label
				className="block mb-2 font-medium text-gray-900 dark:text-white"
				htmlFor={name}
			>
				<span
					className={classNames("block", {
						"text-xs": fieldSize == "small",
						"text-sm": fieldSize == "medium",
						"text-base": fieldSize == "lg",
					})}
				>
					{labelText}
				</span>
			</label>
			<div className="flex flex-col">
				{children}
				<p className="text-red-500 text-sm">
					{getFormErrorMessages(error?.message ?? "")}
				</p>
			</div>
		</div>
	);
};

export default FieldLayout;
