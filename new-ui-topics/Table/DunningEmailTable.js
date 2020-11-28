import React from 'react';
import { useTable, useRowSelect, useSortBy, useResizeColumns, useFilters, useFlexLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';

import ChevronDownIcon from '../../icons/ChevronDownIcon';
import ChevronUpIcon from '../../icons/ChevronUpIcon';

import { DefaultColumnFilter, SelectColumnFilter } from './MrcUiTableFilter';

import { SelectAllCheckbox, SelectRowCheckbox } from './MrcUiTableSelectRowCheckbox';

import './index.scss';

export default function DunningEmailTable(tableData, customColumnConfig) {
    const defaultColumnConfig = [
        {
            id: 'selection',
            sticky: 'left',
            width: '50',
            Header: SelectAllCheckbox,
            Cell: SelectRowCheckbox,
        },
        {
            Header: 'Customer',
            accessor: 'customer',
            sticky: 'left',
        },
        {
            Header: 'Id',
            accessor: 'customerId',
        },
        {
            Header: 'Status',
            accessor: 'dunningEmailStatus',
            Filter: SelectColumnFilter,
            filter: 'includes',
        },
        {
            Header: 'Email',
            accessor: 'dunningEmail',
        },
        {
            Header: '',
            accessor: 'action',
            disableSortBy: true,
            disableFilters: true,
            sticky: 'right',
        },
    ];

    const columnConfig = customColumnConfig || defaultColumnConfig;

    const data = React.useMemo(() => tableData, []);

    const columns = React.useMemo(() => columnConfig, []);

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        // state,
        prepareRow,
        // state: {selectedFlatRows},
        // state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
        },
        useFilters,
        useSortBy,
        useResizeColumns,
        useFlexLayout,
        useRowSelect,
        useSticky
    );

    return (
        <div {...getTableProps()} className="mrc-ui-table">
            <div className="thead">
                {headerGroups.map((headerGroup, rowIndex) => (
                    <div key={'headerRow' + rowIndex} {...headerGroup.getHeaderGroupProps()} className="tr">
                        {headerGroup.headers.map((column, cellIndex) => (
                            <div
                                key={'headerCell' + cellIndex}
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="th"
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <ChevronDownIcon
                                                key={'icon' + rowIndex + cellIndex}
                                                color="white"
                                                size="xsmall"
                                            />
                                        ) : (
                                            <ChevronUpIcon
                                                key={'icon' + rowIndex + cellIndex}
                                                color="white"
                                                size="xsmall"
                                            />
                                        )
                                    ) : (
                                        ''
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}

                {headerGroups.map((headerGroup, index) => (
                    <div key={'filterHeaderRow' + index} {...headerGroup.getHeaderGroupProps()} className="tr">
                        {headerGroup.headers.map((column, index) => (
                            <div key={'filterHeaderCell' + index} {...column.getHeaderProps()} className="th">
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                                <div
                                    {...column.getResizerProps()}
                                    className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div {...getTableBodyProps()} className="tbody">
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <div key={'row' + rowIndex} {...row.getRowProps()} className="tr">
                            {row.cells.map((cell, index) => {
                                const label = columnConfig[index];
                                if (typeof label !== 'undefined') {
                                    return (
                                        <div
                                            key={'cell' + rowIndex + index}
                                            {...cell.getCellProps()}
                                            className="td"
                                            data-label={label.Header}
                                        >
                                            {cell.render('Cell')}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={'cell' + rowIndex + index} {...cell.getCellProps()} className="td">
                                            {cell.render('Cell')}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
