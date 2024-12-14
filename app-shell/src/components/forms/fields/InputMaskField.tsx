import { InputMask, InputMaskProps } from "primereact/inputmask";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface InputMaskFieldProps extends InputMaskProps {
	labelText?: string;
	name: string;
	fieldSize?: FieldSize;
	label?: ReactNode;
}

export const InputMaskField = (props: InputMaskFieldProps) => {
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
						<InputMask
							{...passNotUndefinedProps(inputProps)}
							id={field.name}
							value={field.value}
							onChange={(e) => field.onChange(e.target.value)}
							className={classNames("w-full", {
								"p-invalid": fieldState.error,
							})}
						/>
					</FieldLayout>
				);
			}}
		/>
	);
};
