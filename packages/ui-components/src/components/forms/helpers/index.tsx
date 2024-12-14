import _ from "lodash";

export const getFormErrorMessages = (errors: string[] | string) => {
	if (_.isNil(errors) || _.isEmpty(errors)) return null;
	return (
		<>
			{(_.isArray(errors) ? errors : [errors]).map((error, key) => (
				<span key={key}>
					{error}
					<br />
				</span>
			))}
		</>
	);
};

export const passNotUndefinedProps = <T extends object>(props: T): T => {
	return Object.fromEntries(
		Object.entries(props).filter(([_, value]) => value !== undefined)
	) as T;
};
