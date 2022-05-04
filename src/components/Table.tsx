import React, { Fragment, useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { Todo } from "../features/todo-slice";

export default function Table({ data }: { data: Todo[] }) {
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "completed",
                accessor: "completed",
                Cell: (props: { value: boolean }) => (props.value ? "Yes" : "No"),
            },
        ],
        []
    ) as any;

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <Fragment>
            <table className="text-center w-full" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            className="border border-gray-300"
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="py-4 px-2"
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className={`border border-gray-200 py-4 hover:bg-hover ${index % 2 !== 0 ? "bg-alternateTable" : "bg-white"
                                    }`}
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className="px-7 py-2">
                                            {" "}
                                            {cell.render("Cell")}{" "}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}
