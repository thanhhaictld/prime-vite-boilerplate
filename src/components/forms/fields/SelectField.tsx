import { Dropdown, DropdownProps } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface SelectFieldProps extends DropdownProps {
    labelText?: string
    name: string;
    label?: ReactNode;
    fieldSize?: FieldSize
}

export const SelectField = (props: SelectFieldProps) => {
    const {
        name,
        labelText,
    } = props;

    
    const {
        hookForm,
        fieldSize
    } = useContext(FormContext)

    const fieldSizeActual = props.fieldSize ?? fieldSize ??  "md";
    const inputProps = {
		...props,
		value: undefined,
		label: undefined,
		labelText: undefined,
		fieldSize: undefined,
	};

    return (
        <Controller name={name}
            control={hookForm?.control}
            render={({ field, fieldState }) => {
                return (
                    <FieldLayout
						labelText={labelText}
						error={fieldState.error}
						name={name}
						fieldSize={fieldSizeActual}
					>
                        <Dropdown
							{...passNotUndefinedProps(inputProps)}
                            name={field.name}
                            optionLabel={props.optionLabel ?? "label"}
                            optionValue={props.optionValue ?? "value"}
                            value={field.value}
                            focusInputRef={field.ref}
                            onChange={(e) => field.onChange(e.value)}
                            className={classNames("w-full", {
                                'p-invalid': fieldState.error
                            })}
                        />
					</FieldLayout>
                )
            }}
        />

    );
} 