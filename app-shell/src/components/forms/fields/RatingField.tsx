import { Rating, RatingProps } from "primereact/rating";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";

interface RatingFieldProps extends RatingProps {
	labelText?: string;
	name: string;
	label?: ReactNode;
	inputClassName?: string;
	fieldSize?: FieldSize;
	cancel?: boolean;
}

export const RatingField = (props: RatingFieldProps) => {
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
						<Rating
							id={field.name}
                            {...inputProps}
							value={field.value}
							onChange={(e) => field.onChange(e)}
							cancel={props.cancel}
							className={classNames("w-full", props.inputClassName, {
								"p-invalid": fieldState.error,
							})}
						/>
					</FieldLayout>
				);
			}}
		/>
	);
};
