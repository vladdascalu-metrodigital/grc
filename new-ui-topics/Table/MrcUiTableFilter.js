import React from 'react';
import TextInput from '../../TextInput';
import Select from '../../Select';

export const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
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
};

DefaultColumnFilter.displayName = 'DefaultColumnFilter';

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
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
};

SelectColumnFilter.displayName = 'SelectColumnFilter';

export default { SelectColumnFilter, DefaultColumnFilter };
