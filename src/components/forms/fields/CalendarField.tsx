import _ from "lodash";
import { Calendar, CalendarProps } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

type CalendarFieldProps = CalendarProps & {
	labelText?: string;
	name: string;
	label?: ReactNode;
	fieldSize?: FieldSize;
};

export const CalendarField = (props: CalendarFieldProps) => {
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
				let valueField: Date | null = null;
				if (_.isEmpty(field.value)) {
					valueField = null;
				}
				if (_.isDate(field.value)) {
					valueField = field.value;
				} else if (_.isString(field.value)) {
					valueField = new Date(field.value);
				}

				return (
					<FieldLayout
						labelText={labelText}
						error={fieldState.error}
						name={name}
						fieldSize={fieldSizeActual}
					>
						<Calendar
							{...passNotUndefinedProps(inputProps)}
							inputId={field.name}
							value={valueField as any}
							onChange={field.onChange}
							dateFormat={props.dateFormat}
							className={classNames("w-full", {
								"p-invalid": fieldState.error,
							})}
							inputClassName={classNames("w-full", {})}
						/>
					</FieldLayout>
				);
			}}
		/>
	);
};
