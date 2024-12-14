import { InputText, InputTextProps } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface TextFieldProps extends InputTextProps {
	labelText?: string;
	name: string;
	label?: ReactNode;
	fieldSize?: FieldSize;
}

export const TextField = (props: TextFieldProps) => {
	const { name, labelText } = props;

	const { hookForm, fieldSize } = useContext(FormContext);

	const fieldSizeActual = props.fieldSize ?? fieldSize ?? undefined;

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
						<InputText
							type="text"
							id={field.name}
							{...passNotUndefinedProps(inputProps)}
							value={field.value ?? ""}
							onChange={field.onChange}
							unstyled
							autoFocus
							className={classNames("w-full", {
								"p-invalid": fieldState.invalid,
							})}
						/>
					</FieldLayout>
				);
			}}
		/>
	);
};
