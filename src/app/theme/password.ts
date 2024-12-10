import Tailwind from "primereact/passthrough/tailwind";
import { PasswordPassThroughOptions } from "primereact/password";
import { classNames } from "primereact/utils";

export const password: PasswordPassThroughOptions = {
	...Tailwind.password,
	iconField: {
		root: () => ({
			className: classNames("w-full"),
		}),
	},
};
