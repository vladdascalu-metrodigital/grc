import React from 'react';
import { useTable, useRowSelect, useSortBy, useResizeColumns, useFilters, useFlexLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';

import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import { SimpleActionDock } from '../ActionDock';
import SingleEMailEditModalDialog from '../DunningEmailManagementService/DunningEmailManagement/SingleEMailEditModalDialog';
import MultipleEMailEditModalDialog from '../DunningEmailManagementService/DunningEmailManagement/MultipleEMailEditModalDialog';
import { DefaultColumnFilter, SelectDunningEmailStatusColumnFilter } from './MrcUiTableFilter';
import { SelectRowCheckbox, SelectAllCheckbox } from './MrcUiTableSelectUtils';
import Button, { COLOR as BUTTONCOLOR, SIZE as BUTTONSIZE } from '../Button';
import Pill from '../Pill';

import './index.scss';
import { lookup } from '../Util/translations';
import _ from 'lodash';

export default function DunningEmailTable({
    tableData,
    customColumnConfig,
    requestedCustomerId,
    handleCustomerDunningEmailSave,
    showRowEditModal,
    updateShowRowEditModal,
    showMultiRowEditModal,
    updateShowMultiRowEditModal,
    allCustomerEmails,
    noGroup,
    cleanAllTableStatus,
    changedCustomers,
}) {
    const defaultColumnConfig = [
        {
            id: 'selection',
            sticky: 'left',
            width: '50',
            Header: SelectAllCheckbox,
            Cell: SelectRowCheckbox,
        },
        {
            Header: lookup('mrc.dunningemailmanagement.table.customerName'),
            accessor: 'customerName',
            sticky: 'left',
        },
        {
            Header: lookup('mrc.dunningemailmanagement.table.customerId'),
            accessor: 'customerId',
        },
        {
            Header: lookup('mrc.dunningemailmanagement.table.status'),
            accessor: 'dunningEmailStatus',
            Filter: SelectDunningEmailStatusColumnFilter,
            filter: 'includes',
            Cell: React.useCallback(({ row }) => {
                let status = row.original.dunningEmailStatus;
                let type = 'success';
                if (status != 'DOI_VERIFIED' && status != 'SYNTAX_VERIFIED') {
                    type = 'danger';
                }
                return _.isEmpty(status) || status === 'NO_DUNNING_EMAIL' ? null : (
                    <span>
                        <Pill text={lookup('mrc.dunningemailmanagement.status.' + status)} type={type} withIcon />
                    </span>
                );
            }),
        },
        {
            Header: lookup('mrc.dunningemailmanagement.table.dunningEmail'),
            accessor: 'dunningEmail',
            Cell: React.useCallback(({ row }) => {
                let email = row.original.dunningEmail;
                return email;
            }),
        },
        {
            Header: '',
            accessor: 'action',
            disableSortBy: true,
            disableFilters: true,
            sticky: 'right',
            Cell: React.useCallback(({ cell }) => (
                <Button
                    size={BUTTONSIZE.SMALL}
                    text={lookup('mrc.dunningemailmanagement.button.edit')}
                    isOutlined
                    color={BUTTONCOLOR.PRIMARY}
                    onClick={() => updateShowRowEditModal(cell.row.original)}
                />
            )),
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
        selectedFlatRows,
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
                    const isRequestedCustomer =
                        row.original.customerId ===
                        requestedCustomerId.storeNumber + '/' + requestedCustomerId.customerNumber;
                    return (
                        <div
                            key={'row' + rowIndex}
                            {...row.getRowProps()}
                            className={isRequestedCustomer ? 'tr requested' : 'tr'}
                        >
                            {row.cells.map((cell, index) => {
                                const label = columnConfig[index];

                                // this part just overwrite the changed data manually because the react useMemo never change the data model
                                // TODO: find a better way for this
                                let value = null;
                                const hasDunningEmailChange =
                                    changedCustomers[row.original.accountId] && cell.column.id === 'dunningEmail';
                                const hasDunningEmailStatusChange =
                                    changedCustomers[row.original.accountId] && cell.column.id === 'dunningEmailStatus';
                                if (hasDunningEmailChange) {
                                    value = changedCustomers[row.original.accountId].dunningEmail;
                                } else if (hasDunningEmailStatusChange) {
                                    value = changedCustomers[row.original.accountId].dunningEmailStatus;
                                }
                                cell.value = hasDunningEmailChange || hasDunningEmailStatusChange ? value : cell.value;
                                cell.row.values['dunningEmail'] = hasDunningEmailChange
                                    ? value
                                    : cell.row.values['dunningEmail'];
                                cell.row.original['dunningEmail'] = hasDunningEmailChange
                                    ? value
                                    : cell.row.original['dunningEmail'];
                                cell.row.values['dunningEmailStatus'] = hasDunningEmailStatusChange
                                    ? value
                                    : cell.row.values['dunningEmailStatus'];
                                cell.row.original['dunningEmailStatus'] = hasDunningEmailStatusChange
                                    ? value
                                    : cell.row.original['dunningEmailStatus'];
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
            {showRowEditModal && (
                <SingleEMailEditModalDialog
                    customer={showRowEditModal}
                    onCancel={() => updateShowRowEditModal(null)}
                    onOk={handleCustomerDunningEmailSave}
                />
            )}

            {showMultiRowEditModal && (
                <MultipleEMailEditModalDialog
                    customers={data}
                    selectedCustomerAccountIds={selectedFlatRows.map((d) => d.original.accountId)}
                    onCancel={() => updateShowMultiRowEditModal(null)}
                    onOk={handleCustomerDunningEmailSave}
                    allCustomerEmails={allCustomerEmails}
                />
            )}

            <SimpleActionDock
                cancelText={lookup('mrc.dunningemailmanagement.button.cleanAll')}
                applyText={lookup('mrc.dunningemailmanagement.button.editSelection')}
                applyDisabled={!selectedFlatRows.length || noGroup}
                onApply={() => updateShowMultiRowEditModal(true)}
                onCancel={() => cleanAllTableStatus()}
            />
        </div>
    );
}
