import { DataTable } from "primereact/datatable";
import { useCallback, useEffect, useState } from "react";

interface DataTableProps {
	first: number;
	rowsPerPage: number;
	filters: Record<string, { value: any; matchMode: string }>;
}

type DataTableType = Record<string, any>;

interface UsePrimeTableProps<T extends DataTableType> {
	initialData: T[];
	fetchData: (props: DataTableProps) => Promise<Array<T>>;
}

const usePrimeTable = <T extends DataTableType>(
	props: UsePrimeTableProps<T>
) => {
	const { initialData, fetchData } = props;
	const [data, setData] = useState<T[]>(initialData);
	const [loading, setLoading] = useState(false);
	const [first, setFirst] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [filters, setFilters] = useState<
		Record<string, { value: any; matchMode: string }>
	>({});

	const fetchDataCallback = useCallback(() => {
		setLoading(true);
		fetchData({ first, rowsPerPage, filters })
			.then((newData) => {
				setData(newData);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, [first, rowsPerPage, filters, fetchData]);

	useEffect(() => {
		fetchDataCallback();
	}, [fetchDataCallback]);

	const onSort = (event: any) => {
		const field = event.meta.sortField;
		const order = event.meta.sortOrder;
		const updatedFilters = {
			...filters,
			[field]: { value: null, matchMode: order === 1 ? "gte" : "lte" },
		};
		setFilters(updatedFilters);
		fetchDataCallback();
	};

	const onFilter = (event: any) => {
		const field = event.field;
		const value = event.value;
		const updatedFilters = {
			...filters,
			[field]: { value, matchMode: "contains" },
		};
		setFilters(updatedFilters);
		fetchDataCallback();
	};

	const onPageChange = (event: any) => {
		setFirst(event.first);
		setRowsPerPage(event.rowsPerPage);
		fetchDataCallback();
	};

	return {
		data,
		loading,
		first,
		rowsPerPage,
		filters,
		onSort,
		onFilter,
		onPageChange,
		DataTable: () => (
			<DataTable<T[]>
				value={data}
				loading={loading}
				first={first}
				rows={rowsPerPage}
				totalRecords={data.length}
				onSort={onSort}
				onFilter={onFilter}
				onPage={onPageChange}
			></DataTable>
		),
	};
};

export default usePrimeTable;
