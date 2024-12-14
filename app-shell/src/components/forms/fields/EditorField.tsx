import { Editor, EditorProps } from "primereact/editor";
import { classNames } from "primereact/utils";
import { ReactNode, useContext } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import { getFormErrorMessages, passNotUndefinedProps } from "../helpers";
import FieldLayout from "./FieldLayout";

interface EditorFieldProps extends EditorProps {
	labelText?: string;
	name: string;
	height?: number;
	label?: ReactNode;
	fieldSize?: FieldSize;
}

export const EditorField = (props: EditorFieldProps) => {
	const { name, labelText, height = 320 } = props;

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
						<Editor
							{...passNotUndefinedProps(inputProps)}
							type="text"
							style={{ height: height }}
							id={field.name}
							value={field.value}
							onTextChange={(e) => field.onChange(e.htmlValue)}
							autoFocus
							className={classNames("w-full", {
								"p-invalid-editor-field": fieldState.error,
								"p-invalid": fieldState.error,
							})}
						/>
					</FieldLayout>
				);
			}}
		/>
	);
};
