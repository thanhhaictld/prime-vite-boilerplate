import { Password, PasswordProps } from "primereact/password";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface PasswordFieldProps extends PasswordProps {
	labelText?: string;
	name: string;
	label?: ReactNode;
	fieldSize?: FieldSize;
}

export const PasswordField = (props: PasswordFieldProps) => {
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
						<Password
							{...passNotUndefinedProps(inputProps)}
							id={field.name}
							style={props.style}
							inputRef={field.ref}
							value={field.value}
							onChange={field.onChange}
							className="w-full"
							inputClassName={classNames("w-full", {
								"p-invalid mr-1": fieldState.error,
							})}
						></Password>
					</FieldLayout>
				);
			}}
		/>
	);
};
