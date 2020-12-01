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

// TODO: currently only for dunning email
export const SelectDunningEmailStatusColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
    React.useMemo(() => {
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

    // here we must not use memo data to recreate the filter after emails are edited
    const options = new Set();
    preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
    });

    let ops = [['', lookup('mrc.dunningemailmanagement.status.ALL')]];
    options.forEach((v) => {
        ops.push([v, lookup('mrc.dunningemailmanagement.status.' + v)]);
    });

    return (
        <Select
            options={ops}
            value={filterValue}
            onChange={(e) => {
                setFilter(e || undefined);
            }}
        />
    );
};

SelectDunningEmailStatusColumnFilter.displayName = 'SelectDunningEmailColumnFilter';

export default { SelectDunningEmailStatusColumnFilter, DefaultColumnFilter };
