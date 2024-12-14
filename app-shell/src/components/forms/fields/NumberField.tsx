import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface NumberFieldProps extends InputNumberProps {
	labelText?: string;
	name: string;
	label?: ReactNode;
	fieldSize?: FieldSize;
}

export const NumberField = (props: NumberFieldProps) => {
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
						<InputNumber
							{...passNotUndefinedProps(inputProps)}
							id={field.name}
							inputRef={field.ref}
							value={field.value}
							onBlur={field.onBlur}
							onValueChange={(e) => field.onChange(e)}
							className="w-full"
							inputClassName={classNames("w-full", {
								"p-invalid": fieldState.error,
							})}
						/>
					</FieldLayout>
				);
			}}
		/>
	);
};
