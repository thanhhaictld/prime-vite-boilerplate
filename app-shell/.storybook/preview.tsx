import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

import "../src/styles/tailwind.css";
import 'primeicons/primeicons.css';


import { PrimeReactProvider } from "primereact/api";
import React from "react";
import { PrimeTheme } from '../src/app/theme/PrimeTheme';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},

	decorators: [
		// Adds theme switching support.
		// NOTE: requires setting "darkMode" to "class" in your tailwind config
		withThemeByClassName({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
		(story) => (<PrimeReactProvider
			value={{
				unstyled: true,
				pt: PrimeTheme
			}}
		>
			{story()}
		</PrimeReactProvider>)
	],
};

export default preview;
