import Fuse from "fuse.js";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
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

    const [filteredData, setFilterd] = useState(data);

    const {
        getTableProps,
        pageCount,
        nextPage,
        previousPage,
        state: { pageIndex },
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = useTable(
        { columns, data: filteredData, initialState: { pageIndex: 0 } },
        useSortBy,
        usePagination
    );

    const [search, setSearch] = useState("");

    //@ts-ignore
    const fuse = new Fuse(data, {
        keys: ["title", "id"],
    });

    const result = fuse.search(search);

    useEffect(() => {
        setFilterd(search ? result.map((r) => r.item) : data);
    }, [filteredData, search]);

    return (
        <Fragment>
            <div className="flex py-4 gap-4 items-center">
                <p className="font-bold">Search </p>
                <input
                    value={search}
                    className="border border-gray-400 rounded-sm px-2 py-2"
                    placeholder="Search item"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>

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
                    {page.map((row, index) => {
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

            <div className="flex justify-center gap-4 my-4">
                <button onClick={() => previousPage()} className="bg-blue-500 px-2 text-white rounded-sm">Previous page</button> {" "}
                <span>
                    {pageIndex + 1} of {pageCount}{" "}
                </span>
                <button onClick={() => nextPage()} className="bg-blue-500 px-2 text-white rounded-sm">Next page </button>
            </div>
        </Fragment>
    );
}
