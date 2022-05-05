import Fuse from "fuse.js";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { usePagination, useSortBy, useTable } from "react-table";
import { Post, useDeletePostMutation, useUpdatePostMutation } from "../features/posts-slice";

export default function Table({ data }: { data: Post[] }) {

    const [deletePost] = useDeletePostMutation()
    const [updatePost] = useUpdatePostMutation()


    // eslint-disable-next-line
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
                Header: "body",
                accessor: "body",
            },
            {
                Header: "Actions",
                //@ts-ignore
                Cell: ({ row }) => (
                    <div className="flex gap-3 items-center text-white">
                        <button
                            onClick={async () => {
                                await deletePost({ id: row.original.id })
                                toast.success("Deleted")
                            }} className="bg-red-500 p-2"> delete
                        </button>
                        <button
                            onClick={async () => {
                                await updatePost({ id: row.original.id, body: "updated" })
                                toast.success("Updated")
                            }} className="bg-green-600 p-2"> update
                        </button>
                    </div>
                ),
            }
        ],
        // eslint-disable-next-line
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
        // eslint-disable-next-line
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
                <button onClick={() => previousPage()} className="bg-blue-500 px-2 text-white rounded-sm">{"<<"}</button> {" "}
                <span>
                    {pageIndex + 1} of {pageCount}{" "}
                </span>
                <button onClick={() => nextPage()} className="bg-blue-500 px-2 text-white rounded-sm">{">>"} </button>
            </div>
        </Fragment>
    );
}
