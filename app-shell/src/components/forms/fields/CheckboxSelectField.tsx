import { Checkbox } from "primereact/checkbox";
import { RadioButtonProps } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface CheckboxSelectFieldProps extends RadioButtonProps {
	labelText?: string;
	name: string;
	label?: ReactNode;
	listButtons?: { label: string; value: string | number | boolean }[];
	fieldSize?: FieldSize;
}

export const CheckboxSelectField = (props: CheckboxSelectFieldProps) => {
	const { name, labelText, listButtons } = props;
	const inputProps = {
		...props,
		label: undefined,
		labelText: undefined,
		fieldSize: undefined,
		listButtons: undefined,
	};
	const { hookForm, fieldSize } = useContext(FormContext);

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
						fieldSize={props.fieldSize ?? fieldSize ?? "md"}
					>
						<div
							className={classNames("flex justify-start py-2 pr-2", {
								"p-invalid-radio-field": fieldState.error,
							})}
						>
							<div className="flex flex-column gap-x-4">
								{listButtons?.map((button) => {
									return (
										<div key={button.label} className="flex align-items-center">
											<Checkbox
												{...passNotUndefinedProps(inputProps)}
												inputId={field.name + button.value}
												onChange={(checked) => field.onChange(checked ? button.value : null)}
												inputRef={field.ref}
												checked={field.value == button.value}
											/>
											<label
												htmlFor={button.value as unknown as string}
												className="ml-2"
											>
												{button.label}
											</label>
										</div>
									);
								})}
							</div>
						</div>
					</FieldLayout>
				);
			}}
		/>
	);
};
