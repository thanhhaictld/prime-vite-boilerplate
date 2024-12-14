import {
    bindApiErrorToRHF,
	CalendarField,
	CheckboxField,
	CheckboxSelectField,
	DualListField,
	EditorField,
	FormToolbar,
	InputMaskField,
	MultiSelectField,
	NumberField,
	PasswordField,
	RadioButtonField,
	RHForm,
	SelectField,
	TextAreaField,
	TextField,
	ToolbarSpacing,
	ValidationServerError,
	yup,
} from "@components/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Schema } from "yup";

export default {
	title: "UI Kit / Forms",
	excludeStories: /.*Data$/,
	tags: ['autodocs'],
	args: {},
};

/**
 * List all support field  which we have
 */
export const FormWithAllField = {
	render: () => {
		const cities = [
			{ name: "New York", code: "NY" },
			{ name: "Rome", code: "RM" },
			{ name: "London", code: "LDN" },
			{ name: "Istanbul", code: "IST" },
			{ name: "Paris", code: "PRS" },
		];

        const juiceOptions = [
            { value: "Kiwi", label: "Kiwi" },
            { value: "Mango", label: "Mango" },
            { value: "Lemon", label: "Lemon" },
        ];

		const mockServerValidationError = (): ValidationServerError => [
			{
				property: "TextField",
				constraints: {
					"required!": "TextField is required",
				},
			},
			{
				property: "InputMaskField",
				constraints: {
					"required!": "InputMaskField is required",
				},
			},
			{
				property: "PasswordField",
				constraints: {
					"required!": "PasswordField is required",
				},
			},
			{
				property: "CheckboxField",
				constraints: {
					"required!": "CheckboxField is required",
				},
			},
			{
				property: "NumberField",
				constraints: {
					"required!": "NumberField is required",
				},
			},
			{
				property: "TextAreaField",
				constraints: {
					"required!": "TextAreaField is required",
				},
			},
			{
				property: "SelectField",
				constraints: {
					"required!": "SelectField is required",
				},
			},
			{
				property: "CalendarField",
				constraints: {
					"required!": "CalendarField is required",
				},
			},
			{
				property: "RadioButtonField",
				constraints: {
					"required!": "RadioButtonField is required",
				},
			},
			{
				property: "CheckboxSelectField",
				constraints: {
					"required!": "CheckboxSelectField is required",
				},
			},
			{
				property: "MultiSelectField",
				constraints: {
					"required!": "MultiSelectField is required",
				},
			},
			{
				property: "DualListField",
				constraints: {
					"required!": "DualListField is required",
				},
			},
			{
				property: "EditorField",
				constraints: {
					"required!": "EditorField is required",
				},
			},
		];

		interface FormValueType {
			TextField?: string;
			PasswordField?: string;
			DualListField: string[];
			CalendarField?: Date;
			InputMaskField?: string;
		}

		const schema: Schema<FormValueType> = yup.object().shape({
			TextField: yup
				.string()
				//@ts-ignore
				.required("Required"),
			PasswordField: yup.string().required("Required"),
			DualListField: yup.array().of(yup.string().required()).required(),
			CalendarField: yup.date(),
			InputMaskField: yup.string(),
		});

		const defaultValue = {
			TextField: "TextFieldValue",
			PasswordField: "PasswordFieldValue",
			DualListField: ["Mango"],
			CalendarField: new Date("2023/01/01"),
			InputMaskField: "12-20-1970",
		};

		const AllFieldForm = () => {
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

			const onSubmitForm = async (_: any) => {
				bindApiErrorToRHF(mockServerValidationError(), setError);
			};

			return (
				<div className="grid">
					<div className="col-12 xlg:col-6">
						<div className="card">
							<RHForm<FormValueType>
								hookForm={hookForm}
								className="p-fluid w-full"
								onSubmit={onSubmitForm}
							>
								<TextField
									labelText="TextField"
									name="TextField"
									placeholder="TextField PlaceHolder"
								/>
								<InputMaskField
									labelText="InputMaskField"
									name="InputMaskField"
									mask="00-00-0000"
									placeholder="InputMaskField PlaceHolder"
								/>
								<PasswordField
									labelText="PasswordField"
									name="PasswordField"
									toggleMask
									placeholder="PasswordField PlaceHolder"
								/>
								<CheckboxField
									labelText="CheckboxField"
									name="CheckboxField"
									placeholder="CheckboxField PlaceHolder"
								/>
								<NumberField
									labelText="NumberField"
									name="NumberField"
									placeholder="NumberField PlaceHolder"
								/>
								<TextAreaField
									labelText="TextAreaField"
									name="TextAreaField"
									placeholder="TextAreaField PlaceHolder"
								/>
								<SelectField
									labelText="SelectField"
									name="SelectField"
									optionLabel="name"
									optionValue="code"
									options={cities}
									placeholder="SelectField PlaceHolder"
								/>
								<MultiSelectField
									labelText="MultiSelectField"
									name="MultiSelectField"
									optionLabel="name"
									optionValue="code"
									options={cities}
									placeholder="MultiSelectField PlaceHolder"
								/>
								<CalendarField
									labelText="CalendarField"
									name="CalendarField"
									placeholder="CalendarField PlaceHolder"
								/>
								<CheckboxSelectField
									labelText="CheckboxSelectField"
									name="CheckboxSelectField"
									placeholder="CheckboxSelectField PlaceHolder"
									listButtons={juiceOptions}
								/>
								<RadioButtonField
									labelText="RadioButtonField"
									name="RadioButtonField"
									placeholder="RadioButtonField PlaceHolder"
									listButtons={juiceOptions}
								/>
								<DualListField
									labelText="DualListField"
									name="DualListField"
									listItems={juiceOptions}
                                    breakpoint={'400px'}
									dataKey={"value"}
								/>
								<EditorField labelText="EditorField" name="EditorField" />
								<FormToolbar
									spacing={ToolbarSpacing.md}
									actions={[
										{
											ui: "info",
											type: "submit",
											text: "Submit",
										},
										{
											onClick: (_) => {
												alert("implement cancel form!");
											},
											ui: "secondary",
											type: "reset",
											text: "Cancel",
										},
									]}
								></FormToolbar>
							</RHForm>
						</div>
					</div>
				</div>
			);
		};
		return <AllFieldForm />
	},
};
