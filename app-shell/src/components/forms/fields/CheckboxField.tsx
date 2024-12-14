import {
    Checkbox,
    CheckboxChangeEvent,
    CheckboxProps,
} from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface CheckboxFieldProps extends Omit<CheckboxProps, "checked"> {
	labelText?: string;
	name: string;
	label?: ReactNode;
	fieldSize?: FieldSize;
}

export const CheckboxField = (props: CheckboxFieldProps) => {
	const { name, labelText } = props;
	const { hookForm, fieldSize } = useContext(FormContext);

	const fieldSizeActual = props.fieldSize ?? fieldSize ?? "md";

	const inputProps = {
		...props,
		value: undefined,
		label: undefined,
		labelText: undefined,
		fieldSize: undefined,
	};

	return (
		<Controller
			name={name}
			control={hookForm?.control}
			render={({ field, fieldState }) => {
				return (
					<FieldLayout
						labelText={labelText}
						error={fieldState.error}
						name={name}
						fieldSize={fieldSizeActual}
					>
						<Checkbox
							{...passNotUndefinedProps(inputProps)}
							id={field.name}
							style={props.style}
							checked={field.value}
							inputRef={field.ref}
							onChange={function (e: CheckboxChangeEvent) {
								field.onChange(e.checked);
							}}
							className={classNames("w-full", {
								"p-invalid mr-1": fieldState.error,
							})}
						></Checkbox>
					</FieldLayout>
				);
			}}
		/>
	);
};
