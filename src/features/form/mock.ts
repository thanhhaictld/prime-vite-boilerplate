import { ValidationServerError } from "@components/forms";

export const mockCityOptions = () => (
	[
		{ name: "New York", code: "NY" },
		{ name: "Rome", code: "RM" },
		{ name: "London", code: "LDN" },
		{ name: "Istanbul", code: "IST" },
		{ name: "Paris", code: "PRS" },
	])

export const mockServerValidationError = (): ValidationServerError => [
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
] ;
