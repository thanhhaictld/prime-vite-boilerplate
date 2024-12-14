import { MultiSelect, MultiSelectProps } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface MultiSelectFieldProps extends MultiSelectProps {
	labelText?: string;
	name: string;
	label?: ReactNode;
	fieldSize?: FieldSize;
}

export const MultiSelectField = (props: MultiSelectFieldProps) => {
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
						<MultiSelect
							{...passNotUndefinedProps(inputProps)}
							optionLabel={props.optionLabel ?? "label"}
							optionValue={props.optionValue ?? "value"}
							value={field.value}
							onChange={(e) => field.onChange(e.value)}
							options={props.options}
							placeholder={props.placeholder}
							maxSelectedLabels={3}
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
