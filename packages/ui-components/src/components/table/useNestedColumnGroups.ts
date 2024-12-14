import { useMemo } from "react";

// Define types for the column structure
export interface ColumnNode {
    field?: string; // Field name for leaf columns
    headerName?: string; // Header label
    columns?: ColumnNode[]; // Nested columns
}

export interface HeaderCell {
    header: string;
    colSpan: number;
    rowSpan: number;
}


// Define the hook
export const useDynamicColumns = (columnStructure: ColumnNode[]) => {
  // Calculate the number of leaf nodes under a column node
  const countLeafNodes = (node: ColumnNode): number => {
    if (!node.columns || node.columns.length === 0) {
        return 1; // Leaf node
    }
    return node.columns.reduce((sum, child) => sum + countLeafNodes(child), 0);
};

// Recursive function to compute header rows
const generateHeaderRows = (
    structure: ColumnNode[],
    level: number = 0,
    result: HeaderCell[][] = []
): HeaderCell[][] => {
    if (!result[level]) result[level] = []; // Initialize row array for this level
    structure.forEach((item) => {
        const colSpan = countLeafNodes(item);
        if (item.columns && item.columns.length > 0) {
            //@ts-ignore
            result[level].push({
                header: item.headerName || '',
                colSpan,
                rowSpan: 1,
            });
            generateHeaderRows(item.columns, level + 1, result);
        } else {
            //@ts-ignore
            result[level].push({
                header: item.headerName || item.field || '',
                colSpan: 1,
                rowSpan: result.length - level, // Extend rowspan for leaf nodes
            });
        }
    });
    return result;
};

// Flatten the structure to get all leaf columns
const flattenColumns = (structure: ColumnNode[]): ColumnNode[] => {
    const result: ColumnNode[] = [];
    structure.forEach((item) => {
        if (item.columns && item.columns.length > 0) {
            result.push(...flattenColumns(item.columns));
        } else {
            result.push(item);
        }
    });
    return result;
};

const headerRows = useMemo(() => generateHeaderRows(columnStructure), [columnStructure]);
const flatColumns = useMemo(() => flattenColumns(columnStructure), [columnStructure]);

return { headerRows, flatColumns };
};

