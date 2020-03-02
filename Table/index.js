import { useTable } from 'react-table';
import React from 'react';
import './index.css';

export function Table({ columns, data, title, className }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    const showTitle = title => {
        return (
            <div className="table-header">
                <p className="metro-blue">{title}</p>
            </div>
        );
    };

    const showTable = () => {
        return (
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr key={headerGroup.getHeaderGroupProps().key} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th key={column.getHeaderProps().key} {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                className={i % 2 === 0 ? 'mrc-table-row-even' : 'mrc-table-row-odd'}
                                key={row.getRowProps().key}
                                {...row.getRowProps()}
                            >
                                {row.cells.map((cell, i) => {
                                    const cellContent =
                                        cell.column && cell.column.renderFn
                                            ? cell.column.renderFn(cell.value, cell.row)
                                            : cell.render('Cell');
                                    return (
                                        <td
                                            className={row.original.emphasized ? 'bold' : ''}
                                            data-label={columns[i] ? columns[i].Header : ''}
                                            key={cell.getCellProps().key}
                                            {...cell.getCellProps()}
                                        >
                                            {cellContent}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <div className={'mrc-react-table' + (className ? ' ' + className : '')}>
            {title && showTitle(title)}
            {showTable()}
        </div>
    );
}
