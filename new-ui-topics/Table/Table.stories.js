import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    useTable,
    useRowSelect,
    useSortBy,
    useResizeColumns,
    useFilters,
    useFlexLayout,
    useGlobalFilter,
    useAsyncDebounce,
} from 'react-table';
import { useSticky } from 'react-table-sticky';
import TextInput from '../../TextInput';
import Select from '../../Select';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import ChevronUpIcon from '../../icons/ChevronUpIcon';
import Search from '../../Search';

import './index.scss';

const times = (x) => (f) => {
    if (x > 0) {
        f();
        times(x - 1)(f);
    }
};

var tableData = [];
times(50)(() =>
    tableData.push(
        {
            customer: 'Müller GmbH',
            id: '9949/343456',
            status: 'pending',
            email: '',
            text1: 'fa;ljd;j;aidsj;ij lajdlfjasdlf jasdl;jf',
            text2: 'aldksflkasdj f;ljdfl;asjd f;lasdjf; sdfjadskfj ;dskfj;dsjfads;flk ajf',
            text3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            text4: 'foobar',
            action: 'edit',
        },
        {
            customer: 'Betterlife GmbH',
            id: '133/343456',
            status: 'approved',
            email: 'info@betterlife.gmbh',
            text1: 'fa;ljd;j;aidsj;ij lajdlfjasdlf jasdl;jf',
            text2: 'aldksflkasdj f;ljdfl;asjd f;lasdjf; sdfjadskfj ;dskfj;dsjfads;flk ajf',
            text3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            text4: 'foobar',
            action: 'edit',
        },
        {
            customer: 'Maier AG veeeeeeeeeeeryyyyy long customer name',
            id: '123/99484',
            status: 'verified',
            email: 'info@maier.ag',
            text1: 'fa;ljd;j;aidsj;ij lajdlfjasdlf jasdl;jf',
            text2: 'aldksflkasdj f;ljdfl;asjd f;lasdjf; sdfjadskfj ;dskfj;dsjfads;flk ajf',
            text3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            text4: 'foobar',
            action: 'edit',
        }
    )
);

const columnData = [
    {
        Header: 'Customer',
        accessor: 'customer',
        sticky: 'left',
    },
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Text',
        accessor: 'text1',
        disableFilters: true,
    },
    {
        Header: 'Text',
        accessor: 'text2',
        disableFilters: true,
    },
    {
        Header: 'Text',
        accessor: 'text3',
        disableFilters: true,
    },
    {
        Header: 'Text',
        accessor: 'text4',
        disableFilters: true,
    },
    {
        Header: '',
        accessor: 'action',
        disableSortBy: true,
        disableFilters: true,
        sticky: 'right',
    },
];

function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });

        return [['', 'all'], ...options.entries()];
    }, [id, preFilteredRows]);

    return (
        <Select
            options={options}
            value={filterValue}
            onChange={(e) => {
                setFilter(e || undefined);
            }}
        />
    );
}

storiesOf('New UI Topics/Table', module).add('Table basic', () => {
    const data = React.useMemo(() => tableData, []);

    const columns = React.useMemo(() => columnData, []);

    const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    });

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

    function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
        const count = preFilteredRows.length;

        return (
            <TextInput
                value={filterValue || ''}
                onChange={(e) => {
                    setFilter(e || undefined);
                }}
                placeholder={`Search ${count} records...`}
            />
        );
    }

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
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
        useSticky,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // Let's make a column for selection

                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    sticky: 'left',
                    width: '50',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div className="mrc-ui-table-checkbox">
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div className="mrc-ui-table-checkbox">
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );

    return (
        <div {...getTableProps()} className="mrc-ui-table">
            <div className="thead">
                {headerGroups.map((headerGroup) => (
                    <div {...headerGroup.getHeaderGroupProps()} className="tr">
                        {headerGroup.headers.map((column) => (
                            <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <ChevronDownIcon color="white" size="xsmall" />
                                        ) : (
                                            <ChevronUpIcon color="white" size="xsmall" />
                                        )
                                    ) : (
                                        ''
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}

                {headerGroups.map((headerGroup) => (
                    <div {...headerGroup.getHeaderGroupProps()} className="tr">
                        {headerGroup.headers.map((column) => (
                            <div {...column.getHeaderProps()} className="th">
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
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <div {...row.getRowProps()} className="tr">
                            {row.cells.map((cell, index) => {
                                const label = columnData[index];
                                if (typeof label !== 'undefined') {
                                    return (
                                        <div {...cell.getCellProps()} className="td" data-label={label.Header}>
                                            {cell.render('Cell')}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div {...cell.getCellProps()} className="td">
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
});
