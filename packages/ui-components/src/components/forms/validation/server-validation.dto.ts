export type ValidationServerError = Array<ErrorItem>;
export type ErrorItem = {
	property: string;
	children?: Array<ErrorItem>;
	constraints?: Record<string, string>;
};
