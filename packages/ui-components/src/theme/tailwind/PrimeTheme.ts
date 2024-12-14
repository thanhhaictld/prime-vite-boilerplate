import { PrimeReactPTOptions } from "primereact/api";
import DefaultTailwind from "primereact/passthrough/tailwind";
import { multiselect } from "./multiselect";
import { dropdown } from "./dropdown";
import { password } from "./password";
import { picklist } from "./picklist";
import { inputtext } from "./inputtext";
import { calendar } from "./calendar";
import { button } from "./button";
import { datatablePt } from "./table";

export const PrimeTheme: PrimeReactPTOptions = {
	...DefaultTailwind,
	datatable: datatablePt,
	inputtext: inputtext,
	password: password,
	dropdown: dropdown,
	multiselect: multiselect,
	picklist: picklist,
	calendar: calendar,
	button: button,
};
