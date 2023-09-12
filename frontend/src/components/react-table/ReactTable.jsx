/* eslint-disable react/prop-types */
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

const ReactTable = ({ data, columns, paginationData, fetchData }) => {
  const { total } = paginationData;
  const [{ pageIndex, pageSize }, setPagination] = useState(paginationData);
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const table = useReactTable({
    data,
    columns,
    pageCount: total ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    return () => {
      fetchData(pagination);
    };
  }, [pagination]);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto px-2 mt-3">
          <thead className="bg-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 tracking-wider"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      <div className="flex justify-between gap-2">
        <div className="">
          <span>Page</span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount() > 0
              ? Math.ceil(table.getPageCount() / pageSize)
              : 0}
          </strong>
        </div>
        <nav aria-label="Page navigation">
          <ul className="inline-flex">
            <li>
              <button
                className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white border border-r-0 border-indigo-600 rounded-l-lg focus:shadow-outline hover:bg-indigo-100 ${
                  !table.getCanPreviousPage()
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => {
                  table.setPageIndex(0);
                }}
                disabled={!table.getCanPreviousPage()}
              >
                {'<<'}
              </button>
            </li>
            <li>
              <button
                className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white border border-indigo-600 focus:shadow-outline hover:bg-indigo-100 ${
                  !table.getCanPreviousPage()
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Prev
              </button>
            </li>
            <li>
              <button
                className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white border border-indigo-600 focus:shadow-outline hover:bg-indigo-100 ${
                  !table.getCanNextPage()
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </li>
            <li>
              <button
                className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white border border-indigo-600 rounded-r-lg focus:shadow-outline hover:bg-indigo-100 ${
                  !table.getCanNextPage()
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => {
                  table.setPageIndex(table.getPageCount() - 1);
                }}
                disabled={!table.getCanNextPage()}
              >
                {'>>'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ReactTable;
