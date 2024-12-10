import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

interface TextAreaFieldProps extends InputTextareaProps {
    labelText?: string
    name: string;
    label?: ReactNode;
    fieldSize?: FieldSize
}

export const TextAreaField = (props: TextAreaFieldProps) => {
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
                        <InputTextarea 
                            id={field.name}
							{...passNotUndefinedProps(inputProps)}
                            rows={4} 
                            cols={30}
                            autoFocus
                            className={classNames('w-full', {
                                'p-invalid': fieldState.error
                            })}
                        />
					</FieldLayout>
                )
            }}
        />

    );
} 