import React from 'react';
import TextInput from '../TextInput';
import Select from '../Select';
import { lookup } from '../Util/translations';

export const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
    return (
        <TextInput
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e || undefined);
            }}
            placeholder={lookup('mrc.table.search.placeHolder')}
        />
    );
};

DefaultColumnFilter.displayName = 'DefaultColumnFilter';

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });

        let ops = [['', lookup('mrc.dunningemailmanagement.status.ALL')]];
        options.forEach((v) => {
            ops.push([v, lookup('mrc.dunningemailmanagement.status.' + v)]);
        });
        return ops;
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
};

SelectColumnFilter.displayName = 'SelectColumnFilter';

export default { SelectColumnFilter, DefaultColumnFilter };
