import React from 'react';
import { storiesOf } from '@storybook/react';
import DunningEmailTable from './DunningEmailTable';
import { SelectColumnFilter } from './MrcUiTableFilter';
import { SelectAllCheckbox, SelectRowCheckbox } from './MrcUiTableSelectUtils';

var tableData = [];
var i = 0;
while (i < 51) {
    tableData.push(
        {
            customer: 'Müller GmbH',
            customerId: '9949/343456',
            dunningEmailStatus: 'pending',
            dunningEmail: '',
            text1: 'fa;ljd;j;aidsj;ij lajdlfjasdlf jasdl;jf',
            text2: 'aldksflkasdj f;ljdfl;asjd f;lasdjf; sdfjadskfj ;dskfj;dsjfads;flk ajf',
            text3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            text4: 'foobar',
            action: 'edit',
        },
        {
            customer: 'Betterlife GmbH',
            customerId: '133/343456',
            dunningEmailStatus: 'approved',
            dunningEmail: 'info@betterlife.gmbh',
            text1: 'fa;ljd;j;aidsj;ij lajdlfjasdlf jasdl;jf',
            text2: 'aldksflkasdj f;ljdfl;asjd f;lasdjf; sdfjadskfj ;dskfj;dsjfads;flk ajf',
            text3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            text4: 'foobar',
            action: 'edit',
        },
        {
            customer: 'Maier AG veeeeeeeeeeeryyyyy long customer name',
            customerId: '123/99484',
            dunningEmailStatus: 'verified',
            dunningEmail: 'info@maier.ag',
            text1: 'fa;ljd;j;aidsj;ij lajdlfjasdlf jasdl;jf',
            text2: 'aldksflkasdj f;ljdfl;asjd f;lasdjf; sdfjadskfj ;dskfj;dsjfads;flk ajf',
            text3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            text4: 'foobar',
            action: 'edit',
        }
    );
    i++;
}

storiesOf('New UI Topics/Table', module)
    .add('basic Table', () => <DunningEmailTable tableData={tableData} />)
    .add('basic Table with lots of Data', () => {
        const columnData = [
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
        return <DunningEmailTable tableData={tableData} customColumnConfig={columnData} />;
    });
