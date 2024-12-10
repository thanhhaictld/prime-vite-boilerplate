import { ColumnNode, useDynamicColumns } from "@components/table";
import { StoryObj } from "@storybook/react";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Row } from "primereact/row";
import React from "react";

interface MyDataTableProps {
	data: Record<string, any>[]; // Array of row data
	columnStructure: ColumnNode[]; // Column structure
}

export default {
	title: "UI Kit/Table/With Columns Builder Hook",
	tags: ["autodocs"],
	//👇 Our exports that end in "Data" are not stories.
	excludeStories: /.*Data$/,
	args: {},
};

export const Default: StoryObj<any> = {
	render: () => {
		const MyDataTable: React.FC<MyDataTableProps> = ({
			data,
			columnStructure,
		}) => {
			const { headerRows, flatColumns } = useDynamicColumns(columnStructure);
            console.log(JSON.stringify(headerRows, null, 2));

			// Render the header group
			const renderHeaderGroup = () => (
				<ColumnGroup>
					{headerRows.map((row, rowIndex) => (
						<Row key={rowIndex}>
							{row.map((col, colIndex) => (
								<Column
									key={colIndex}
									header={col.header}
									colSpan={col.colSpan}
									rowSpan={col.rowSpan}
								/>
							))}
						</Row>
					))}
				</ColumnGroup>
			);

			return (
				<DataTable 
                size="small"
                value={data} headerColumnGroup={renderHeaderGroup()}>
					{flatColumns.map((col, colIndex) => (
						<Column
							key={colIndex}
							field={col.field}
							header={col.headerName || col.field}
						/>
					))}
				</DataTable>
			);
		};

        const data = Array.from({ length: 20 }, (_, index) => ({
            firstName: `FirstName${index + 1}`,
            lastName: `LastName${index + 1}`,
            orgCode: `ORG${(index + 1).toString().padStart(3, '0')}`,
            orgName: `Organization ${(index + 1).toString().padStart(2, '0')}`,
        }));
        
		const columnStructure: ColumnNode[] = [
			{
				headerName: "Employee Info",
				columns: [
					{
						headerName: "Name",
						columns: [
							{ field: "firstName", headerName: "First Name" },
							{ field: "lastName", headerName: "Last Name" },
						],
					},
				],
			},
			{
				headerName: "Org Name",
				columns: [
					{ field: "orgCode", headerName: "Org code" },
					{ field: "orgName", headerName: "Org Name" },
				],
			},
		];

		return <MyDataTable data={data} columnStructure={columnStructure} />;
	},
};
