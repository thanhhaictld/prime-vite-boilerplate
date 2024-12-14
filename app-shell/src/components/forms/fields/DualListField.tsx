import { groupBy } from "@utils/linq";
import { PickList, PickListProps } from "primereact/picklist";
import { classNames } from "primereact/utils";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FieldSize, FormContext } from "../form";
import FieldLayout from "./FieldLayout";
import { passNotUndefinedProps } from "../helpers";

type OptionItem = { label: string; value: string | number };

interface DualListFieldProps extends PickListProps {
	labelText?: string;
	name: string;
	label?: ReactNode;
	listItems?: OptionItem[];
	fieldSize?: FieldSize;
}

export const DualListField = (props: DualListFieldProps) => {
	const { name, labelText, listItems } = props;

	const { hookForm, fieldSize } = useContext(FormContext);

	const fieldSizeActual = props.fieldSize ?? fieldSize ?? "md";

	const inputProps = {
		...props,
		value: undefined,
		label: undefined,
		labelText: undefined,
		fieldSize: undefined,
		listItems: undefined,
	};

	const renderItemTemplate = (item: any) => {
		return (
			<div key={item[props.dataKey]} className="flex flex-wrap p-1 align-center gap-3">
				<div className="flex-1 flex flex-column gap-1">
					<span className="font-bold">{item.label}</span>
				</div>
			</div>
		);
	};

	return (
		<Controller
			name={name}
			control={hookForm?.control}
			render={({ field, fieldState }) => {
				const [source, setSource] = useState<any[]>([]);
				const [_, setTarget] = useState<any[]>([]);

				useEffect(() => {
					const targetMapReduce = groupBy(
						(field.value as unknown as OptionItem[]) ?? [],
						(item) => item.value
					);
					const sourceItems = listItems?.filter(
						(x) => !targetMapReduce[x.value]
					);
					setSource(sourceItems ?? []);
				}, [props.listItems, field.value]);
				return (
					<FieldLayout
						labelText={labelText}
						error={fieldState.error}
						name={name}
						fieldSize={fieldSizeActual}
					>
						<div className={classNames("w-full")}>
							<PickList
								source={source}
								target={field.value ?? []}
								{...passNotUndefinedProps(inputProps)}
								sourceHeader="Chưa chọn"
								targetHeader="Đã chọn"
								itemTemplate={renderItemTemplate}
								showSourceControls={props.showSourceControls ?? false}
								showTargetControls={props.showTargetControls ?? false}
								onChange={(event) => {
									hookForm?.setValue(field.name, event.target);
									setSource(event.source);
									setTarget(event.target);
								}}
							/>
						</div>
					</FieldLayout>
				);
			}}
		/>
	);
};
