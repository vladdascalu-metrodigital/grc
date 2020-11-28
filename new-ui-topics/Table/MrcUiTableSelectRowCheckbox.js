import React from 'react';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <div className="mrc-ui-table-checkbox">
            <input type="checkbox" ref={resolvedRef} {...rest} />
        </div>
    );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export const SelectAllCheckbox = ({ getToggleAllRowsSelectedProps }) => (
    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
);
SelectAllCheckbox.displayName = 'SelectAllCheckbox';

export const SelectRowCheckbox = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
SelectRowCheckbox.displayName = 'SelectRowCheckbox';

export default { SelectAllCheckbox, SelectRowCheckbox };
