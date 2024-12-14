import { yupResolver } from "@hookform/resolvers/yup";
import { classNames } from "primereact/utils";
import React from "react";
import {
	DefaultValues,
	FieldValues,
	SubmitHandler,
	UseFormReturn,
	useForm
} from "react-hook-form";
import * as Yup from 'yup';
import "./style/form.scss";

export type FieldSize = "small" | "medium" | "lg" | "xlg" | "number";

interface FormContextType<TFormValue extends TBaseFormValues> {
	fieldSize: FieldSize;
	hookForm: UseFormReturn<TFormValue> | undefined;
}

export const FormContext = React.createContext<FormContextType<any>>({
	fieldSize: "medium",
	hookForm: undefined,
});

export type ErrorMessage = {
	type: string;
	message: string;
};

export type TBaseFormValues = Record<string, any>;

export interface RHFormProps<TFormValue extends TBaseFormValues>
	extends React.PropsWithChildren {
	fieldSize?: FieldSize;
	onSubmit: SubmitHandler<any>;
	defaultValue?: TFormValue;
	className?: string;
	style?: React.CSSProperties;
	hookForm?: UseFormReturn<FieldValues, TFormValue> | undefined;
	schema?: Yup.Schema<TFormValue>;
	errors?: any; // error will pass to form and the effect will track and bind it into hook form
}

export function RHForm<TFormValue extends TBaseFormValues>({
	fieldSize = "number",
	className,
	defaultValue,
	children,
	hookForm,
	style,
	schema,
	onSubmit = (_: TFormValue) => {
		alert("not implemented!");
	},
}: RHFormProps<TFormValue>) {
	const hookFormContext =
		hookForm ??
		useForm<TFormValue>({
			defaultValues: defaultValue as DefaultValues<TFormValue>,
			//@ts-ignore
			resolver: schema && yupResolver(schema)
		});
	const { handleSubmit } = hookFormContext;

	return (
		<FormContext.Provider
			value={{
				hookForm: hookFormContext,
				fieldSize,
			}}
		>
			<form
				style={style}
				className={classNames("flex flex-col gap-y-5", className)}
				onSubmit={handleSubmit(onSubmit)}
			>
				{children}
			</form>
		</FormContext.Provider>
	);
}
