import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

enum JustifyItem {
	CENTER,
	START,
	END,
}

type ActionType = "submit" | "reset" | "button";

type ActionItem = {
	text?: string;
	type?: ActionType;
	onClick?: (type?: ActionType) => void;
	icon?: string | React.ReactElement;
	ui:
		| "secondary"
		| "success"
		| "info"
		| "warning"
		| "danger"
		| "help"
		| undefined;
};

export type FormToolbarProps = React.PropsWithChildren & {
	direction?: JustifyItem;
	size?: "full" | "ahalf";
	spacing: ToolbarSpacing;
	actions: ActionItem[];
};

export enum ToolbarSpacing {
	xs = 1,
	sm = 2,
	md = 3,
	lg = 4,
	xlg = 6,
}

export const FormToolbar: React.FC<FormToolbarProps> = ({
	size = "full",
	direction = JustifyItem.CENTER,
	spacing = ToolbarSpacing.md,
	actions = [],
	children,
}) => {
	return (
		<div
			className={classNames(
				{
					["flex"]: size == "full",
					["justify-start"]: direction == JustifyItem.START,
					["justify-center"]: direction == JustifyItem.CENTER,
					["justify-end"]: direction == JustifyItem.END,
				},
				`gap-${spacing}`
			)}
		>
			{actions.map((action, key) => (
				<Button
					//@ts-ignore
					type={action.type}
					key={key}
					onClick={action.onClick?.bind(this, action.type)}
					severity={action.ui}
				>
					{action.text}
				</Button>
			))}
			{children}
		</div>
	);
};
