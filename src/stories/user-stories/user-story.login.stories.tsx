import {
	bindApiErrorToRHF,
	FormToolbar,
	PasswordField,
	RHForm,
	TextField,
	yup,
} from "@components/forms";
import { ToolbarSpacing } from "@components/forms/form.toolbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Schema } from "yup";

export default {
	title: "User Stories",
	args: {},
};

export const UserLogin = {
	render: () => {
		interface FormValueType {
			email: string;
			password: string;
		}

		const schema: Schema<FormValueType> = yup.object().shape({
			email: yup.string().required("Email is required").email("Email invalid"),
			password: yup.string().required("Your password is required"),
		});

		const defaultValue = {
			email: "",
			password: "PasswordFieldValue",
		};

		const LoginForm = () => {
			// const [error, setError] = useState<ValidationServerError>([]);
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
				console.log("on submit form");
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
		};
		return <LoginForm />;
	},
};
