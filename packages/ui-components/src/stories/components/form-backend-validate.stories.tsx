import {
	bindApiErrorToRHF,
	FormToolbar,
	PasswordField,
	RHForm,
	TextField,
	yup,
} from "@components/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useForm } from "react-hook-form";
import { Schema } from "yup";
import { ToolbarSpacing } from "../../components/forms/form.toolbar";


export default {
	title: "UI Kit / Forms",
	excludeStories: /.*Data$/,
	tags: ['autodocs'],
	args: {},
};


interface FormValueType {
	email: string;
	password: string;
}

const defaultValue = {
	email: "",
	password: "PasswordFieldValue",
};


type Story = StoryObj<any>;

/**
 * call async validator email existing to check
 */
export const FormWithBackendValidate: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("Enter email and password", async () => {
			await userEvent.type(
				canvas.getByRole("textbox", { name: /email/i }),
				"hi@example.com"
			);
			await userEvent.type(
				canvas.getByLabelText("password", { exact: false }),
				"hi@example.com"
			);
		});

		await step("Submit form", async () => {
			await userEvent.click(canvas.getByRole("button"));
			expect(
				canvas.getAllByText("(From API)", { exact: false })
			).toBeInTheDocument();
		});
	},
	render: () => {
		const schema: Schema<FormValueType> = yup.object().shape({
			email: yup.string().required("Email is required").email("Email invalid"),
			password: yup.string().required("Your password is required"),
		});

		const hookForm = useForm<FormValueType>({
			defaultValues: defaultValue,
			resolver: schema && yupResolver(schema),
			mode: "onChange", // leverage validation yup only onChange event,
			reValidateMode: "onChange", //when calling api and bind error will be add on submit event
		});

		const {
			setError, // Use setError to manually set errors
		} = hookForm;

		const onSubmitForm = async () => {
			bindApiErrorToRHF(
				[
					{
						property: "email",
						constraints: {
							required: "(From API) Email is required",
						},
					},
					{
						property: "password",
						constraints: {
							required:
								"(From API) Password at least greater than 5 character!",
						},
					},
				],
				setError
			);
		};

		return (
			<div className="grid">
				<div className="col-12 xlg:col-6">
					<div className="card">
						<RHForm<FormValueType>
							//@ts-ignore
							hookForm={hookForm}
							className="p-fluid w-full"
							onSubmit={onSubmitForm}
						>
							<TextField
								labelText="Email"
								name="email"
								placeholder="type your email..."
							/>
							<PasswordField
								labelText="Password"
								name="password"
								toggleMask
								placeholder="type your password"
							/>
							<FormToolbar
								spacing={ToolbarSpacing.md}
								actions={[
									{
										ui: "info",
										type: "submit",
										text: "Submit",
									},
								]}
							></FormToolbar>
						</RHForm>
					</div>
				</div>
			</div>
		);
	},
};
